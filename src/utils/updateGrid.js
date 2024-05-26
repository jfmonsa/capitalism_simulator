import calcIncomeLevel from "./calcIncomeLevel";

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

  directions.forEach(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length) {
      neighbors.push(grid[nx][ny]);
    }
  });

  return neighbors;
};

/*
  Reglas de transición:
  1. Si una zona rica no tiene al menos dos vecino rico, su avg income se reduce un 20%, si no tiene al menos 1 un 30%
  2. Si una zona clase media tiene 3 zonas ricas vecinas, su avg income aumenta un 15% en cada iteración, la case baja
  3. el avg_neighbor mayor a x valor convierte una celula pobre en middle class (convierte el education_level en > 0.6)

  Otras relgas de transición:
  2. Las zonas ricas reducen 20% public transport


  Politicas
  1. politica timidez social democrata => impuestos a los ricos => Eduación en sectores pobres y servicios publicos => convierte la mayoría de pobres en clase media, ricos pierden el 30% de su income
  2. politica neoliberal => Aumenta el avg_income de los ricos, desplaza algun porcentaje de la clase media a la pobreza
  2. politica socialismo democratico => avg income de los vecinos se se reparte en entre todos los vecinos igualitariamente
  */ const updateCellState = (cell, neighbors, policy) => {
  const totalIncome = neighbors.reduce(
    (sum, neighbor) => sum + neighbor.avg_income,
    0
  );
  const avgNeighborIncome = totalIncome / neighbors.length;

  const totalEducation = neighbors.reduce(
    (sum, neighbor) => sum + neighbor.education_level,
    0
  );
  const avgNeighborEducation = totalEducation / neighbors.length;

  const totalServices = neighbors.reduce((sum, neighbor) => {
    return (
      sum +
      (neighbor.services.schools +
        neighbor.services.hospitals +
        neighbor.services.public_transport)
    );
  }, 0);
  const avgNeighborServices = totalServices / (3 * neighbors.length);

  let newIncome = cell.avg_income;
  let newEducation = cell.education_level;
  let newServices = { ...cell.services };

  const richNeighbors = neighbors.filter(
    (n) => n.income_level === "High"
  ).length;

  // Reglas de transición
  if (cell.income_level === "High") {
    if (richNeighbors < 2) {
      newIncome *= richNeighbors === 0 ? 0.7 : 0.8;
    }
  } else if (avgNeighborIncome > 0.6 && cell.income_level === "Low") {
    newEducation = 0.65; // Convierte pobre en clase media si vecinos tienen alto ingreso
  }

  if (cell.income_level === "Medium" && richNeighbors >= 3) {
    newIncome *= 1.1; // Clase media con 3 vecinos ricos aumenta 10%
  } else if (cell.income_level === "Lo2" && richNeighbors >= 3) {
    newIncome *= 1.02; // Clase baja con 3 vecinos ricos aumenta 2%
  }
  //Otras reglas de transición
  if (cell.income_level === "High") {
    newServices.public_transport *= 0.8; // Zonas ricas reducen transporte público
  }
  // Aplicar políticas
  switch (policy) {
    case 1: // Política de redistribución social demócrata
      if (cell.income_level === "High") {
        newIncome *= 0.7; // Ricos pierden 30% del ingreso
      } else if (cell.income_level === "Low") {
        newEducation = 0.65; // Mejora educación en sectores pobres
        newServices = {
          schools: 0.7,
          hospitals: 0.7,
          public_transport: 0.7,
        }; // Mejora servicios públicos
      }
      break;
    case 2: // Política neoliberal
      if (cell.income_level === "High") {
        newIncome *= 1.2; // Aumenta ingreso de los ricos
      } else if (cell.income_level === "Medium") {
        newIncome *= 0.8; // Desplaza clase media a pobreza
      }
      break;
    case 3: // Política socialista democrática
      const equalIncome =
        (totalIncome + cell.avg_income) / (neighbors.length + 1);
      newIncome = equalIncome; // Redistribución igualitaria del ingreso
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
