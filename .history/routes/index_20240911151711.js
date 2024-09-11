const express = require('express');
const { uploadClinicalData } = require('../controllers/clinicalDataController');
const { validateHeartRateData } = require('../middlewares/requestValidator');

const router = express.Router();

// Route to process clinical data with validation
router.post('/upload', validateHeartRateData, uploadClinicalData);

module.exports = router;
