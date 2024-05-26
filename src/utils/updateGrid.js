/*import calcIncomeLevel from "./calcIncomeLevel";

const getNeighbors = (grid, x, y) => {
  const neighbors = [];
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
     [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
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

const updateCellState = (cell, neighbors) => {
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

  const newIncome = (cell.avg_income + avgNeighborIncome) / 2;
  const newEducation = (cell.education_level + avgNeighborEducation) / 2;
  const newServices = {
    schools: (cell.services.schools + avgNeighborServices) / 2,
    hospitals: (cell.services.hospitals + avgNeighborServices) / 2,
    public_transport:
      (cell.services.public_transport + avgNeighborServices) / 2,
  };

  const newIncomeLevel = calcIncomeLevel(newIncome, newEducation, newServices);

  return {
    ...cell,
    avg_income: newIncome,
    education_level: newEducation,
    services: newServices,
    income_level: newIncomeLevel,
  };
};

const updateGrid = (grid) => {
  const newGrid = grid.map((col, x) =>
    col.map((cell, y) => {
      const neighbors = getNeighbors(grid, x, y);
      return updateCellState(cell, neighbors);
    })
  );

  return newGrid;
};

export default updateGrid;
*/
import calcIncomeLevel from "./calcIncomeLevel";

const getNeighbors = (grid, x, y) => {
  const neighbors = [];
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    /* cell */ [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
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

const updateCellState = (cell, neighbors, policy) => {
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

  let newIncome = (cell.avg_income + avgNeighborIncome) / 2;
  let newEducation = (cell.education_level + avgNeighborEducation) / 2;
  let newServices = {
    schools: (cell.services.schools + avgNeighborServices) / 2,
    hospitals: (cell.services.hospitals + avgNeighborServices) / 2,
    public_transport:
      (cell.services.public_transport + avgNeighborServices) / 2,
  };

  // Apply policies
  switch (policy) {
    case 1: // Affordable housing
      newIncome *= 1.1;
      break;
    case 2: // Public transport improvements
      newServices.public_transport *= 1.2;
      break;
    case 3: // Education investments
      newEducation *= 1.3;
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
