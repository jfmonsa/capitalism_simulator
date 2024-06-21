// Esta función cuenta los niveles de ingresos en una cuadrícula bidimensional.
const countIncomeLevels = (grid) => {
  // Inicializamos los contadores para cada nivel de ingresos
  let poorCount = 0;
  let middleCount = 0;
  let richCount = 0;

  // Recorremos la cuadrícula bidimensional
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      // Según el nivel de ingresos del elemento actual, incrementamos el contador correspondiente
      switch (grid[x][y].income_level) {
        case 'Low':
          poorCount++;
          break;
        case 'Medium':
          middleCount++;
          break;
        case 'High':
          richCount++;
          break;
        default:
          break;
      }
    }
  }

  // Devolvemos un objeto con el recuento de cada nivel de ingresos
  return {
    poor: poorCount,
    middle: middleCount,
    rich: richCount,
  };
};

// Exportamos la función para que pueda ser utilizada en otros módulos
export default countIncomeLevels;
