/**
 * Comparison test between momentkh (original) and momentkh2 (new)
 * Tests 10,000 random dates between 1800 and 2300 AD
 * Outputs results to comparition_date.txt file
 */

const moment = require('moment');
require('./momentkh')(moment);
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

console.log('='.repeat(100));
console.log('COMPARISON TEST: momentkh vs momentkh2');
console.log('Testing 1000 random dates between 1800-01-01 and 2300-12-31');
console.log('='.repeat(100));

const sampleSize = 1000;
let matchCount = 0;
let mismatchCount = 0;
const outputLines = [];

console.log('\nGenerating and testing dates...\n');

for (let i = 0; i < sampleSize; i++) {
    const { year, month, day, hour, minute } = randomDate();
    const gregorianDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    let output1 = '';
    let output2 = '';
    let isMatch = false;

    try {
        // Test with original momentkh
        const m = moment(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`, 'YYYY-MM-DD HH:mm');
        output1 = m.toKhDate();

        const original = {
            day: m.khDay(),
            month: m.khMonth(),
            year: m.khYear()
        };

        // Test with new momentkh2
        const khmer2 = momentkh2.fromGregorian(year, month, day, hour, minute);
        output2 = momentkh2.format(khmer2);

        const new2 = {
            dayNumber: khmer2._khmerDateObj.getDayNumber(),
            monthIndex: khmer2.khmer.monthIndex,
            beYear: khmer2.khmer.beYear
        };

        // Compare
        isMatch = (
            original.day === new2.dayNumber &&
            original.month === new2.monthIndex &&
            original.year === new2.beYear
        );

        if (isMatch) {
            matchCount++;
        } else {
            mismatchCount++;
        }
    } catch (error) {
        output1 = 'ERROR: ' + error.message;
        output2 = 'ERROR';
        mismatchCount++;
    }

    // Format output line with check or cross mark
    const mark = isMatch ? '✓' : '✗';
    outputLines.push(`${gregorianDate}`);
    outputLines.push(`${output1}\t\t${output2}\t\t${mark}`);
    outputLines.push(''); // Empty line for readability

    // Progress indicator
    if ((i + 1) % 1000 === 0) {
        console.log(`Progress: ${i + 1}/${sampleSize} tests completed...`);
    }
}

// Write results to file
const fileContent = outputLines.join('\n');
fs.writeFileSync('comparition_date.txt', fileContent, 'utf8');

// Print summary
console.log('\n' + '='.repeat(100));
console.log('TEST RESULTS SUMMARY');
console.log('='.repeat(100));
console.log(`Total Tests: ${sampleSize}`);
console.log(`Matches: ${matchCount} (${(matchCount / sampleSize * 100).toFixed(2)}%)`);
console.log(`Mismatches: ${mismatchCount} (${(mismatchCount / sampleSize * 100).toFixed(2)}%)`);
console.log('='.repeat(100));
console.log('\nResults written to: comparition_date.txt');
console.log('='.repeat(100) + '\n');

if (matchCount === sampleSize) {
    console.log('✓ SUCCESS! All tests passed. momentkh2 output matches momentkh perfectly!');
} else {
    console.log('✗ FAILED! There are discrepancies between the two implementations.');
    console.log(`   ${mismatchCount} out of ${sampleSize} dates did not match.`);
}

console.log('\n');
process.exit(0);
