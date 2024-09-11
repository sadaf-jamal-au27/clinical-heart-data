const moment = require('moment');
const { HeartRate } = require('../models');

// Save heart rate data to the database
async function saveHeartRateData(data) {
  const heartRateEntries = data.map(entry => ({
    timestamp: entry.on_date,
    measurement: parseInt(entry.measurement, 10),
  }));

  await HeartRate.bulkCreate(heartRateEntries);
}

// Process heart rate data to group by 15-minute intervals
function processHeartRateData(data) {
  const interval = 15; // 15-minute intervals
  const aggregatedData = [];

  const sortedData = data.sort((a, b) => new Date(a.on_date) - new Date(b.on_date));

  sortedData.forEach(entry => {
    const dateTime = moment(entry.on_date);
    const startInterval = dateTime.clone().startOf('minute').subtract(dateTime.minute() % interval, 'minutes');
    const endInterval = startInterval.clone().add(interval, 'minutes');

    const existingInterval = aggregatedData.find(
      data => data.from_date === startInterval.toISOString() && data.to_date === endInterval.toISOString()
    );

    if (existingInterval) {
      existingInterval.measurement.low = Math.min(existingInterval.measurement.low, parseInt(entry.measurement, 10));
      existingInterval.measurement.high = Math.max(existingInterval.measurement.high, parseInt(entry.measurement, 10));
    } else {
      aggregatedData.push({
        from_date: startInterval.toISOString(),
        to_date: endInterval.toISOString(),
        measurement: {
          low: parseInt(entry.measurement, 10),
          high: parseInt(entry.measurement, 10),
        },
      });
    }
  });

  return aggregatedData;
}

module.exports = { saveHeartRateData, processHeartRateData };
