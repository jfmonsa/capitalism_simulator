const Controls = ({
  onSingleStep,
  onToggleRunning,
  isRunning,
  onPolicyChange,
  selectedPolicy,
}) => {
  return (
    <div className="controls">
      <button onClick={onSingleStep}>Single Step</button>
      <button onClick={onToggleRunning}>{isRunning ? "Stop" : "Start"}</button>
      <select
        value={selectedPolicy}
        onChange={(e) => onPolicyChange(parseInt(e.target.value))}
      >
        <option value={1}>Affordable Housing</option>
        <option value={2}>Public Transport Improvements</option>
        <option value={3}>Education Investments</option>
      </select>
    </div>
  );
};

export default Controls;
