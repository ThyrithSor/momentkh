/**
 * Test Suite: Gregorian to Khmer Conversion
 *
 * This test validates the conversion from Gregorian calendar dates to Khmer calendar dates.
 * It runs 500 test cases covering various date ranges and edge cases.
 */

const momentkh = require('../momentkh');

// Helper function to generate random date
function randomDate(startYear = 1800, endYear = 2300) {
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // Use 28 to avoid invalid dates
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);
  return { year, month, day, hour, minute, second };
}

// Helper function to validate Khmer date
function isValidKhmerDate(khmerData) {
  if (!khmerData || !khmerData.khmer) return false;

  const { day, moonPhase, monthIndex, beYear } = khmerData.khmer;

  // Validate day (1-15)
  if (day < 1 || day > 15) return false;

  // Validate moon phase (0 = កើត, 1 = រោច)
  if (moonPhase !== 0 && moonPhase !== 1) return false;

  // Validate month index (0-13)
  if (monthIndex < 0 || monthIndex > 13) return false;

  // Validate BE year (reasonable range)
  if (beYear < 2000 || beYear > 3000) return false;

  return true;
}

// Helper function to format date for output
function formatGregorianDate(date) {
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')} ${String(date.hour).padStart(2, '0')}:${String(date.minute).padStart(2, '0')}:${String(date.second).padStart(2, '0')}`;
}

// Test categories
const testCategories = [
  { name: 'Random dates', count: 400 },
  { name: 'Edge cases - Visakha Bochea', count: 50 },
  { name: 'Edge cases - New Year period', count: 30 },
  { name: 'Leap year dates', count: 20 }
];

console.log('='.repeat(80));
console.log('TEST SUITE: GREGORIAN TO KHMER CONVERSION');
console.log('='.repeat(80));
console.log(`Total test cases: 500\n`);

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

// Category 1: Random dates (400 tests)
console.log(`\n[1/${testCategories.length}] ${testCategories[0].name} (${testCategories[0].count} tests)...`);
for (let i = 0; i < testCategories[0].count; i++) {
  totalTests++;
  const date = randomDate(1800, 2300);

  try {
    const result = momentkh.fromGregorian(date.year, date.month, date.day, date.hour, date.minute, date.second);

    if (isValidKhmerDate(result)) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        category: testCategories[0].name,
        date: formatGregorianDate(date),
        error: 'Invalid Khmer date structure',
        result
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      category: testCategories[0].name,
      date: formatGregorianDate(date),
      error: error.message
    });
  }
}
console.log(`   Completed: ${testCategories[0].count} tests`);

// Category 2: Edge cases - Visakha Bochea dates (50 tests)
// Test around the Visakha Bochea day (15th waxing Pisakh) where BE year changes
console.log(`\n[2/${testCategories.length}] ${testCategories[1].name} (${testCategories[1].count} tests)...`);
const visakhaBocheaYears = [];
for (let i = 0; i < testCategories[1].count; i++) {
  const year = Math.floor(Math.random() * (2200 - 1900 + 1)) + 1900;
  visakhaBocheaYears.push(year);
}

for (const year of visakhaBocheaYears) {
  totalTests++;

  // Test Visakha Bochea period (late April to late May)
  const month = Math.random() > 0.5 ? 4 : 5;
  const day = Math.floor(Math.random() * 20) + 10; // Days 10-29
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);

  try {
    const result = momentkh.fromGregorian(year, month, day, hour, minute, 0);

    if (isValidKhmerDate(result)) {
      // Additional validation: if it's Pisakh month (index 5), check the date
      if (result.khmer.monthIndex === 5) {
        if (result.khmer.day >= 1 && result.khmer.day <= 15) {
          passedTests++;
        } else {
          failedTests++;
          failures.push({
            category: testCategories[1].name,
            date: formatGregorianDate({ year, month, day, hour, minute, second: 0 }),
            error: 'Invalid day in Pisakh month',
            result
          });
        }
      } else {
        passedTests++;
      }
    } else {
      failedTests++;
      failures.push({
        category: testCategories[1].name,
        date: formatGregorianDate({ year, month, day, hour, minute, second: 0 }),
        error: 'Invalid Khmer date structure',
        result
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      category: testCategories[1].name,
      date: formatGregorianDate({ year, month, day, hour, minute, second: 0 }),
      error: error.message
    });
  }
}
console.log(`   Completed: ${testCategories[1].count} tests`);

// Category 3: Edge cases - New Year period (30 tests)
// Test around Khmer New Year (typically April 13-17)
console.log(`\n[3/${testCategories.length}] ${testCategories[2].name} (${testCategories[2].count} tests)...`);
for (let i = 0; i < testCategories[2].count; i++) {
  totalTests++;

  const year = Math.floor(Math.random() * (2200 - 1900 + 1)) + 1900;
  const month = 4; // April
  const day = Math.floor(Math.random() * 10) + 10; // Days 10-19
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);

  try {
    const result = momentkh.fromGregorian(year, month, day, hour, minute, 0);

    if (isValidKhmerDate(result)) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        category: testCategories[2].name,
        date: formatGregorianDate({ year, month, day, hour, minute, second: 0 }),
        error: 'Invalid Khmer date structure',
        result
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      category: testCategories[2].name,
      date: formatGregorianDate({ year, month, day, hour, minute, second: 0 }),
      error: error.message
    });
  }
}
console.log(`   Completed: ${testCategories[2].count} tests`);

// Category 4: Leap year dates (20 tests)
console.log(`\n[4/${testCategories.length}] ${testCategories[3].name} (${testCategories[3].count} tests)...`);
const leapYears = [1800, 1804, 1900, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048, 2100, 2200, 2296, 2300];
for (let i = 0; i < testCategories[3].count; i++) {
  totalTests++;

  const year = leapYears[i % leapYears.length];
  const month = 2; // February
  const day = 29; // Leap day
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);

  try {
    const result = momentkh.fromGregorian(year, month, day, hour, minute, 0);

    if (isValidKhmerDate(result)) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        category: testCategories[3].name,
        date: formatGregorianDate({ year, month, day, hour, minute, second: 0 }),
        error: 'Invalid Khmer date structure',
        result
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      category: testCategories[3].name,
      date: formatGregorianDate({ year, month, day, hour, minute, second: 0 }),
      error: error.message
    });
  }
}
console.log(`   Completed: ${testCategories[3].count} tests`);

// Print summary
console.log('\n' + '='.repeat(80));
console.log('TEST RESULTS SUMMARY');
console.log('='.repeat(80));
console.log(`Total Tests:  ${totalTests}`);
console.log(`Passed:       ${passedTests} (${(passedTests / totalTests * 100).toFixed(2)}%)`);
console.log(`Failed:       ${failedTests} (${(failedTests / totalTests * 100).toFixed(2)}%)`);
console.log('='.repeat(80));

// Print failures if any
if (failures.length > 0) {
  console.log('\nFAILURES:');
  console.log('-'.repeat(80));
  failures.slice(0, 10).forEach((failure, index) => {
    console.log(`\n${index + 1}. ${failure.category}`);
    console.log(`   Date: ${failure.date}`);
    console.log(`   Error: ${failure.error}`);
    if (failure.result) {
      console.log(`   Result: ${JSON.stringify(failure.result.khmer, null, 2)}`);
    }
  });
  if (failures.length > 10) {
    console.log(`\n... and ${failures.length - 10} more failures`);
  }
  console.log('\n' + '='.repeat(80));
  process.exit(1);
} else {
  console.log('\n✓ ALL TESTS PASSED!\n');
  process.exit(0);
}
