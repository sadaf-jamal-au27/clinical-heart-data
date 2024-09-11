const moment = require('moment');
const { HeartRateData } = require('../models');

const roundTo15Minutes = (date) => {
  return moment(date).startOf('minute').subtract(moment(date).minute() % 15, 'minutes');
};

const processHeartRateData = async (data) => {
  const intervals = {};

  data.forEach(({ on_date, measurement }) => {
    const roundedStart = roundTo15Minutes(on_date);
    const roundedEnd = moment(roundedStart).add(15, 'minutes').toISOString();

    if (!intervals[roundedStart]) {
      intervals[roundedStart] = { from_date: roundedStart, to_date: roundedEnd, measurement: { low: Infinity, high: -Infinity } };
    }

    const value = parseInt(measurement, 10);
    intervals[roundedStart].measurement.low = Math.min(intervals[roundedStart].measurement.low, value);
    intervals[roundedStart].measurement.high = Math.max(intervals[roundedStart].measurement.high, value);
  });

  const aggregatedData = Object.values(intervals);

  // Save to database
  for (const data of aggregatedData) {
    await HeartRateData.create({
      from_date: data.from_date,
      to_date: data.to_date,
      low: data.measurement.low,
      high: data.measurement.high,
    });
  }

  return aggregatedData;
};

module.exports = { processHeartRateData };
