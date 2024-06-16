import { useState, useEffect, useRef } from "react";
//Components
import Canvas from "./Canvas.jsx";
import Controls from "./Controls.jsx";
import Stats from "./Stats.jsx";

// Aux functions
import generateInitialGrid from "./utils/genInitialGrid";
import updateGrid from "./utils/updateGrid";

// Constants
const CELL_SIZE = 10;
const WIDTH = 500;
const HEIGHT = 500;
const COLS = WIDTH / CELL_SIZE;
const ROWS = HEIGHT / CELL_SIZE;

//main function
const App = () => {
  const [grid, setGrid] = useState(() => generateInitialGrid(COLS, ROWS));
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(1);
  const intervalRef = useRef(null);

  const handleSingleStep = () => {
    setGrid((prevGrid) => updateGrid(prevGrid, selectedPolicy));
  };

  const handleToggleRunning = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setGrid((prevGrid) => updateGrid(prevGrid, selectedPolicy));
      }, 100); // Intervalo ajustado a 100ms
    }
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePolicyChange = (policy) => {
    setSelectedPolicy(policy);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setGrid(generateInitialGrid(COLS, ROWS));
    setIsRunning(false);
  };

  return (
    <main>
      <h1>Automata celular</h1>
      <Canvas grid={grid} width={WIDTH} height={HEIGHT} cellSize={CELL_SIZE} />
      <Controls
        onSingleStep={handleSingleStep}
        onToggleRunning={handleToggleRunning}
        isRunning={isRunning}
        onPolicyChange={handlePolicyChange}
        selectedPolicy={selectedPolicy}
        onReset={handleReset}
      />
      <Stats grid={grid} totalCells={COLS * ROWS}></Stats>
    </main>
  );
};

export default App;
