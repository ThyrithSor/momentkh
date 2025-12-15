const momentkh2 = require('./momentkh2');
const moment = require('moment');
require('./momentkh')(moment);

console.log('Checking month ជេស្ឋ (month 6) in BE 2536:');

// My implementation
const beYear = 2536;
const monthIndex = 6;

// Call the internal function (need to extract it)
// For now, let me check by looking at the conversion

// Let's check what the original says about days in each month for BE 2536
const testDate = moment('1992-06-01'); // This should be in BE 2536
console.log('\n1992-06-01:', testDate.toKhDate());
console.log('khMonth:', testDate.khMonth());
console.log('khYear:', testDate.khYear());

// Check if ជេស្ឋ has 29 or 30 days by checking the boundary
const june30 = moment('1992-06-30');
const july1 = moment('1992-07-01');

console.log('\n1992-06-30:', june30.toKhDate());
console.log('khDay:', june30.khDay(), 'khMonth:', june30.khMonth());

console.log('\n1992-07-01:', july1.toKhDate());
console.log('khDay:', july1.khDay(), 'khMonth:', july1.khMonth());

// If June 30 is day 29 of ជេស្ឋ and July 1 is day 0 of អាសាឍ, then ជេស្ឋ has 30 days
// If June 30 is the last day (day 28 or 29) and July 1 is day 0 of អាសាឍ, then we need to check
