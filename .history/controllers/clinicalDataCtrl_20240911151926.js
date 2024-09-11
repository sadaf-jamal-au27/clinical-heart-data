const { processHeartRateData, saveHeartRateData } = require('../services/clinicalDataService');
const logger = require('../config/logger');

// Controller for uploading data
const uploadClinicalData = async (req, res, next) => {
  try {
    const heartRateData = req.body.clinical_data.HEART_RATE.data;

    if (!heartRateData || !Array.isArray(heartRateData)) {
      const error = new Error('Invalid heart rate data');
      error.status = 400;
      throw error;
    }

    // Save and process heart rate data
    await saveHeartRateData(heartRateData);
    const processedHeartRateData = processHeartRateData(heartRateData);

    logger.info('Heart rate data successfully processed');

    res.json({
      heart_rate: processedHeartRateData,
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

module.exports = { uploadClinicalData };
