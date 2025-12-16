/**
 * Test Suite: Verify New Year Calculations
 * Validates that all years in new-year.json produce the same result
 */

const momentkh = require('../momentkh');
const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('TEST SUITE: VERIFY NEW YEAR CALCULATIONS');
console.log('='.repeat(80));
console.log();

// Load new year data
const dataPath = path.join(__dirname, 'new-year.json');
const newYearData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

// Test each year
for (const [yearStr, expectedIso] of Object.entries(newYearData)) {
  totalTests++;
  const year = parseInt(yearStr, 10);
  
  try {
    // Get New Year
    const newYear = momentkh.getNewYear(year);
    
    // Format as ISO string with +07:00 timezone
    const year4 = newYear.year;
    const month2 = String(newYear.month).padStart(2, '0');
    const day2 = String(newYear.day).padStart(2, '0');
    const hour2 = String(newYear.hour).padStart(2, '0');
    const minute2 = String(newYear.minute).padStart(2, '0');
    const actualIso = `${year4}-${month2}-${day2}T${hour2}:${minute2}:00+07:00`;
    
    // Compare
    if (actualIso === expectedIso) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        year: year,
        expected: expectedIso,
        actual: actualIso
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      year: year,
      expected: expectedIso,
      error: error.message
    });
  }
  
  // Progress indicator
  if (totalTests % 100 === 0) {
    console.log(`Tested ${totalTests}/${Object.keys(newYearData).length} years...`);
  }
}

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
    console.log(`\n${index + 1}. Year ${failure.year}`);
    console.log(`   Expected: ${failure.expected}`);
    if (failure.actual) {
      console.log(`   Actual:   ${failure.actual}`);
    }
    if (failure.error) {
      console.log(`   Error:    ${failure.error}`);
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
