const calcIncomeLevel = (avg_income, education_level, services) => {
  const serviceScore =
    (services.schools + services.hospitals + services.public_transport) / 3;
  if ((avg_income >= 2 && serviceScore > 0.4) || avg_income > 8) {
    return "High"; // High income
  } else if (
    (education_level > 0.6 || serviceScore > 0.6) &&
    avg_income >= 0.5
  ) {
    return "Medium"; // Medium income
  }
  return "Low"; // Low income
};

export default calcIncomeLevel;
