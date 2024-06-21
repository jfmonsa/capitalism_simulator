import { getRandomNormal, getRandomExponential } from './incomeDistributions';
import calcIncomeLevel from './calcIncomeLevel';

// Función auxiliar para obtener un número flotante aleatorio entre min y max
const getRandomFloat = (min = 0.1, max = 1.0) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Función para generar la cuadrícula inicial con valores de ingresos más variados
const generateInitialGrid = (cols, rows) => {
  const grid = []; // Inicializamos la cuadrícula
  let zone_code = 1; // Inicializamos el código de zona

  // Recorremos las columnas y filas
  for (let x = 0; x < cols; x++) {
    const col = []; // Inicializamos la columna
    for (let y = 0; y < rows; y++) {
      // Generamos valores aleatorios para la densidad de población, el nivel de educación y los servicios
      const population_density = getRandomFloat();
      const education_level = getRandomFloat();
      const services = {
        schools: getRandomFloat(),
        hospitals: getRandomFloat(),
        public_transport: getRandomFloat(),
      };
      // Usamos una distribución exponencial para el ingreso promedio para crear una desigualdad un tanto alta
      const avg_income = getRandomExponential();
      // Calculamos el nivel de ingresos basado en el ingreso promedio, el nivel de educación y los servicios
      const income_level = calcIncomeLevel(
        avg_income,
        education_level,
        services
      );

      // Creamos la celda con todos los datos generados
      const cell = {
        zone_code: zone_code++,
        population_density,
        avg_income,
        education_level,
        services,
        income_level,
      };

      // Agregamos la celda a la columna
      col.push(cell);
    }
    // Agregamos la columna a la cuadrícula
    grid.push(col);
  }
  // Devolvemos la cuadrícula generada
  return grid;
};

export default generateInitialGrid;
