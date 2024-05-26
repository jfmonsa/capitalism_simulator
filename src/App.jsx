/*import { useState, useEffect, useRef } from "react";
import Canvas from "./Canvas.jsx";
import Controls from "./Controls.jsx";

// Aux functions
import generateInitialGrid from "./utils/genInitialGrid";
import updateGrid from "./utils/updateGrid";

// Constants
const CELL_SIZE = 10;
const WIDTH = 500;
const HEIGHT = 500;
const COLS = WIDTH / CELL_SIZE;
const ROWS = HEIGHT / CELL_SIZE;

const App = () => {
  const [grid, setGrid] = useState(() => generateInitialGrid(COLS, ROWS));
  const [isRunning, setIsRunning] = useState(false);
  const [selectedRule, setSelectedRule] = useState(1);
  const intervalRef = useRef(null);

  const handleSingleStep = () => {
    setGrid((prevGrid) => updateGrid(prevGrid, selectedRule));
  };

  const handleToggleRunning = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setGrid((prevGrid) => updateGrid(prevGrid, selectedRule));
      }, 100); // Intervalo ajustado a 100ms
    }
    setIsRunning(!isRunning);
  };

  const handleRuleChange = (rule) => {
    setSelectedRule(rule);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <main>
      <Canvas grid={grid} width={WIDTH} height={HEIGHT} cellSize={CELL_SIZE} />
      <Controls
        onSingleStep={handleSingleStep}
        onToggleRunning={handleToggleRunning}
        isRunning={isRunning}
        onRuleChange={handleRuleChange}
        selectedRule={selectedRule}
      />
    </main>
  );
};

export default App;
*/

import { useState, useEffect, useRef } from "react";
import Canvas from "./Canvas.jsx";
import Controls from "./Controls.jsx";

// Aux functions
import generateInitialGrid from "./utils/genInitialGrid";
import updateGrid from "./utils/updateGrid";

// Constants
const CELL_SIZE = 10;
const WIDTH = 500;
const HEIGHT = 500;
const COLS = WIDTH / CELL_SIZE;
const ROWS = HEIGHT / CELL_SIZE;

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

  const handlePolicyChange = (policy) => {
    setSelectedPolicy(policy);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <main>
      <Canvas grid={grid} width={WIDTH} height={HEIGHT} cellSize={CELL_SIZE} />
      <Controls
        onSingleStep={handleSingleStep}
        onToggleRunning={handleToggleRunning}
        isRunning={isRunning}
        onPolicyChange={handlePolicyChange}
        selectedPolicy={selectedPolicy}
      />
    </main>
  );
};

export default App;
