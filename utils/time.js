const moment = require('moment');

const styles = {
  'post': 'MMMM Do YYYY, h:mm:ss a'
};

function formatTimestamp(ts, style) {
  style = style || 'post';
  const timestringTemplate = styles[style];
  return moment(ts, 'x').format(timestringTemplate)
}

module.exports = {
  formatTimestamp
}
