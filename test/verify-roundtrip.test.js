/**
 * Test Suite: Verify Khmer to Gregorian Round-Trip
 * Validates that converting Khmer dates back to Gregorian produces the original date
 */

const momentkh = require('../momentkh');
const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('TEST SUITE: VERIFY KHMER TO GREGORIAN ROUND-TRIP');
console.log('='.repeat(80));
console.log();

// Load conversion data
const dataPath = path.join(__dirname, 'conversion.json');
const conversionData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

// Test each conversion (round-trip)
for (const [gregorianStr, khmerFormatted] of Object.entries(conversionData)) {
  totalTests++;
  
  // Parse original gregorian datetime
  const [datePart, timePart] = gregorianStr.split(' ');
  const [origYear, origMonth, origDay] = datePart.split('-').map(Number);
  const [origHour, origMinute, origSecond] = timePart.split(':').map(Number);
  
  try {
    // Convert to Khmer first
    const khmerResult = momentkh.fromGregorian(origYear, origMonth, origDay, origHour, origMinute, origSecond);
    
    // Extract Khmer date components
    const khmerDay = khmerResult.khmer.day;
    const khmerMoonPhase = khmerResult.khmer.moonPhase;
    const khmerMonthIndex = khmerResult.khmer.monthIndex;
    const khmerBeYear = khmerResult.khmer.beYear;
    
    // Convert back to Gregorian
    const gregorianResult = momentkh.fromKhmer(khmerDay, khmerMoonPhase, khmerMonthIndex, khmerBeYear);
    
    // Compare dates (ignore time for round-trip since fromKhmer doesn't preserve time)
    if (
      gregorianResult.year === origYear &&
      gregorianResult.month === origMonth &&
      gregorianResult.day === origDay
    ) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        original: `${origYear}-${String(origMonth).padStart(2, '0')}-${String(origDay).padStart(2, '0')}`,
        khmer: `${khmerDay}${khmerMoonPhase === 0 ? 'កើត' : 'រោច'} month ${khmerMonthIndex} BE ${khmerBeYear}`,
        roundTrip: `${gregorianResult.year}-${String(gregorianResult.month).padStart(2, '0')}-${String(gregorianResult.day).padStart(2, '0')}`
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      original: gregorianStr,
      error: error.message
    });
  }
  
  // Progress indicator
  if (totalTests % 500 === 0) {
    console.log(`Tested ${totalTests}/${Object.keys(conversionData).length} round-trips...`);
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
    console.log(`\n${index + 1}. Original: ${failure.original}`);
    if (failure.khmer) {
      console.log(`   Khmer:     ${failure.khmer}`);
      console.log(`   Round-trip: ${failure.roundTrip}`);
    }
    if (failure.error) {
      console.log(`   Error:     ${failure.error}`);
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
