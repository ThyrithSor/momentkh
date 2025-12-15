// Debug the calculation for 1992-07-16
const moment = require('moment');
require('./momentkh')(moment);

console.log('=== Testing 1992-07-16 with ORIGINAL momentkh ===\n');

const testDate = moment('1992-07-16');
console.log('Result:', testDate.toKhDate());
console.log('khDay:', testDate.khDay());  // Should be 16
console.log('khMonth:', testDate.khMonth());  // Should be 7
console.log('khYear:', testDate.khYear());  // Should be 2536

// Now let's manually trace through what should happen
console.log('\n=== Manual calculation ===');

const epoch = moment('1900-01-01');
const target = moment('1992-07-16');
const diffMs = target.diff(epoch);
const diffDays = Math.floor(moment.duration(diffMs).asDays());

console.log('Difference in days:', diffDays);

// The original algorithm moves epoch by Khmer years, then months, then adds remaining days
// We should end up with khmerDay = 16, which is the remaining days after moving by years and months

// Let's check: after moving by full years and months, how many days should be left?
// If the final khmerDay is 16, that means there were 16 days remaining

console.log('\nLet me check what month we should be in...');
console.log('Result month:', testDate.khMonth(), '(อาสาឍ)');
console.log('Result day in month (0-based):', testDate.khDay());
