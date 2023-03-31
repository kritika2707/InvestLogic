const express = require('express')
const router = express.Router()
const { getStepUpCalculator } = require('../Controller/calculator')

router.get("/getSipStepUpCalculator", getStepUpCalculator)

                        
module.exports = router