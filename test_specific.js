// Test a specific date to debug the offset
const moment = require('moment');
require('./momentkh')(moment);
const momentkh2 = require('./momentkh2');

// Test the epoch first
console.log('Testing epoch (Jan 1, 1900):');
const epochOrig = moment('1900-01-01');
const epochNew = momentkh2.fromGregorian(1900, 1, 1);

console.log('Original:', epochOrig.toKhDate());
console.log('          khDay=', epochOrig.khDay(), 'khMonth=', epochOrig.khMonth());
console.log('New:     ', momentkh2.format(epochNew));
console.log('          dayNumber=', epochNew._khmerDateObj.getDayNumber(), 'monthIndex=', epochNew.khmer.monthIndex);

// Test epoch +1 day
console.log('\nTesting epoch +1 day (Jan 2, 1900):');
const epoch1Orig = moment('1900-01-02');
const epoch1New = momentkh2.fromGregorian(1900, 1, 2);

console.log('Original:', epoch1Orig.toKhDate());
console.log('          khDay=', epoch1Orig.khDay(), 'khMonth=', epoch1Orig.khMonth());
console.log('New:     ', momentkh2.format(epoch1New));
console.log('          dayNumber=', epoch1New._khmerDateObj.getDayNumber(), 'monthIndex=', epoch1New.khmer.monthIndex);

// Test a date that had -1 offset
console.log('\nTesting 1992-07-16 (had -1 offset):');
const testOrig = moment('1992-07-16');
const testNew = momentkh2.fromGregorian(1992, 7, 16);

console.log('Original:', testOrig.toKhDate());
console.log('          khDay=', testOrig.khDay(), 'khMonth=', testOrig.khMonth());
console.log('New:     ', momentkh2.format(testNew));
console.log('          dayNumber=', testNew._khmerDateObj.getDayNumber(), 'monthIndex=', testNew.khmer.monthIndex);
