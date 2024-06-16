/* eslint-disable react/prop-types */
const Controls = ({
  onSingleStep,
  onToggleRunning,
  onReset,
  isRunning,
  onPolicyChange,
  selectedPolicy,
  valueTam,
  onChangeTam
}) => {
  return (
    // Componente de controles para gestionar la simulación
    <div className="controls">
      {/* botones */}
      <button onClick={onSingleStep}>Single Step</button>
      <button onClick={onToggleRunning}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={onReset}>Reset</button>

      {/* barra de desplazamiento */}
      <label>Densidad</label>
      <input
        type="range"
        min="500"
        max="1000"
        value={valueTam[0]}
        onChange={onChangeTam} />
      <label>{valueTam[0]}</label>

      {/* Selector de políticas */}
      <select
        value={selectedPolicy}
        onChange={(e) => onPolicyChange(parseInt(e.target.value))}
      >
        <option value={1}>Política 1: Social democracía timida</option>
        <option value={2}>Política 2: Neoliberalismo desatado</option>
        <option value={3}>Política 1: Socialismo democratico</option>
      </select>
    </div>
  );
};

export default Controls;
