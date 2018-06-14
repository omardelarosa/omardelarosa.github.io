const moment = require('moment');

const styles = {
  'post': 'MMMM Do YYYY, h:mm:ss a'
};

function formatTimestamp(ts, style) {
  style = style || 'post';
  const timestringTemplate = styles[style];
  return moment(ts, 'x').format(timestringTemplate)
}

function toISO8601(ts) {
  const timestampInt = Number(ts);
  try {
    return (new Date(timestampInt)).toISOString();
  } catch (e) {
    console.warn('Encountered an invalid timestamp: ', ts);
    throw e;
  }
}

module.exports = {
  formatTimestamp,
  toISO8601
}
