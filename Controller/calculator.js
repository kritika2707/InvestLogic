
const calculateData = require("../../InvestLogic/Services/calculator");
const {
  MONTHLYINVESTMENTMAX,
  MONTHLYINVESTMENTMIN,
  INVESTMENTPERIODMIN,
  INVESTMENTPERIODMAX,
  RATEOFRETURNMIN,
  RATEOFRETURNMAX,
  YEARLYINCREMENTMIN,
  YEARLYINCREMENTMAX,
} = require("../../InvestLogic/Constants/validation");

const controlData = async (req, res) => {
  try {
    

    const monthlyInvestment = parseInt(req.query.monthlyInvestment);
    const investmentPeriod = parseInt(req.query.investmentPeriod);
    const rateOfReturn = parseFloat(req.query.rateOfReturn);
    const yearlyIncrement = parseInt(req.query.yearlyIncrement);

    if ( 
      monthlyInvestment < MONTHLYINVESTMENTMIN ||
      monthlyInvestment > MONTHLYINVESTMENTMAX ||
      investmentPeriod < INVESTMENTPERIODMIN ||
      investmentPeriod > INVESTMENTPERIODMAX ||
      rateOfReturn < RATEOFRETURNMIN ||
      rateOfReturn > RATEOFRETURNMAX ||
      yearlyIncrement < YEARLYINCREMENTMIN ||
      yearlyIncrement > YEARLYINCREMENTMAX
    ) {
      throw new Error("Invalid Inputs");
    } else {
      const result = await calculateData(
        monthlyInvestment,
        investmentPeriod,
        rateOfReturn,
        yearlyIncrement
      );
      res.send({
        status: 0,
        message: "Request Successful",
        result: result,
      });
    }
  } catch (error) {
    res.send({
      status: -1,
      message: "Invalid inputs",
      result: error.message,
    });
  }
};

module.exports = controlData;
