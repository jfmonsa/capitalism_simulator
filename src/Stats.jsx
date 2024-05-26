import calcGiniIndex from "./utils/calcGiniIndex";
import countIncomeLevels from "./utils/countIncomeLevels";

const getPercentage = (val, total) => {
  return (val / total) * 100;
};

const Stats = ({ grid, totalCells }) => {
  const results = countIncomeLevels(grid);
  return (
    <>
      <h3>Estadisticas</h3>
      <ul>
        <li>Indice Gini del Automata: {calcGiniIndex(grid)}</li>
        <li>
          {`Zonas de ingreso bajo: ${results.poor} - ${getPercentage(
            results.poor,
            totalCells
          )} %`}
        </li>
        <li>
          {`Zonas de ingreso medio: ${results.middle} - ${getPercentage(
            results.middle,
            totalCells
          )} %`}
        </li>
        <li>
          {`Zonas de ingreso alto: ${results.rich} - ${getPercentage(
            results.rich,
            totalCells
          )} %`}
        </li>
      </ul>
    </>
  );
};
export default Stats;
