const moment = require('moment');
require('./momentkh')(moment);

const testDate = moment('1992-07-16');
console.log('Date:', testDate.format('YYYY-MM-DD'));
console.log('khDay():', testDate.khDay());
console.log('khMonth():', testDate.khMonth());
console.log('khYear():', testDate.khYear());
console.log('Full:', testDate.toKhDate());

// Test epoch
const epoch = moment('1900-01-01');
console.log('\nEpoch:', epoch.format('YYYY-MM-DD'));
console.log('khDay():', epoch.khDay());
console.log('khMonth():', epoch.khMonth());

// Test days diff
console.log('\nDiff in days:', testDate.diff(epoch, 'days'));
