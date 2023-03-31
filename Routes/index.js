const express = require('express')
const router = express.Router()
const { getStepUpCalculator } = require('../controller/calculator')

// api for sip step up calculator
router.get('/sipStepUpCalculator', getStepUpCalculator)
                        
module.exports = {
    router
}