// Función para calcular el nivel de ingresos basado en el ingreso promedio, el nivel de educación y los servicios disponibles
const calcIncomeLevel = (avg_income, education_level, services) => {
  // Calculamos un puntaje de servicio promediando los puntajes de las escuelas, los hospitales y el transporte público
  const serviceScore =
    (services.schools + services.hospitals + services.public_transport) / 3;
  // Si el ingreso promedio es mayor o igual a 2 y el puntaje de servicio es mayor a 0.4, o si el ingreso promedio es mayor a 8
  if ((avg_income >= 2 && serviceScore > 0.4) || avg_income > 8) {
    return 'High'; // El nivel de ingresos es alto
  }
  // Si el nivel de educación es mayor a 0.6 o el puntaje de servicio es mayor a 0.6, y el ingreso promedio es mayor o igual a 0.5
  else if ((education_level > 0.6 || serviceScore > 0.6) && avg_income >= 0.5) {
    return 'Medium'; // El nivel de ingresos es medio
  }
  // En cualquier otro caso
  return 'Low'; // El nivel de ingresos es bajo
};

export default calcIncomeLevel;
