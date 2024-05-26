const Controls = ({
  onSingleStep,
  onToggleRunning,
  onReset,
  isRunning,
  onPolicyChange,
  selectedPolicy,
}) => {
  return (
    <div className="controls">
      <button onClick={onSingleStep}>Single Step</button>
      <button onClick={onToggleRunning}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={onReset}>Reset</button>
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
