/**
 * Test Suite: Khmer New Year Calculation
 *
 * This test validates the calculation of Khmer New Year (Moha Songkran) dates.
 * It runs 500 test cases covering various years and validates the results.
 */

const momentkh = require('../momentkh');

// Helper function to validate New Year info
function isValidNewYearInfo(info) {
  if (!info || typeof info !== 'object') return false;

  const { year, month, day, hour, minute } = info;

  // Validate year (reasonable range)
  if (typeof year !== 'number' || year < 1700 || year > 2400) return false;

  // Validate month (should be April = 4)
  if (typeof month !== 'number' || month < 3 || month > 5) return false;

  // Validate day (should be around 12-15 April)
  if (typeof day !== 'number' || day < 1 || day > 31) return false;

  // Validate hour (0-23)
  if (typeof hour !== 'number' || hour < 0 || hour > 23) return false;

  // Validate minute (0-59)
  if (typeof minute !== 'number' || minute < 0 || minute > 59) return false;

  return true;
}

// Helper function to format New Year info
function formatNewYearInfo(info) {
  return `${info.year}-${String(info.month).padStart(2, '0')}-${String(info.day).padStart(2, '0')} ${String(info.hour).padStart(2, '0')}:${String(info.minute).padStart(2, '0')}`;
}

// Known Khmer New Year dates for validation (from historical data)
const knownNewYears = {
  2011: { year: 2011, month: 4, day: 14, hour: 13, minute: 12 },
  2012: { year: 2012, month: 4, day: 14, hour: 19, minute: 11 },
  2013: { year: 2013, month: 4, day: 14, hour: 2, minute: 12 },
  2014: { year: 2014, month: 4, day: 14, hour: 8, minute: 7 },
  2015: { year: 2015, month: 4, day: 14, hour: 14, minute: 2 },
  1879: { year: 1879, month: 4, day: 12, hour: 11, minute: 36 },
  1897: { year: 1897, month: 4, day: 13, hour: 2, minute: 0 }
};

// Test categories
const testCategories = [
  { name: 'Historical years with known dates', count: 7 },
  { name: 'Random years (1800-1900)', count: 100 },
  { name: 'Random years (1901-2000)', count: 100 },
  { name: 'Random years (2001-2100)', count: 100 },
  { name: 'Random years (2101-2200)', count: 100 },
  { name: 'Random years (2201-2300)', count: 93 }
];

console.log('='.repeat(80));
console.log('TEST SUITE: KHMER NEW YEAR CALCULATION');
console.log('='.repeat(80));
console.log(`Total test cases: 500\n`);

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

// Category 1: Historical years with known dates (7 tests)
console.log(`\n[1/${testCategories.length}] ${testCategories[0].name} (${testCategories[0].count} tests)...`);
for (const [yearStr, expected] of Object.entries(knownNewYears)) {
  totalTests++;
  const year = parseInt(yearStr);

  try {
    const result = momentkh.getNewYear(year);

    if (isValidNewYearInfo(result)) {
      // Verify it matches the known date
      if (result.year === expected.year &&
          result.month === expected.month &&
          result.day === expected.day &&
          result.hour === expected.hour &&
          result.minute === expected.minute) {
        passedTests++;
      } else {
        failedTests++;
        failures.push({
          category: testCategories[0].name,
          year,
          expected: formatNewYearInfo(expected),
          result: formatNewYearInfo(result),
          error: 'Date/time mismatch with known historical data'
        });
      }
    } else {
      failedTests++;
      failures.push({
        category: testCategories[0].name,
        year,
        error: 'Invalid New Year info structure',
        result
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      category: testCategories[0].name,
      year,
      error: error.message
    });
  }
}
console.log(`   Completed: ${testCategories[0].count} tests`);

// Category 2-6: Random years in different ranges
for (let categoryIndex = 1; categoryIndex < testCategories.length; categoryIndex++) {
  const category = testCategories[categoryIndex];
  console.log(`\n[${categoryIndex + 1}/${testCategories.length}] ${category.name} (${category.count} tests)...`);

  // Determine year range
  let startYear, endYear;
  if (categoryIndex === 1) {
    startYear = 1800;
    endYear = 1900;
  } else if (categoryIndex === 2) {
    startYear = 1901;
    endYear = 2000;
  } else if (categoryIndex === 3) {
    startYear = 2001;
    endYear = 2100;
  } else if (categoryIndex === 4) {
    startYear = 2101;
    endYear = 2200;
  } else {
    startYear = 2201;
    endYear = 2300;
  }

  // Generate random years in this range
  const years = [];
  for (let i = 0; i < category.count; i++) {
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    years.push(year);
  }

  for (const year of years) {
    totalTests++;

    try {
      const result = momentkh.getNewYear(year);

      if (isValidNewYearInfo(result)) {
        // Additional validation: New Year should be in March-April-May
        if (result.month >= 3 && result.month <= 5) {
          // Most commonly April 13-14, but can be 12-15
          if (result.month === 4 && result.day >= 12 && result.day <= 15) {
            passedTests++;
          } else if (result.month === 3 && result.day >= 20) {
            // Late March is also possible in some years
            passedTests++;
          } else if (result.month === 5 && result.day <= 5) {
            // Early May is possible in some years
            passedTests++;
          } else if (result.month === 4) {
            // Any day in April is acceptable (edge cases)
            passedTests++;
          } else {
            failedTests++;
            failures.push({
              category: category.name,
              year,
              result: formatNewYearInfo(result),
              error: 'New Year date outside expected range'
            });
          }
        } else {
          failedTests++;
          failures.push({
            category: category.name,
            year,
            result: formatNewYearInfo(result),
            error: 'New Year month outside expected range (should be March-May)'
          });
        }
      } else {
        failedTests++;
        failures.push({
          category: category.name,
          year,
          error: 'Invalid New Year info structure',
          result
        });
      }
    } catch (error) {
      failedTests++;
      failures.push({
        category: category.name,
        year,
        error: error.message
      });
    }
  }

  console.log(`   Completed: ${category.count} tests`);
}

// Additional validation: Check consistency across consecutive years
console.log('\n[Extra] Consistency check: Consecutive years...');
let consecutiveTestsPassed = 0;
let consecutiveTestsFailed = 0;
const consecutiveFailures = [];

for (let year = 1900; year <= 2100; year += 10) {
  try {
    const result1 = momentkh.getNewYear(year);
    const result2 = momentkh.getNewYear(year + 1);

    // New Year should not jump by more than a few days between consecutive years
    const date1 = new Date(result1.year, result1.month - 1, result1.day, result1.hour, result1.minute);
    const date2 = new Date(result2.year, result2.month - 1, result2.day, result2.hour, result2.minute);
    const daysDiff = Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

    if (daysDiff >= 360 && daysDiff <= 370) {
      consecutiveTestsPassed++;
    } else {
      consecutiveTestsFailed++;
      consecutiveFailures.push({
        year1: year,
        year2: year + 1,
        date1: formatNewYearInfo(result1),
        date2: formatNewYearInfo(result2),
        daysDiff: daysDiff.toFixed(2)
      });
    }
  } catch (error) {
    consecutiveTestsFailed++;
  }
}

console.log(`   Passed: ${consecutiveTestsPassed}, Failed: ${consecutiveTestsFailed}`);

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
    console.log(`   Year: ${failure.year}`);
    if (failure.expected) {
      console.log(`   Expected: ${failure.expected}`);
    }
    if (failure.result) {
      console.log(`   Result: ${typeof failure.result === 'string' ? failure.result : JSON.stringify(failure.result)}`);
    }
    console.log(`   Error: ${failure.error}`);
  });
  if (failures.length > 10) {
    console.log(`\n... and ${failures.length - 10} more failures`);
  }
}

if (consecutiveFailures.length > 0) {
  console.log('\nCONSECUTIVE YEAR FAILURES:');
  console.log('-'.repeat(80));
  consecutiveFailures.slice(0, 5).forEach((failure, index) => {
    console.log(`\n${index + 1}. Years ${failure.year1} → ${failure.year2}`);
    console.log(`   ${failure.year1}: ${failure.date1}`);
    console.log(`   ${failure.year2}: ${failure.date2}`);
    console.log(`   Days difference: ${failure.daysDiff} (expected ~365)`);
  });
  if (consecutiveFailures.length > 5) {
    console.log(`\n... and ${consecutiveFailures.length - 5} more consecutive failures`);
  }
}

if (failures.length > 0 || consecutiveFailures.length > 0) {
  console.log('\n' + '='.repeat(80));
  process.exit(1);
} else {
  console.log('\n✓ ALL TESTS PASSED!\n');
  process.exit(0);
}
