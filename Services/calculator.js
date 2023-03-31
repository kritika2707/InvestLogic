const { VALIDATION_CONSTANTS } = require('../constants/validation')
const getStepUpCalculator = async ( { monthlyInvestment, investmentPeriod, rateOfReturn, yearlyIncrement}) => {
  try {
    const graph = [
      //Initial values for plotting graph
      {
        currentYear:0,        
        sipStepUp:0, 
        investment:0
      }
    ]
    // converting strings into integer/float for further use
    monthlyInvestment = parseInt(monthlyInvestment)
    investmentPeriod = parseInt(investmentPeriod)
    rateOfReturn = parseFloat(rateOfReturn)
    yearlyIncrement = parseInt(yearlyIncrement)
    let ror = rateOfReturn / (VALIDATION_CONSTANTS.MONTHS_IN_A_YEAR * VALIDATION_CONSTANTS.PERCENTAGE)
    // for loop for calculating values for every year
    for (let year = 1; year <= investmentPeriod; year++) {
      let monthlyInvestmentCopy = monthlyInvestment;
      var totalSipWithStepUp = 0, cummulationAmount = 0, totalInvestmentAmount = 0
      let periodInMonth = year * VALIDATION_CONSTANTS.MONTHS_IN_A_YEAR
      // for loop for calculating values till periodInMonth
      for (let month = 1; month <= periodInMonth; month++) {
        // increment calculation for next year
        if (month !== 1 && month % VALIDATION_CONSTANTS.MONTHS_IN_A_YEAR == 1) {
          // adding increment to monthly investment in the starting of every year
          monthlyInvestmentCopy += monthlyInvestmentCopy * (yearlyIncrement / VALIDATION_CONSTANTS.PERCENTAGE)
        }
        // calculating compounded amount
        cummulationAmount = monthlyInvestmentCopy * Math.pow(1 + ror, periodInMonth - month + 1)
        // calculating sip growth with yearly increment
        totalSipWithStepUp += cummulationAmount
        // calculating total investment till that month  
        totalInvestmentAmount += monthlyInvestmentCopy
      }
      // pushing calculated values in graph for every year
      graph.push(
        {
          currentYear: year,
          sipStepUp: Math.round(totalSipWithStepUp),
          investment: Math.round(totalInvestmentAmount),
        }
      )
    }
     
    const graphResult = {
      graph,
      totalSipWithStepUp:Math.round(totalSipWithStepUp),
      totalInvestmentAmount:Math.round(totalInvestmentAmount),
      capitalGain:Math.round(totalSipWithStepUp-totalInvestmentAmount)
    }
    return graphResult
  } catch (error) {
    throw error
  }
}

module.exports = {
  getStepUpCalculator
}
