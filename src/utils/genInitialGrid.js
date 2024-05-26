import { getRandomNormal, getRandomExponential } from "./incomeDistributions";
import calcIncomeLevel from "./calcIncomeLevel";

const STATES = {
  POOR: 0,
  MIDDLE: 1,
  RICH: 2,
};

//Aux function
const getRandomFloat = (min = 0.1, max = 1.0) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Function to generate the initial grid with more varied income values
const generateInitialGrid = (cols, rows) => {
  const grid = [];
  let zone_code = 1;

  for (let x = 0; x < cols; x++) {
    const col = [];
    for (let y = 0; y < rows; y++) {
      const population_density = getRandomFloat();
      const education_level = getRandomFloat();
      const services = {
        schools: getRandomFloat(),
        hospitals: getRandomFloat(),
        public_transport: getRandomFloat(),
      };
      // Use a normal distribution for avg_income to create more variance
      const avg_income = getRandomExponential(); //getRandomNormal(0.5, 0.2);
      const income_level = calcIncomeLevel(
        avg_income,
        education_level,
        services
      );

      const cell = {
        zone_code: zone_code++,
        population_density,
        avg_income,
        education_level,
        services,
        income_level,
      };

      col.push(cell);
    }
    grid.push(col);
  }
  return grid;
};
export default generateInitialGrid;
