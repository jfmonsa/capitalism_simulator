const countIncomeLevels = (grid) => {
  let poorCount = 0;
  let middleCount = 0;
  let richCount = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      switch (grid[x][y].income_level) {
        case "Low":
          poorCount++;
          break;
        case "Medium":
          middleCount++;
          break;
        case "High":
          richCount++;
          break;
        default:
          break;
      }
    }
  }

  return {
    poor: poorCount,
    middle: middleCount,
    rich: richCount,
  };
};

export default countIncomeLevels;
