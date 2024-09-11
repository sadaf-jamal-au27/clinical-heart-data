const { processHeartRateData, saveHeartRateData } = require('../services/clinicalDataService');

// Controller for uploading data
const uploadClinicalData = async (req, res) => {
  try {
    const heartRateData = req.body.clinical_data.HEART_RATE.data;

    if (!heartRateData || !Array.isArray(heartRateData)) {
      return res.status(400).json({ error: 'Invalid heart rate data' });
    }

    // Save and process heart rate data
    await saveHeartRateData(heartRateData);
    const processedHeartRateData = processHeartRateData(heartRateData);

    res.json({
      heart_rate: processedHeartRateData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { uploadClinicalData };
