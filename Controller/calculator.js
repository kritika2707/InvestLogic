const services = require("../Services/calculator")
const { constants }  = require("../Constants/validation")


const getStepUpCalculator = async (req, res) => {
  try {
   let { monthlyInvestment, investmentPeriod, rateOfReturn, yearlyIncrement } = req.query
   // converting strings into integer/float for further use
    monthlyInvestment = parseInt(monthlyInvestment)
    investmentPeriod = parseInt(investmentPeriod)
    rateOfReturn = parseFloat(rateOfReturn)
    yearlyIncrement = parseInt(yearlyIncrement)
    // Validating values getting from frontend
    if ( monthlyInvestment < constants.MONTHLYINVESTMENTMIN || monthlyInvestment > constants.MONTHLYINVESTMENTMAX )
      throw "Invalid monthly investment"
    else if( investmentPeriod < constants.MINIMUMVALUE || investmentPeriod > constants.MAXIMUMVALUE )
      throw "Invalid investment period"
    else if( rateOfReturn < constants.MINIMUMVALUE || rateOfReturn > constants.MAXIMUMVALUE )
      throw "Invalid rate of return"
    else if( yearlyIncrement < constants.MINIMUMVALUE || yearlyIncrement > constants.MAXIMUMVALUE )
      throw "Invalid yearly increment"
    else {
      // getting calculated result from services
      const result = await services.getStepUpCalculator( {monthlyInvestment, investmentPeriod, rateOfReturn, yearlyIncrement })
      res.send({
        status: 0,
        message: "Request Successful",
        result: result
      })
    }
  } catch (error) {
    res.send({
      status: -1,
      message: "Invalid inputs",
      result: error
    })
  }
}

module.exports = {
  getStepUpCalculator
}
