// Function to calculate the Gini index from avg_income values
const calcGiniIndex = (grid) => {
  const incomes = grid.flat().map((cell) => cell.avg_income);
  const n = incomes.length;
  let sumOfAbsoluteDifferences = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sumOfAbsoluteDifferences += Math.abs(incomes[i] - incomes[j]);
    }
  }

  const meanIncome = incomes.reduce((sum, income) => sum + income, 0) / n;
  return sumOfAbsoluteDifferences / (2 * n * n * meanIncome);
};

export default calcGiniIndex;
