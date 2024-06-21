// Esta función recibe una lista de vecinos y calcula varios promedios y recuentos basados en sus propiedades
const getCellInputs = (neighbors) => {
  // Inicializamos las variables que almacenarán los totales
  let totalIncome = 0;
  let totalEducation = 0;
  let totalServices = 0;

  // Inicializamos los contadores para cada nivel de ingresos
  let poorCount = 0;
  let middleCount = 0;
  let richCount = 0;

  // Recorremos la lista de vecinos
  neighbors.forEach((neighbor) => {
    // Sumamos los ingresos, el nivel de educación y los servicios del vecino a los totales
    totalIncome += neighbor.avg_income;
    totalEducation += neighbor.education_level;
    totalServices +=
      neighbor.services.schools +
      neighbor.services.hospitals +
      neighbor.services.public_transport;

    // Según el nivel de ingresos del vecino, incrementamos el contador correspondiente
    switch (neighbor.income_level) {
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
  });

  // Calculamos los promedios dividiendo los totales por el número de vecinos
  const avgNeighborIncome = totalIncome / neighbors.length;
  const avgNeighborEducation = totalEducation / neighbors.length;
  const avgNeighborServices = totalServices / (3 * neighbors.length);

  // Devolvemos un objeto con los promedios y los recuentos
  return {
    avgNeighborIncome,
    avgNeighborEducation,
    avgNeighborServices,
    poorCount,
    middleCount,
    richCount,
    totalIncome,
  };
};

// Exportamos la función para que pueda ser utilizada en otros módulos
export default getCellInputs;
