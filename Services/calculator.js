const calculateData = async (
  monthlyInvestment,
  investmentPeriod,
  rateOfReturn,
  yearlyIncrement
) => {
  try {
    const graph = [];
    let totalInvestmentTillDate, sip, capital;
    for (let year = 0; year <= investmentPeriod; year++) {
      let monthlyInvestmentCopy = monthlyInvestment;
      let totalSipWithStepUp = 0,
        cummulationAmount = 0,
        totalInvestmentAmount = 0;
      let ror = rateOfReturn / 1200;
      let periodInMonth = year * 12;
      for (let i = 1; i <= periodInMonth; i++) {
        if (i !== 1) {
          if (i % 12 == 1) {
            monthlyInvestmentCopy =
              monthlyInvestmentCopy +
              monthlyInvestmentCopy * (yearlyIncrement / 100);
          }
        }
        cummulationAmount = monthlyInvestmentCopy * Math.pow(1 + ror, periodInMonth - i + 1);
        totalSipWithStepUp += cummulationAmount;
        totalInvestmentAmount += monthlyInvestmentCopy;

        totalInvestmentTillDate = totalInvestmentAmount.toFixed(0);
        sip = totalSipWithStepUp.toFixed(0);
      }
      const obj = {
        years: year,
        sipStepUp: Math.round(totalSipWithStepUp).toFixed(0),
        investment: Math.round(totalInvestmentAmount).toFixed(0),
      }
      graph.push(obj);
    };
    capital = sip - totalInvestmentTillDate;
    const graphResult = {
      graph,
      totalInvestmentTillDate,
      sip,
      capital,
    };
    return graphResult;
  } catch (error) {
    return error.message;
  }
};

module.exports = calculateData;
