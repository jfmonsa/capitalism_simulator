//distributions to gen avg_income
export const getRandomExponential = (lambda = 1) => {
  let u = 0;
  while (u === 0) u = Math.random();
  return parseFloat((-Math.log(u) / lambda).toFixed(2));
};

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
