/**
 * Test Suite: Khmer to Gregorian Conversion
 *
 * This test validates the conversion from Khmer calendar dates to Gregorian calendar dates.
 * It runs 500 test cases covering various Khmer dates and validates round-trip conversion.
 */

const momentkh = require('../momentkh');

// Helper function to generate random Khmer date
function randomKhmerDate() {
  const beYear = Math.floor(Math.random() * (2850 - 2350 + 1)) + 2350; // BE years 2350-2850
  // Avoid month index 7 (អាសាឍ) as it doesn't exist in leap month years
  // Use months 0-6, 8-11 (skip 7)
  let monthIndex = Math.floor(Math.random() * 11);
  if (monthIndex >= 7) monthIndex++; // Skip index 7

  const moonPhase = Math.floor(Math.random() * 2); // 0 = កើត, 1 = រោច

  // For កើត (waxing): 1-15 days
  // For រោច (waning): 1-14 days (to be safe, since some months have 29 days = 15កើត + 14រោច)
  const maxDay = moonPhase === 0 ? 15 : 14;
  const day = Math.floor(Math.random() * maxDay) + 1;

  return { day, moonPhase, monthIndex, beYear };
}

// Helper function to validate Gregorian date
function isValidGregorianDate(date) {
  if (!date || typeof date.year !== 'number' || typeof date.month !== 'number' || typeof date.day !== 'number') {
    return false;
  }

  const { year, month, day } = date;

  // Validate year (reasonable range)
  if (year < 1700 || year > 2400) return false;

  // Validate month (1-12)
  if (month < 1 || month > 12) return false;

  // Validate day (1-31)
  if (day < 1 || day > 31) return false;

  // Check days in month
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const maxDay = (month === 2 && isLeapYear) ? 29 : daysInMonth[month - 1];

  if (day > maxDay) return false;

  return true;
}

// Helper function to format Khmer date
function formatKhmerDate(khmerDate) {
  const moonPhaseNames = ['កើត', 'រោច'];
  const monthNames = [
    'មិគសិរ', 'បុស្ស', 'មាឃ', 'ផល្គុន', 'ចេត្រ', 'ពិសាខ',
    'ជេស្ឋ', 'អាសាឍ', 'ស្រាពណ៍', 'ភទ្របទ', 'អស្សុជ', 'កត្ដិក'
  ];
  return `${khmerDate.day}${moonPhaseNames[khmerDate.moonPhase]} ${monthNames[khmerDate.monthIndex]} BE ${khmerDate.beYear}`;
}

// Helper function to format Gregorian date
function formatGregorianDate(date) {
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
}

// Test categories
const testCategories = [
  { name: 'Random Khmer dates', count: 350 },
  { name: 'Round-trip validation', count: 100 },
  { name: 'Edge case - Pisakha Bochea dates', count: 30 },
  { name: 'Edge case - Month transitions', count: 20 }
];

console.log('='.repeat(80));
console.log('TEST SUITE: KHMER TO GREGORIAN CONVERSION');
console.log('='.repeat(80));
console.log(`Total test cases: 500\n`);

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

// Category 1: Random Khmer dates (350 tests)
console.log(`\n[1/${testCategories.length}] ${testCategories[0].name} (${testCategories[0].count} tests)...`);
for (let i = 0; i < testCategories[0].count; i++) {
  totalTests++;
  const khmerDate = randomKhmerDate();

  try {
    const result = momentkh.fromKhmer(khmerDate.day, khmerDate.moonPhase, khmerDate.monthIndex, khmerDate.beYear);

    if (isValidGregorianDate(result)) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        category: testCategories[0].name,
        khmerDate: formatKhmerDate(khmerDate),
        error: 'Invalid Gregorian date structure',
        result
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      category: testCategories[0].name,
      khmerDate: formatKhmerDate(khmerDate),
      error: error.message
    });
  }
}
console.log(`   Completed: ${testCategories[0].count} tests`);

// Category 2: Round-trip validation (100 tests)
// Convert Gregorian → Khmer → Gregorian and verify they match
console.log(`\n[2/${testCategories.length}] ${testCategories[1].name} (${testCategories[1].count} tests)...`);
for (let i = 0; i < testCategories[1].count; i++) {
  totalTests++;

  // Generate random Gregorian date
  const year = Math.floor(Math.random() * (2200 - 1900 + 1)) + 1900;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);

  try {
    // Step 1: Gregorian → Khmer
    const khmerResult = momentkh.fromGregorian(year, month, day, hour, minute, 0);

    // Step 2: Khmer → Gregorian
    const gregorianResult = momentkh.fromKhmer(
      khmerResult.khmer.day,
      khmerResult.khmer.moonPhase,
      khmerResult.khmer.monthIndex,
      khmerResult.khmer.beYear
    );

    // Step 3: Verify dates match
    if (gregorianResult.year === year && gregorianResult.month === month && gregorianResult.day === day) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        category: testCategories[1].name,
        original: formatGregorianDate({ year, month, day }),
        khmerDate: formatKhmerDate({
          day: khmerResult.khmer.day,
          moonPhase: khmerResult.khmer.moonPhase,
          monthIndex: khmerResult.khmer.monthIndex,
          beYear: khmerResult.khmer.beYear
        }),
        result: formatGregorianDate(gregorianResult),
        error: 'Round-trip conversion mismatch'
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      category: testCategories[1].name,
      original: formatGregorianDate({ year, month, day }),
      error: error.message
    });
  }
}
console.log(`   Completed: ${testCategories[1].count} tests`);

// Category 3: Edge case - Pisakha Bochea dates (30 tests)
// Test 15កើត ពិសាខ (Pisakha Bochea) for various BE years
console.log(`\n[3/${testCategories.length}] ${testCategories[2].name} (${testCategories[2].count} tests)...`);
for (let i = 0; i < testCategories[2].count; i++) {
  totalTests++;

  const beYear = Math.floor(Math.random() * (2850 - 2400 + 1)) + 2400;
  const day = 15;
  const moonPhase = 0; // កើត
  const monthIndex = 5; // ពិសាខ

  try {
    const result = momentkh.fromKhmer(day, moonPhase, monthIndex, beYear);

    if (isValidGregorianDate(result)) {
      // Verify it converts back correctly
      const verifyKhmer = momentkh.fromGregorian(result.year, result.month, result.day, 12, 0, 0);

      if (verifyKhmer.khmer.beYear === beYear &&
          verifyKhmer.khmer.monthIndex === monthIndex &&
          verifyKhmer.khmer.day === day &&
          verifyKhmer.khmer.moonPhase === moonPhase) {
        passedTests++;
      } else {
        failedTests++;
        failures.push({
          category: testCategories[2].name,
          khmerDate: formatKhmerDate({ day, moonPhase, monthIndex, beYear }),
          error: 'Pisakha Bochea round-trip mismatch',
          result: formatGregorianDate(result),
          verifyKhmer: verifyKhmer.khmer
        });
      }
    } else {
      failedTests++;
      failures.push({
        category: testCategories[2].name,
        khmerDate: formatKhmerDate({ day, moonPhase, monthIndex, beYear }),
        error: 'Invalid Gregorian date structure',
        result
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      category: testCategories[2].name,
      khmerDate: formatKhmerDate({ day, moonPhase, monthIndex, beYear }),
      error: error.message
    });
  }
}
console.log(`   Completed: ${testCategories[2].count} tests`);

// Category 4: Edge case - Month transitions (20 tests)
// Test last day of waxing and first/last day of waning
console.log(`\n[4/${testCategories.length}] ${testCategories[3].name} (${testCategories[3].count} tests)...`);
for (let i = 0; i < testCategories[3].count; i++) {
  totalTests++;

  const beYear = Math.floor(Math.random() * (2800 - 2400 + 1)) + 2400;
  // Avoid month index 7 (អាសាឍ) as it doesn't exist in leap month years
  let monthIndex = Math.floor(Math.random() * 11);
  if (monthIndex >= 7) monthIndex++; // Skip index 7

  const moonPhase = i % 2; // Alternate between កើត and រោច
  // For កើត: use day 15 (last day), for រោច: use day 1 or 14 (first/last day)
  const day = moonPhase === 0 ? 15 : (i % 4 < 2 ? 1 : 14);

  try {
    const result = momentkh.fromKhmer(day, moonPhase, monthIndex, beYear);

    if (isValidGregorianDate(result)) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        category: testCategories[3].name,
        khmerDate: formatKhmerDate({ day, moonPhase, monthIndex, beYear }),
        error: 'Invalid Gregorian date structure',
        result
      });
    }
  } catch (error) {
    failedTests++;
    failures.push({
      category: testCategories[3].name,
      khmerDate: formatKhmerDate({ day, moonPhase, monthIndex, beYear }),
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
    if (failure.khmerDate) {
      console.log(`   Khmer Date: ${failure.khmerDate}`);
    }
    if (failure.original) {
      console.log(`   Original: ${failure.original}`);
    }
    console.log(`   Error: ${failure.error}`);
    if (failure.result) {
      console.log(`   Result: ${typeof failure.result === 'string' ? failure.result : JSON.stringify(failure.result)}`);
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
