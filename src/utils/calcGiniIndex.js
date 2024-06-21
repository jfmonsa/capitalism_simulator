// Función para calcular el índice de Gini a partir de los valores de avg_income
const calcGiniIndex = (grid) => {
  // Aplanamos la cuadrícula y mapeamos cada celda a su valor de ingreso promedio
  const incomes = grid.flat().map((cell) => cell.avg_income);
  // Obtenemos el número total de ingresos
  const n = incomes.length;
  let sumOfAbsoluteDifferences = 0;

  // Para cada par de ingresos
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Sumamos la diferencia absoluta entre los dos ingresos
      sumOfAbsoluteDifferences += Math.abs(incomes[i] - incomes[j]);
    }
  }

  // Calculamos el ingreso promedio
  const meanIncome = incomes.reduce((sum, income) => sum + income, 0) / n;
  // Devolvemos el índice de Gini, que es la suma de las diferencias absolutas dividida por
  // el doble del número total de ingresos al cuadrado y el ingreso promedio
  return sumOfAbsoluteDifferences / (2 * n * n * meanIncome);
};

export default calcGiniIndex;
