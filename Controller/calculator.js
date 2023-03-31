const services = require('../services/calculator')
const { VALIDATION_CONSTANTS }  = require('../constants/validation')

const getStepUpCalculator = async (request, response) => {
  try {
   let { monthlyInvestment, investmentPeriod, rateOfReturn, yearlyIncrement } = request.query
   // converting strings into integer/float for further use
    monthlyInvestment = parseInt(monthlyInvestment)
    investmentPeriod = parseInt(investmentPeriod)
    rateOfReturn = parseFloat(rateOfReturn)
    yearlyIncrement = parseInt(yearlyIncrement)
    // Validating values getting from frontend
    if ( monthlyInvestment < VALIDATION_CONSTANTS.MONTHLY_INVESTMENT_MIN || monthlyInvestment > VALIDATION_CONSTANTS.MONTHLY_INVESTMENT_MAX )
      throw 'Invalid monthly investment'
    else if( investmentPeriod < VALIDATION_CONSTANTS.MINIMUM_VALUE || investmentPeriod > VALIDATION_CONSTANTS.MAXIMUM_VALUE )
      throw 'Invalid investment period'
    else if( rateOfReturn < VALIDATION_CONSTANTS.MINIMUM_VALUE || rateOfReturn > VALIDATION_CONSTANTS.MAXIMUM_VALUE )
      throw 'Invalid rate of return'
    else if( yearlyIncrement < VALIDATION_CONSTANTS.MINIMUM_VALUE || yearlyIncrement > VALIDATION_CONSTANTS.MAXIMUM_VALUE )
      throw 'Invalid yearly increment'
      // getting calculated result from services
      const result = await services.getStepUpCalculator(request.query)
      response.send({
        status: 0,
        message: 'Request Successful',
        result
      })
  } catch (error) {
    response.send({
      status: -1,
      message: error.message || error
    })
  }
}

module.exports = {
  getStepUpCalculator
}
