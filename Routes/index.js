const express = require('express')
const router = express.Router()
const { getStepUpCalculator } = require('../Controller/calculator')

// api for sip step up calculator
router.get("/getSipStepUpCalculator", getStepUpCalculator)

                        
module.exports = router