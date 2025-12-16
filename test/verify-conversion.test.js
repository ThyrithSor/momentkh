/**
 * Test Suite: Verify Gregorian to Khmer Conversion
 * Validates that all dates in conversion.json produce the same Khmer format
 */

const momentkh = require('../momentkh');
const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('TEST SUITE: VERIFY GREGORIAN TO KHMER CONVERSION');
console.log('='.repeat(80));
console.log();

// Load conversion data
const dataPath = path.join(__dirname, 'conversion.json');
const conversionData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

// Test each conversion
for (const [gregorianStr, expectedKhmer] of Object.entries(conversionData)) {
  totalTests++;
  
  // Parse gregorian datetime string (format: YYYY-MM-DD HH:MM:SS)
  const [datePart, timePart] = gregorianStr.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);
  
  try {
    // Convert to Khmer
    const result = momentkh.fromGregorian(year, month, day, hour, minute, second);
    const actualKhmer = momentkh.format(result);
    
    // Compare
    if (actualKhmer === expectedKhmer) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        gregorian: gregorianStr,
        expected: expectedKhmer,
        actual: actualKhmer
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      gregorian: gregorianStr,
      expected: expectedKhmer,
      error: error.message
    });
  }
  
  // Progress indicator
  if (totalTests % 500 === 0) {
    console.log(`Tested ${totalTests}/${Object.keys(conversionData).length} conversions...`);
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
    console.log(`\n${index + 1}. ${failure.gregorian}`);
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
