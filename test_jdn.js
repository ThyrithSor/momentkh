// Test JDN calculation
const moment = require('moment');

// My JDN function
function myJdn(y, m, d) {
  const a = Math.floor((14 - m) / 12);
  const y_adj = y + 4800 - a;
  const m_adj = m + 12 * a - 3;
  return d + Math.floor((153 * m_adj + 2) / 5) + 365 * y_adj +
         Math.floor(y_adj / 4) - Math.floor(y_adj / 100) + Math.floor(y_adj / 400) - 32045;
}

console.log('Testing JDN calculations:\n');

// Epoch
const epoch = moment('1900-01-01');
const myEpochJdn = myJdn(1900, 1, 1);
console.log('Epoch (1900-01-01):');
console.log('  My JDN:', myEpochJdn);
console.log('  Moment unix:', epoch.unix());
console.log('  Moment days since epoch:', epoch.diff(moment('1970-01-01'), 'days'));

// Target
const target = moment('1992-07-16');
const myTargetJdn = myJdn(1992, 7, 16);
console.log('\nTarget (1992-07-16):');
console.log('  My JDN:', myTargetJdn);

// Difference
const momentDiff = target.diff(epoch, 'days');
const myDiff = myTargetJdn - myEpochJdn;
console.log('\nDifference:');
console.log('  Moment.diff():', momentDiff);
console.log('  My calculation:', myDiff);
console.log('  Discrepancy:', myDiff - momentDiff);

// Test a few specific dates to verify JDN
const testDates = [
  { date: '2000-01-01', jdn: 2451545 },
  { date: '2000-01-02', jdn: 2451546 },
];

console.log('\n=== Verifying JDN with known values ===');
testDates.forEach(({ date, jdn }) => {
  const [y, m, d] = date.split('-').map(Number);
  const calculated = myJdn(y, m, d);
  console.log(`${date}: Expected ${jdn}, Got ${calculated}, ${calculated === jdn ? '✓' : '✗'}`);
});
