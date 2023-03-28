const path = require("path");
const calculateData = require("../../server/Services/calculator");

const monthlyInvestmentMin = 500;
const monthlyInvestmentMax = 1000000;
const investmentPeriodMin = 1;
const investmentPeriodMax = 30;
const rateOfReturnMin = 1;
const rateOfReturnMax = 30;
const yearlyIncrementMin = 1;
const yearlyIncrementMax = 12;
 
const validation = (monthlyInvestment, investmentPeriod, rateOfReturn, yearlyIncrement)=>{
   if( monthlyInvestment < monthlyInvestmentMin||
    monthlyInvestment > monthlyInvestmentMax ||
    investmentPeriod < investmentPeriodMin ||
    investmentPeriod > investmentPeriodMax ||
    rateOfReturn < rateOfReturnMin ||
    rateOfReturn > rateOfReturnMax ||
    yearlyIncrement < yearlyIncrementMin ||
    yearlyIncrement > yearlyIncrementMax
    ){
        return true;
    }
    return false;
}
const controlData = async (req, res) => {
  try {
    const monthlyInvestment = parseInt(req.query.monthlyInvestment);
    const investmentPeriod = parseInt(req.query.investmentPeriod);
    const rateOfReturn = parseFloat(req.query.rateOfReturn);
    const yearlyIncrement = parseInt(req.query.yearlyIncrement);
    if ( validation(monthlyInvestment, investmentPeriod, rateOfReturn, yearlyIncrement)) {
        throw new Error("Invalid Inputs");
    } else {
        const result = await calculateData(monthlyInvestment,investmentPeriod,rateOfReturn,yearlyIncrement);
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
      result: error,
    });
  }
};

module.exports = controlData;