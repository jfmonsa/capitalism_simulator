//distributions to gen avg_income
/*
Función usada para generar los valores inciales de avg_income en la función genInitialGrid
siguiendo una distribución exponencial, lo cual logra modelar una desigualdad un tanto alta
indice gini de alrededor 0.4 ~ 0.5

En este contexto, se usa para modelar valores de ingresos promedio (avg_income) que siguen
una distribución sesgada, donde los valores pequeños son más comunes que los grandes.
*/
export const getRandomExponential = (lambda = 0.8) => {
  let u = 0;
  while (u === 0) u = Math.random();
  return parseFloat((-Math.log(u) / lambda).toFixed(2));
};

/*
Distribución normal usada al inicio para gener valores de avg_income, generaba demasiadas zonas de clase
media
*/
export const getRandomNormal = (mean, stddev) => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return parseFloat(
    (
      Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * stddev +
      mean
    ).toFixed(2)
  );
};
