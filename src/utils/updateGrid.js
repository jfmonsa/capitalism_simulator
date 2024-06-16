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

/*
  Reglas de transición:
 1. Si una zona rica no tiene al menos dos vecino ricos, su avg income se reduce un 20%, si no tiene al menos 1 un 30%
 2. Si una zona clase media tiene 3 zonas ricas vecinas, su avg income aumenta un +10% en cada iteración, la case baja (+6% para zonas pobres)
 3. el avg_neighbor mayor a x valor convierte una célula pobre en middle class (convierte el education_level en > 0.6)
 
 Otras reglas de transición:
 2. si una zona rica esta solo rodeada por vecinos pobres se convierte en media (pierde el 50% de riqueza)

  Políticas
  1. política timidez social-demócrata => impuestos a los ricos => Educación en sectores pobres y servicios públicos => convierte la mayoría de pobres en clase media, ricos pierden el 30% de su income
  2. política neoliberal => Aumenta el avg_income de los ricos, desplaza algún porcentaje de la clase media a la pobreza
  3. política socialismo democrático => avg income de los vecinos se se reparte en entre todos los vecinos igualitariamente y aumentan en +20% los servicios y educación (por cada iteración)
  */

  // Función que actualiza el estado de una celda
const updateCellState = (cell, neighbors, policy) => {
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
  if (cell.income_level === "High" && richNeighbors < 2) {
    //1. Si una zona rica no tiene al menos dos vecinos ricos, su avg income se reduce un -20%, si no tiene al menos 1 un -30%
    newIncome *= richNeighbors === 0 ? 0.7 : 0.8; //Ingresos*cantidadVecinosRicos = 0.8 si tiene 1 vecino rico, 0.7 si no tiene vecinos ricos
  
  } else if (cell.income_level === "Low" && avgNeighborIncome > 0.6) {
    // 2. Si el avg_services de los vecinos es > 0.6 aumenta en en 20% (si no sobrepasa 1)
    newEducation = 0.65; // Convierte pobre en clase media si vecinos tienen alto ingreso
  }
  if (richNeighbors >= 3) {
    //(3. Si una zona clase media tiene 3 zonas ricas vecinas, su avg income aumenta un 15% en cada iteración, la case baja (+6% para zonas pobres)
    //El tope se asegura que no se convierta en rico
    if (cell.income_level === "Medium" && cell.avg_income < 2) {
      newIncome *= 1.1; // Clase media con 3 vecinos ricos aumenta 10%
    } else if (cell.income_level === "Low" < 1) {
      newIncome *= 1.06; // Clase baja con 3 vecinos ricos aumenta 2%
    }
  }

  // Nuevas reglas de transición adicionales
  //TODO: Documentarlas
  if (
    cell.income_level === "High" &&
    cellInputs.poorCount === neighbors.length
  ) {
    // Si una zona rica está solo rodeada por vecinos pobres se convierte en media (pierde el 50% de riqueza)
    newIncome *= 0.5;
    newEducation *= 0.5;
    newServices = {
      schools: newServices.schools * 0.5,
      hospitals: newServices.hospitals * 0.5,
      public_transport: newServices.public_transport * 0.5,
    };
  }

  // Apply policies
  switch (policy) {
    //1. Política de redistribución social demócrata
    case 1:
      if (cell.income_level === "High" && cell.avg_income > 10) {
        newIncome *= 0.7; // Ricos pierden 30% del ingreso
      } else if (cell.income_level === "Low") {
        newEducation = Math.min(newEducation + 0.2, 0.8);
        newServices = {
          schools: Math.min(newServices.schools + 0.2, 0.8),
          hospitals: Math.min(newServices.hospitals + 0.2, 0.8),
          public_transport: Math.min(newServices.public_transport + 0.2, 0.8),
        }; // Mejora servicios públicos
      }
      break;
    // 2. Política neoliberal
    case 2:
      if (cell.income_level === "High") {
        newIncome *= 1.2; // Aumenta ingreso de los ricos
      } else if (cell.income_level === "Medium") {
        newIncome *= 0.8; // Desplaza clase media a pobreza
      }
      break;
    // Política socialista democrática
    case 3:
      const equalIncome =
        (totalIncome + cell.avg_income) / (neighbors.length + 1);
      newIncome = equalIncome; // Redistribución igualitaria del ingreso
      //Servicios y educación aumentan +20%
      newServices = {
        schools: Math.min(newServices.schools * 1.2, 1),
        hospitals: Math.min(newServices.hospitals * 1.2, 1),
        public_transport: Math.min(newServices.public_transport * 1.2, 1),
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

const updateGrid = (grid, selectedPolicy) => {
  const newGrid = grid.map((col, x) =>
    col.map((cell, y) => {
      const neighbors = getNeighbors(grid, x, y);
      return updateCellState(cell, neighbors, selectedPolicy);
    })
  );

  return newGrid;
};

export default updateGrid;
