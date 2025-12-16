/**
 * Test Suite: Input Validation
 *
 * This test validates that the library properly rejects invalid inputs
 * for both Gregorian and Khmer date conversions.
 */

const momentkh = require('../momentkh');

console.log('='.repeat(80));
console.log('TEST SUITE: INPUT VALIDATION');
console.log('='.repeat(80));
console.log();

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

/**
 * Helper function to test if a function throws an error
 */
function expectError(testName, testFn, expectedErrorFragment) {
  totalTests++;
  try {
    testFn();
    // If we get here, the function didn't throw
    failedTests++;
    failures.push({
      test: testName,
      error: 'Expected error but none was thrown',
      expectedFragment: expectedErrorFragment
    });
  } catch (error) {
    // Check if error message contains expected fragment
    if (error.message.includes(expectedErrorFragment)) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({
        test: testName,
        error: `Error message doesn't match expected fragment`,
        expectedFragment: expectedErrorFragment,
        actualMessage: error.message
      });
    }
  }
}

// ============================================================================
// Gregorian Date Validation Tests
// ============================================================================

console.log('GREGORIAN DATE VALIDATION');
console.log('-'.repeat(80));

// Invalid month tests
expectError(
  'Invalid month: 0',
  () => momentkh.fromGregorian(2024, 0, 15),
  'Invalid month: 0'
);

expectError(
  'Invalid month: 13',
  () => momentkh.fromGregorian(2024, 13, 15),
  'Invalid month: 13'
);

expectError(
  'Invalid month: -1',
  () => momentkh.fromGregorian(2024, -1, 15),
  'Invalid month: -1'
);

// Invalid day tests
expectError(
  'Invalid day: February 30',
  () => momentkh.fromGregorian(2023, 2, 30),
  'February 2023 has 28 days'
);

expectError(
  'Invalid day: February 29 (non-leap year)',
  () => momentkh.fromGregorian(2023, 2, 29),
  'February 2023 has 28 days'
);

expectError(
  'Invalid day: April 31',
  () => momentkh.fromGregorian(2024, 4, 31),
  'April 2024 has 30 days'
);

expectError(
  'Invalid day: 0',
  () => momentkh.fromGregorian(2024, 1, 0),
  'Invalid day: 0'
);

expectError(
  'Invalid day: 32',
  () => momentkh.fromGregorian(2024, 1, 32),
  'January 2024 has 31 days'
);

// Invalid hour tests
expectError(
  'Invalid hour: 24',
  () => momentkh.fromGregorian(2024, 1, 15, 24),
  'Invalid hour: 24'
);

expectError(
  'Invalid hour: 25',
  () => momentkh.fromGregorian(2024, 1, 15, 25),
  'Invalid hour: 25'
);

expectError(
  'Invalid hour: -1',
  () => momentkh.fromGregorian(2024, 1, 15, -1),
  'Invalid hour: -1'
);

// Invalid minute tests
expectError(
  'Invalid minute: 60',
  () => momentkh.fromGregorian(2024, 1, 15, 12, 60),
  'Invalid minute: 60'
);

expectError(
  'Invalid minute: -1',
  () => momentkh.fromGregorian(2024, 1, 15, 12, -1),
  'Invalid minute: -1'
);

// Invalid second tests
expectError(
  'Invalid second: 60',
  () => momentkh.fromGregorian(2024, 1, 15, 12, 30, 60),
  'Invalid second: 60'
);

expectError(
  'Invalid second: -1',
  () => momentkh.fromGregorian(2024, 1, 15, 12, 30, -1),
  'Invalid second: -1'
);

console.log(`Gregorian validation tests: ${passedTests}/${totalTests} passed\n`);

// ============================================================================
// Date Object Validation Tests
// ============================================================================

console.log('DATE OBJECT VALIDATION');
console.log('-'.repeat(80));

expectError(
  'Invalid Date object',
  () => momentkh.fromDate(new Date('invalid')),
  'Invalid Date object'
);

expectError(
  'Not a Date object (null)',
  () => momentkh.fromDate(null),
  'Expected a Date object'
);

expectError(
  'Not a Date object (string)',
  () => momentkh.fromDate('2024-01-15'),
  'Expected a Date object'
);

console.log(`Date object validation tests: ${passedTests}/${totalTests} passed\n`);

// ============================================================================
// Khmer Date Validation Tests
// ============================================================================

console.log('KHMER DATE VALIDATION');
console.log('-'.repeat(80));

// Invalid day tests
expectError(
  'Invalid day: 0',
  () => momentkh.fromKhmer(0, 0, 5, 2568),
  'Invalid day: 0'
);

expectError(
  'Invalid day: 16',
  () => momentkh.fromKhmer(16, 0, 5, 2568),
  'Invalid day: 16'
);

expectError(
  'Invalid day: -1',
  () => momentkh.fromKhmer(-1, 0, 5, 2568),
  'Invalid day: -1'
);

// Invalid moonPhase tests
expectError(
  'Invalid moonPhase: 2',
  () => momentkh.fromKhmer(15, 2, 5, 2568),
  'Invalid moonPhase: 2'
);

expectError(
  'Invalid moonPhase: -1',
  () => momentkh.fromKhmer(15, -1, 5, 2568),
  'Invalid moonPhase: -1'
);

expectError(
  'Invalid moonPhase: 3',
  () => momentkh.fromKhmer(15, 3, 5, 2568),
  'Invalid moonPhase: 3'
);

// Invalid monthIndex tests
expectError(
  'Invalid monthIndex: -1',
  () => momentkh.fromKhmer(15, 0, -1, 2568),
  'Invalid monthIndex: -1'
);

expectError(
  'Invalid monthIndex: 14',
  () => momentkh.fromKhmer(15, 0, 14, 2568),
  'Invalid monthIndex: 14'
);

// Invalid beYear tests
expectError(
  'Invalid beYear: 1999',
  () => momentkh.fromKhmer(15, 0, 5, 1999),
  'Invalid beYear: 1999'
);

expectError(
  'Invalid beYear: 3001',
  () => momentkh.fromKhmer(15, 0, 5, 3001),
  'Invalid beYear: 3001'
);

console.log(`Khmer validation tests: ${passedTests}/${totalTests} passed\n`);

// ============================================================================
// Valid Input Tests (should NOT throw errors)
// ============================================================================

console.log('VALID INPUT TESTS (should not throw)');
console.log('-'.repeat(80));

// Test some valid inputs to ensure validation doesn't break normal usage
const validTests = [
  { name: 'Valid Gregorian date', fn: () => momentkh.fromGregorian(2024, 2, 29) }, // Leap year
  { name: 'Valid Gregorian date with time', fn: () => momentkh.fromGregorian(2024, 12, 16, 23, 59, 59) },
  { name: 'Valid Date object', fn: () => momentkh.fromDate(new Date()) },
  { name: 'Valid Khmer date', fn: () => momentkh.fromKhmer(15, 0, 5, 2568) },
  { name: 'Valid Khmer date (waning)', fn: () => momentkh.fromKhmer(14, 1, 11, 2568) },
  { name: 'Valid toDate', fn: () => momentkh.toDate(15, 0, 5, 2568) }
];

for (const test of validTests) {
  totalTests++;
  try {
    test.fn();
    passedTests++;
  } catch (error) {
    failedTests++;
    failures.push({
      test: test.name,
      error: `Valid input threw error: ${error.message}`
    });
  }
}

console.log(`Valid input tests: ${passedTests - (totalTests - validTests.length)}/${validTests.length} passed\n`);

// ============================================================================
// Results Summary
// ============================================================================

console.log('='.repeat(80));
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
  failures.forEach((failure, index) => {
    console.log(`\n${index + 1}. ${failure.test}`);
    console.log(`   Error: ${failure.error}`);
    if (failure.expectedFragment) {
      console.log(`   Expected fragment: "${failure.expectedFragment}"`);
    }
    if (failure.actualMessage) {
      console.log(`   Actual message: "${failure.actualMessage}"`);
    }
  });
  console.log('\n' + '='.repeat(80));
  process.exit(1);
} else {
  console.log('\n✓ ALL TESTS PASSED!\n');
  process.exit(0);
}
