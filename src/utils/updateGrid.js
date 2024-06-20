import getCellInputs from "./getCellInputs.js";
import calcIncomeLevel from "./calcIncomeLevel";

// Función que obtiene los vecinos de una celda
const getNeighbors = (grid, x, y) => {
  const neighbors = [];
  //Vecindad de Moore con contigüidad de 1, igual que el juego de la vida
  //V = {(-1,0),(-1,1),(0,1), (1,1),(1,0),(1,-1,)(0,-1),(-1,-1)}
  const directions = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
  // Iterar sobre las direcciones y obtener los vecinos
  directions.forEach(([dx, dy]) => {
    // Coordenadas del vecino
    const nx = x + dx;
    const ny = y + dy;
    // Verificar que las coordenadas estén dentro del grid
    if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
      neighbors.push(grid[nx][ny]);
    }
  });

  return neighbors;
};

// Función que busca la celda con más calidad de servicios
const findMostAttractive = (grid, x, y) => {
  let maxAttraction = 0;
  let cords = [0, 0];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j].income_level === "High") {
        const distance = Math.abs(x - i) + Math.abs(y - j);
        if (distance === 0) continue;
        // La atracción será el promedio en services.school + services.hospitals + services.public_transport * distancia
        const attraction = (grid[i][j].services.schools + grid[i][j].services.hospitals + grid[i][j].services.public_transport) * Math.pow(2, distance);
        if (attraction > maxAttraction) {
          maxAttraction = attraction;
          cords = [i, j];
        }
      }
    }
  }
  return cords;
};

/*
  Reglas de transición:
  1. Si una zona rica no tiene al menos dos vecino ricos, su avg income se reduce un 20%, si no tiene al menos 1 un 30%
  2. Si la zona es pobre y el ingreso promedio de los vecinos es mayor que 0.6, entonces el nivel de educación de la celda actual se establece en 0.65 para convertir la celda pobre en clase media
  3. Si una zona clase media tiene 3 zonas ricas vecinas, su promedio de ingresos aumenta un +5% en cada iteración, si es clase baja un +1%

  Otras reglas de transición:
  4. si una zona rica esta solo rodeada por vecinos pobres se convierte en media (pierde el 50% de ingresos y patrimonio)
  5. Factor suerte: En cada iteración se determina en un 50% de aumentar los ingresos de la célula o en un 30% de disminuirlos

  Políticas
  1. política timidez social-demócrata => impuestos a los ricos =>
    Educación en sectores pobres y servicios públicos =>
    convierte la mayoría de pobres en clase media
    Los ricos pierden un porcentaje de su ingreso que depende de su nivel de ingreso
  2. política neoliberal => Aumenta el avg_income de los ricos, desplaza algún porcentaje de la clase media a la pobreza
  3. política socialismo democrático => avg income de los vecinos se se reparte en entre todos los vecinos igualitariamente y aumentan en +20% los servicios y educación (por cada iteración)
  */

// Función que actualiza el estado de una celda
const updateCellState = (cell, neighbors, policy, withAttraction) => {
  // Obtener los inputs de las celdas vecinas
  const cellInputs = getCellInputs(neighbors);

  /* CellInputs campos:
      avgNeighborIncome,
      avgNeighborEducation,
      avgNeighborServices,
      poorCount,
      middleCount,
      richCount
  */

  // Data de la celda relacionada con sus vecinos
  const richNeighbors = cellInputs.richCount;
  const avgNeighborIncome = cellInputs.avgNeighborIncome;
  const totalIncome = cellInputs.totalIncome;

  let newIncome = cell.avg_income;
  let newEducation = cell.education_level;
  let newServices = { ...cell.services };

  // Reglas de transición

  //1. Si una zona rica no tiene al menos dos vecinos ricos, su avg_income se reduce un -20%, si no tiene al menos 1 un -30%.
  if (cell.income_level === "High" && richNeighbors < 2) {
    newIncome *= richNeighbors === 0 ? 0.7 : 0.8; //Ingresos*cantidadVecinosRicos = 0.8 si tiene 1 vecino rico, 0.7 si no tiene vecinos ricos
  }
  // 2. Si la zona es pobre y el ingreso promedio de los vecinos es mayor que 0.6, entonces el nivel de educación de la celda actual se establece en 0.65 para convertir la celda pobre en clase media
  else if (cell.income_level === "Low" && avgNeighborIncome > 0.6) {
    newEducation = 0.65; // Convierte pobre en clase media si vecinos tienen alto ingreso
  }

  //3. Si una zona clase media tiene 3 zonas ricas vecinas, su promedio de ingresos aumenta un +5% en cada iteración, si es clase baja un +1%
  if (richNeighbors >= 3) {
    //El tope se asegura que no se convierta en rico
    if (cell.income_level === "Medium" && cell.avg_income < 2) {
      newIncome *= 1.1; // Clase media con 3 vecinos ricos aumenta 5%
    } else if (cell.income_level === "Low" && cell.avg_income < 2) {
      newIncome *= 1.01; // Clase baja con 3 vecinos ricos aumenta 1%
    }
  }

  // Nuevas reglas de transición adicionales
  // 4. si una zona rica esta solo rodeada por vecinos pobres se convierte en media (pierde el 50% de ingresos y patrimonio)
  if (
    cell.income_level === "High" &&
    cellInputs.poorCount === neighbors.length
  ) {
    newIncome *= 0.5;
    newEducation *= 0.5;
    newServices = {
      schools: newServices.schools * 0.5,
      hospitals: newServices.hospitals * 0.5,
      public_transport: newServices.public_transport * 0.5,
    };
  }

  // 5. Factor suerte: En cada iteración se determina en un 50% de aumentar los ingresos de la célula o en un 30% de disminuirlos
  // numero de 1 a 100
  const luckyNumber = Math.floor(Math.random() * 100) + 1;
  if (luckyNumber <= 50) {
    // Aumentarle el 1% de su ingreso
    newIncome += 0.01 * newIncome;
  }
  else if (luckyNumber <= 80) {
    // Disminuir el 1% de su ingreso
    newIncome -= 0.01 * newIncome;
  }

  // 6. Restricción, no permitir que el avg_income sea menor a 0.1
  if (newIncome < 0.1) {
    newIncome = 0.1;
  }


  // Aplicar políticas
  switch (policy) {
    //1. Política de redistribución social demócrata
    // Los ricos pierden un porcentaje de su ingreso.
    // Este porcentaje depende de su nivel de ingreso promedio (avg_income).
    case 1:
      if (cell.income_level === "High") { //Si es rico
        // Los ricos pierden un porcentaje de su ingreso que depende de su nivel de ingreso
        if (withAttraction){
          newIncome *= 1 - 0.3 * (cell.avg_income / 40); // Pierde un porcentaje de su ingreso
        }else{
          newIncome *= 1 - 0.2 * (cell.avg_income / 20); // Pierde un porcentaje de su ingreso
        }
        // La celda rica se juntará con la celda rica mas cercana
      } else if (cell.income_level === "Low") { //Si es pobre
        newEducation = Math.min(newEducation + 0.2, 0.8); // Mejora educación. 
        newServices = {
          schools: newServices.schools <= 0.5 ? Math.min(newServices.schools + 0.2, 0.8) : newServices.schools, // Si no pasa de 0.5 mejora servicios educativos
          hospitals: newServices.hospitals <= 0.5 ? Math.min(newServices.hospitals + 0.2, 0.8) : newServices.hospitals, // Si no pasa de 0.5 mejora servicios de salud
          public_transport: newServices.public_transport <= 0.5 ? Math.min(newServices.public_transport + 0.2, 0.8) : newServices.public_transport, // Si no pasa de 0.5 mejora transporte público
        }; // Mejora servicios públicos
      }
      break;
    // 2. Política neoliberal
    // => Aumenta el avg_income de los ricos, desplaza algún porcentaje de la clase media a la pobreza
    case 2:
      if (cell.income_level === "High") { //Si es rico
        newIncome *= 1.02; // Aumenta ingreso de los ricos
      } else if (cell.income_level === "Medium") { //Si es clase media
        newIncome *= 0.95; // Desplaza clase media a pobreza
      }
      break;
    // Política socialista democrática
    // => avg income de los vecinos se se reparte en entre todos los vecinos igualitariamente y aumentan en +20% los servicios y educación (por cada iteración)
    case 3:
      const equalIncome =
        (totalIncome + cell.avg_income) / (neighbors.length + 1); // Redistribución igualitaria del ingreso
      newIncome = equalIncome;

      //Servicios y educación aumentan +20%
      newServices = {
        schools: Math.min(newServices.schools * 1.2, 1), // Aumenta servicios educativos sin pasar de 1
        hospitals: Math.min(newServices.hospitals * 1.2, 1), // Aumenta servicios de salud sin pasar de 1
        public_transport: Math.min(newServices.public_transport * 1.2, 1), // Aumenta transporte público sin pasar de 1
      };
      newEducation = Math.min(newEducation * 1.2, 1);
      break;
    default:
      break;
  }

  const newIncomeLevel = calcIncomeLevel(newIncome, newEducation, newServices);

  return {
    ...cell,
    avg_income: newIncome,
    education_level: newEducation,
    services: newServices,
    income_level: newIncomeLevel,
  };
};

function moveOneStep(grid, x1, y1, x2, y2) {
  // Calcula la dirección en la que mover la celda
  const dx = Math.sign(x2 - x1);
  const dy = Math.sign(y2 - y1);

  // Asegúrate de que la nueva posición esté dentro del grid
  const newX = Math.max(0, Math.min(grid.length - 1, x1 + dx));
  const newY = Math.max(0, Math.min(grid[0].length - 1, y1 + dy));

  // Intercambia la celda con la celda en la nueva posición
  const temp = grid[x1][y1];
  grid[x1][y1] = grid[newX][newY];
  grid[newX][newY] = temp;
}

const updateGrid = (grid, selectedPolicy,withAttraction) => {
  // Grid con estados actualizados
  const newGrid = grid.map((col, x) =>
    col.map((cell, y) => {
      const neighbors = getNeighbors(grid, x, y);
      return updateCellState(cell, neighbors, selectedPolicy, withAttraction);
    })
  );
  if (!withAttraction) {
    return newGrid;
  }
  // Grid con celdas ricas más cercanas en 1 unidad
  grid.forEach((col, x) =>
    col.forEach((cell, y) => {
      if (cell.income_level === "High") {
        const nearRichCords = findMostAttractive(newGrid, x, y);
        if (nearRichCords) {
          moveOneStep(newGrid, x, y, nearRichCords[0], nearRichCords[1]);
        }
      }
    })
  );

  return newGrid;
};

export default updateGrid;
