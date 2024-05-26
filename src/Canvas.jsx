import { useEffect, useRef, useState } from "react";

export const Canvas = ({ grid, width, height, cellSize }) => {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  useEffect(() => {
    drawGrid(grid);
  }, [grid]);

  const drawGrid = (grid) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        ctx.fillStyle = getColor(grid[x][y].income_level); // Cambiado de avg_income a income_level
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  };

  const getColor = (incomeLevel) => {
    switch (incomeLevel) {
      case "High":
        return "blue";
      case "Medium":
        return "yellow";
      case "Low":
        return "red";
      default:
        return "white";
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);

    if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
      const cell = grid[x][y];
      setTooltip({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        content: `Zone: ${cell.zone_code}, Income Level: ${cell.income_level}, Avg Income: ${cell.avg_income}, Education: ${cell.education_level}, Population: ${cell.population_density}`,
      });
    } else {
      setTooltip({ ...tooltip, visible: false });
    }
  };

  const handleMouseOut = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      />
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            pointerEvents: "none",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </>
  );
};

export default Canvas;
