const moment = require('moment');

// Helper function to round a timestamp down to the nearest 15-minute interval
const roundTo15Minutes = (date) => {
  return moment(date).startOf('minute').subtract(moment(date).minute() % 15, 'minutes');
};

const processHeartRateData = async (data) => {
  const intervals = {};

  data.forEach(({ on_date, measurement }) => {
    const timestamp = moment(on_date).toISOString();
    const roundedStart = roundTo15Minutes(on_date);
    const roundedEnd = moment(roundedStart).add(15, 'minutes').toISOString();

    if (!intervals[roundedStart]) {
      intervals[roundedStart] = { from_date: roundedStart, to_date: roundedEnd, measurement: { low: Infinity, high: -Infinity } };
    }

    const value = parseInt(measurement, 10);
    intervals[roundedStart].measurement.low = Math.min(intervals[roundedStart].measurement.low, value);
    intervals[roundedStart].measurement.high = Math.max(intervals[roundedStart].measurement.high, value);
  });

  return Object.values(intervals);
};

module.exports = { processHeartRateData };
