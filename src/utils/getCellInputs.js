const getCellInputs = (neighbors) => {
  /*


  let newIncome = cell.avg_income;
  let newEducation = cell.education_level;
  let newServices = { ...cell.services };

  const richNeighbors = neighbors.filter(
    (n) => n.income_level === "High"
  ).length;
  */
  let totalIncome = 0;
  let totalEducation = 0;
  let totalServices = 0;

  let poorCount = 0;
  let middleCount = 0;
  let richCount = 0;

  neighbors.forEach((neighbor) => {
    totalIncome += neighbor.avg_income;
    totalEducation += neighbor.education_level;
    totalServices +=
      neighbor.services.schools +
      neighbor.services.hospitals +
      neighbor.services.public_transport;

    switch (neighbor.income_level) {
      case "Low":
        poorCount++;
        break;
      case "Medium":
        middleCount++;
        break;
      case "High":
        richCount++;
        break;
      default:
        break;
    }
  });

  const avgNeighborIncome = totalIncome / neighbors.length;
  const avgNeighborEducation = totalEducation / neighbors.length;
  const avgNeighborServices = totalServices / (3 * neighbors.length);

  return {
    avgNeighborIncome,
    avgNeighborEducation,
    avgNeighborServices,
    poorCount,
    middleCount,
    richCount,
    totalIncome,
  };
};
export default getCellInputs;
