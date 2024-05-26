const calcIncomeLevel = (avg_income, education_level, services) => {
  if (avg_income > 0.8) {
    return 2; // High income
  }
  const serviceScore =
    (services.schools + services.hospitals + services.public_transport) / 3;
  if (education_level > 0.6 || serviceScore > 0.6) {
    return 1; // Medium income
  }
  return 0; // Low income
};

export default calcIncomeLevel;
