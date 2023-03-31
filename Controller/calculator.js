const services = require("../Services/calculator")
const { constants }  = require("../Constants/validation")

const getStepUpCalculator = async (req, res) => {
  try {
   let { monthlyInvestment, investmentPeriod, rateOfReturn, yearlyIncrement } = req.query
    monthlyInvestment = parseInt(monthlyInvestment)
    investmentPeriod = parseInt(investmentPeriod)
    rateOfReturn = parseFloat(rateOfReturn)
    yearlyIncrement = parseInt(yearlyIncrement)

    if ( monthlyInvestment < constants.MONTHLYINVESTMENTMIN || monthlyInvestment > constants.MONTHLYINVESTMENTMAX )
      throw "Invalid monthly investment"
    else if( investmentPeriod < constants.INVESTMENTPERIODMIN || investmentPeriod > constants.INVESTMENTPERIODMAX )
      throw "Invalid investment period"
    else if( rateOfReturn < constants.RATEOFRETURNMIN || rateOfReturn > constants.RATEOFRETURNMAX )
      throw "Invalid rate of return"
    else if( yearlyIncrement < constants.YEARLYINCREMENTMIN || yearlyIncrement > constants.YEARLYINCREMENTMAX )
      throw "Invalid yearly increment"
    else {
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
