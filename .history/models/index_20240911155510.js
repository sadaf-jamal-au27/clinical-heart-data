const sequelize = require('../config/db');
const HeartRateData = require('./heartRateData');

const db = {
  sequelize,
  HeartRateData,
};

module.exports = db;
