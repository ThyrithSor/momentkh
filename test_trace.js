// Trace through the algorithm step by step for 1992-07-16
const momentkh2 = require('./momentkh2');

// Monkey-patch the function to add logging
const originalGregorianToKhmer = momentkh2.fromGregorian;

console.log('Testing 1992-07-16 with detailed logging:\n');

// Manually trace through the logic
const year = 1992, month = 7, day = 16;

console.log(`Input: ${year}-${month}-${day}`);

// Call the function
const result = momentkh2.fromGregorian(year, month, day);

console.log('\nResult:');
console.log('  dayNumber:', result._khmerDateObj.getDayNumber());
console.log('  Expected: 16');
console.log('  Difference:', result._khmerDateObj.getDayNumber() - 16);
console.log('\nFull Khmer date:', momentkh2.format(result));

// Let me manually calculate what should happen
console.log('\n=== Manual step-by-step ===');

// JDN calculation
function jdn(y, m, d) {
  const a = Math.floor((14 - m) / 12);
  const y_adj = y + 4800 - a;
  const m_adj = m + 12 * a - 3;
  return d + Math.floor((153 * m_adj + 2) / 5) + 365 * y_adj +
         Math.floor(y_adj / 4) - Math.floor(y_adj / 100) + Math.floor(y_adj / 400) - 32045;
}

const epochJdn = jdn(1900, 1, 1);
const targetJdn = jdn(1992, 7, 16);
const diffDays = targetJdn - epochJdn;

console.log('Epoch JDN:', epochJdn);
console.log('Target JDN:', targetJdn);
console.log('Difference:', diffDays);

// The original's result is khDay = 16
// So after moving by years and months, there should be 16 days remaining
console.log('\nAfter moving by full years and months, remaining should be 16');
console.log('But we\'re getting 15');
console.log('This suggests we\'re moving one month too far or one day too far');
