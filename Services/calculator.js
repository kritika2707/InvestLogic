const calculateData = async (monthlyInvestment,investmentPeriod,rateOfReturn,yearlyIncrement) => {
  try {
    const graph = [];
    let totalInvestmentTillDate, sip;
    for (let year = 0; year <= investmentPeriod; year++) {
      let monthlyInvestmentCopy = monthlyInvestment 
      let totalSipWithStepUp = 0, cummulationAmount = 0, totalInvestmentAmount = 0;
      let Ror = rateOfReturn / 1200;
      let PeriodInMonth =year * 12;
      for (let i=1; i <= PeriodInMonth; i++) {
        if (i !== 1) {
          if (i % 12 == 1) {
            monthlyInvestmentCopy = monthlyInvestmentCopy + monthlyInvestmentCopy * (yearlyIncrement / 100);
          }
        }
        cummulationAmount = monthlyInvestmentCopy * Math.pow(1 + Ror, PeriodInMonth - i + 1);
        totalSipWithStepUp += cummulationAmount;
        totalInvestmentAmount += monthlyInvestmentCopy;
        
        totalInvestmentTillDate = totalInvestmentAmount.toFixed(0);
        sip = totalSipWithStepUp.toFixed(0);
      }
      const obj = {
        years: year,
        sipStepUp: Math.round(totalSipWithStepUp).toFixed(0),
        investment: Math.round(totalInvestmentAmount).toFixed(0),
      };
      graph.push(obj);
    }
    const graphResult = {
      graph,
      totalInvestmentTillDate,
      sip
    };
    return graphResult;
  } catch (error) {
    res.send(error);
  }
};

module.exports = calculateData;