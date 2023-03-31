const { constants } = require('../Constants/validation')
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
    let ror = rateOfReturn / (constants.MONTHSINAYEAR * constants.PERCENTAGE)
    // for loop for calculating values for every year
    for (let year = 1; year <= investmentPeriod; year++) {
      let monthlyInvestmentCopy = monthlyInvestment;
      var totalSipWithStepUp = 0, cummulationAmount = 0, totalInvestmentAmount = 0
      let periodInMonth = year * constants.MONTHSINAYEAR
      // for loop for calculating values till periodInMonth
      for (let i = 1; i <= periodInMonth; i++) {
        // increment will not be performed for 1st year
        if (i !== 1) {
          // increment calculation for next year
          if (i % constants.MONTHSINAYEAR == 1) {
            // adding increment to monthly investment in the starting of every year
            monthlyInvestmentCopy += monthlyInvestmentCopy * (yearlyIncrement / constants.PERCENTAGE)
          }
        }
        // calculating compound interest
        cummulationAmount = monthlyInvestmentCopy * Math.pow(1 + ror, periodInMonth - i + 1)
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

    console.log(graphResult)
    return graphResult
  } catch (error) {
    throw error
  }
}

module.exports = {
  getStepUpCalculator
}
