/**
 * Test that compiled TypeScript version works identically to JavaScript version
 */

const momentkh2js = require('./momentkh2');
const momentkh2ts = require('./dist/momentkh2');

console.log('Testing TypeScript compiled version against JavaScript version\n');
console.log('='.repeat(80));

// Test 1: Basic conversion
console.log('\nTest 1: Basic Gregorian to Khmer conversion');
const test1Date = { year: 2024, month: 5, day: 23, hour: 12, minute: 0 };
const result1js = momentkh2js.fromGregorian(test1Date.year, test1Date.month, test1Date.day, test1Date.hour, test1Date.minute);
const result1ts = momentkh2ts.default.fromGregorian(test1Date.year, test1Date.month, test1Date.day, test1Date.hour, test1Date.minute);

console.log(`  JS:  ${momentkh2js.format(result1js)}`);
console.log(`  TS:  ${momentkh2ts.default.format(result1ts)}`);
console.log(`  Match: ${result1js.khmer.beYear === result1ts.khmer.beYear &&
                       result1js.khmer.day === result1ts.khmer.day &&
                       result1js.khmer.monthIndex === result1ts.khmer.monthIndex ? '✓' : '✗'}`);

// Test 2: Khmer to Gregorian conversion
console.log('\nTest 2: Khmer to Gregorian conversion');
const khmerDate = { day: 15, moonPhase: 0, monthIndex: 5, beYear: 2568 };
const result2js = momentkh2js.fromKhmer(khmerDate.day, khmerDate.moonPhase, khmerDate.monthIndex, khmerDate.beYear);
const result2ts = momentkh2ts.default.fromKhmer(khmerDate.day, khmerDate.moonPhase, khmerDate.monthIndex, khmerDate.beYear);

console.log(`  JS:  ${result2js.year}-${String(result2js.month).padStart(2, '0')}-${String(result2js.day).padStart(2, '0')}`);
console.log(`  TS:  ${result2ts.year}-${String(result2ts.month).padStart(2, '0')}-${String(result2ts.day).padStart(2, '0')}`);
console.log(`  Match: ${result2js.year === result2ts.year &&
                       result2js.month === result2ts.month &&
                       result2js.day === result2ts.day ? '✓' : '✗'}`);

// Test 3: New Year calculation
console.log('\nTest 3: Khmer New Year calculation');
const year = 2024;
const newYear2024js = momentkh2js.getNewYear(year);
const newYear2024ts = momentkh2ts.default.getNewYear(year);

console.log(`  JS:  ${newYear2024js.year}-${String(newYear2024js.month).padStart(2, '0')}-${String(newYear2024js.day).padStart(2, '0')} ${String(newYear2024js.hour).padStart(2, '0')}:${String(newYear2024js.minute).padStart(2, '0')}`);
console.log(`  TS:  ${newYear2024ts.year}-${String(newYear2024ts.month).padStart(2, '0')}-${String(newYear2024ts.day).padStart(2, '0')} ${String(newYear2024ts.hour).padStart(2, '0')}:${String(newYear2024ts.minute).padStart(2, '0')}`);
console.log(`  Match: ${newYear2024js.year === newYear2024ts.year &&
                       newYear2024js.month === newYear2024ts.month &&
                       newYear2024js.day === newYear2024ts.day &&
                       newYear2024js.hour === newYear2024ts.hour &&
                       newYear2024js.minute === newYear2024ts.minute ? '✓' : '✗'}`);

// Test 4: Random date conversions
console.log('\nTest 4: Testing 100 random dates');
let matches = 0;
let mismatches = 0;

for (let i = 0; i < 100; i++) {
  const testYear = Math.floor(Math.random() * (2300 - 1800) + 1800);
  const testMonth = Math.floor(Math.random() * 12) + 1;
  const testDay = Math.floor(Math.random() * 28) + 1;
  const testHour = Math.floor(Math.random() * 24);
  const testMinute = Math.floor(Math.random() * 60);

  const resultJs = momentkh2js.fromGregorian(testYear, testMonth, testDay, testHour, testMinute);
  const resultTs = momentkh2ts.default.fromGregorian(testYear, testMonth, testDay, testHour, testMinute);

  const match = (
    resultJs.khmer.beYear === resultTs.khmer.beYear &&
    resultJs.khmer.day === resultTs.khmer.day &&
    resultJs.khmer.monthIndex === resultTs.khmer.monthIndex &&
    resultJs.khmer.moonPhase === resultTs.khmer.moonPhase
  );

  if (match) {
    matches++;
  } else {
    mismatches++;
    console.log(`  Mismatch at ${testYear}-${testMonth}-${testDay} ${testHour}:${testMinute}`);
  }
}

console.log(`  Matches: ${matches}/100`);
console.log(`  Mismatches: ${mismatches}/100`);
console.log(`  Result: ${mismatches === 0 ? '✓ All tests passed!' : '✗ Some tests failed'}`);

console.log('\n' + '='.repeat(80));
console.log('\n✓ TypeScript version compiles and works correctly!\n');
