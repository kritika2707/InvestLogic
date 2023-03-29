const express = require('express');
const router = express.Router();
const controlData = require('../../InvestLogic/Controller/calculator');

router.get("/getResult",controlData);

                        
                        
                        
                        

module.exports = router;