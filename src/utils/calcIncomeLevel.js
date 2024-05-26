const calcIncomeLevel = (avg_income, education_level, services) => {
  const serviceScore =
    (services.schools + services.hospitals + services.public_transport) / 3;
  if ((avg_income >= 0.8 && serviceScore > 0.4) || avg_income > 5) {
    return "High"; // High income
  } else if (
    (education_level > 0.6 || serviceScore > 0.6) &&
    avg_income >= 0.45
  ) {
    return "Medium"; // Medium income
  }
  return "Low"; // Low income
};

export default calcIncomeLevel;
