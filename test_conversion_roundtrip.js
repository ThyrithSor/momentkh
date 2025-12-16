/**
 * Round-trip conversion test for momentkh2
 * Tests 100 random dates: Gregorian → Khmer → Gregorian
 * Verifies that conversion is reversible
 */

const momentkh2 = require('./momentkh2');
const fs = require('fs');

// Generate random date between 1800 and 2300
function randomDate() {
    const start = new Date(1800, 0, 1);
    const end = new Date(2300, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60)
    };
}

console.log('='.repeat(1000));
console.log('ROUND-TRIP CONVERSION TEST: Gregorian → Khmer → Gregorian');
console.log('Testing 100 random dates between 1800-01-01 and 2300-12-31');
console.log('='.repeat(100));

const sampleSize = 1000;
let matchCount = 0;
let mismatchCount = 0;
const outputLines = [];

console.log('\nGenerating and testing dates...\n');

for (let i = 0; i < sampleSize; i++) {
    const { year, month, day, hour, minute } = randomDate();
    const gregorianDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    let isMatch = false;
    let khmerFormatted = '';
    let reversedDate = '';
    let matchStatus = '';

    try {
        // Step 1: Gregorian → Khmer
        const khmerResult = momentkh2.fromGregorian(year, month, day, hour, minute);
        khmerFormatted = momentkh2.format(khmerResult);

        const khmerDay = khmerResult.khmer.day;
        const khmerMoonPhase = khmerResult.khmer.moonPhase;
        const khmerMonthIndex = khmerResult.khmer.monthIndex;
        const khmerBeYear = khmerResult.khmer.beYear;

        // Step 2: Khmer → Gregorian (reverse)
        const reversedResult = momentkh2.fromKhmer(khmerDay, khmerMoonPhase, khmerMonthIndex, khmerBeYear);
        reversedDate = `${reversedResult.year}-${String(reversedResult.month).padStart(2, '0')}-${String(reversedResult.day).padStart(2, '0')}`;

        // Step 3: Compare (only dates, not time since fromKhmer doesn't return time)
        isMatch = (
            reversedResult.year === year &&
            reversedResult.month === month &&
            reversedResult.day === day
        );

        if (isMatch) {
            matchCount++;
            matchStatus = '✓';
        } else {
            mismatchCount++;
            matchStatus = '✗';
        }

    } catch (error) {
        mismatchCount++;
        khmerFormatted = 'ERROR: ' + error.message;
        reversedDate = 'ERROR';
        matchStatus = '✗';
    }

    // Format output
    outputLines.push(`Test ${i + 1}:`);
    outputLines.push(`  Original Gregorian: ${gregorianDate}`);
    outputLines.push(`  Converted to Khmer: ${khmerFormatted}`);
    outputLines.push(`  Reversed to Gregorian: ${reversedDate}`);
    outputLines.push(`  Match: ${matchStatus}`);
    outputLines.push('');

    // Progress indicator
    if ((i + 1) % 20 === 0) {
        console.log(`Progress: ${i + 1}/${sampleSize} tests completed...`);
    }
}

// Add summary at the bottom
outputLines.push('='.repeat(100));
outputLines.push('SUMMARY');
outputLines.push('='.repeat(100));
outputLines.push(`Total Tests: ${sampleSize}`);
outputLines.push(`Matches: ${matchCount} (${(matchCount / sampleSize * 100).toFixed(2)}%)`);
outputLines.push(`Mismatches: ${mismatchCount} (${(mismatchCount / sampleSize * 100).toFixed(2)}%)`);
outputLines.push('='.repeat(100));

if (matchCount === sampleSize) {
    outputLines.push('✓ SUCCESS! All round-trip conversions matched perfectly!');
} else {
    outputLines.push('✗ FAILED! Some conversions did not match.');
    outputLines.push(`   ${mismatchCount} out of ${sampleSize} conversions failed.`);
}

// Write results to file
const fileContent = outputLines.join('\n');
fs.writeFileSync('test_conversion.txt', fileContent, 'utf8');

// Print summary to console
console.log('\n' + '='.repeat(100));
console.log('TEST RESULTS SUMMARY');
console.log('='.repeat(100));
console.log(`Total Tests: ${sampleSize}`);
console.log(`Matches: ${matchCount} (${(matchCount / sampleSize * 100).toFixed(2)}%)`);
console.log(`Mismatches: ${mismatchCount} (${(mismatchCount / sampleSize * 100).toFixed(2)}%)`);
console.log('='.repeat(100));
console.log('\nResults written to: test_conversion.txt');
console.log('='.repeat(100) + '\n');

if (matchCount === sampleSize) {
    console.log('✓ SUCCESS! All round-trip conversions matched perfectly!');
} else {
    console.log('✗ FAILED! Some conversions did not match.');
    console.log(`   ${mismatchCount} out of ${sampleSize} conversions failed.`);
}

console.log('\n');
process.exit(mismatchCount > 0 ? 1 : 0);
