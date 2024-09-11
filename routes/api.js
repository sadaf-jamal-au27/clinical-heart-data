const express = require('express');
const router = express.Router();
const { processHeartRateData } = require('../utils/dataProcessor');

router.post('/process', async (req, res) => {
  try {
    const { clinical_data } = req.body;
    if (!clinical_data || !clinical_data.HEART_RATE) {
      return res.status(400).json({ error: 'HEART_RATE data is required' });
    }

    const heartRateData = clinical_data.HEART_RATE.data;
    const aggregatedData = await processHeartRateData(heartRateData);
    res.json({ heartRateData: aggregatedData });
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
