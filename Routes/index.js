const express = require('express');
const router = express.Router();
const controlData = require('../../server/Controller/calculator');

router.get("/getResult",controlData);

                        
                        
                        
                        

module.exports = router;