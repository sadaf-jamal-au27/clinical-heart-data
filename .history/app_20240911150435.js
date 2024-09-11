const express = require('express');
const dotenv = require('dotenv')
const colors = require('colors')
const bodyParser = require('body-parser');
const { uploadClinicalData } = require('./controllers/clinicalDataCtrl');
const app = express();
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Route
app.post('/api/upload', uploadClinicalData);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
