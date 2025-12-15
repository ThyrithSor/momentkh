/**
 * Comprehensive comparison test between momentkh (original) and momentkh2 (new)
 * Tests 1000 random dates between 1900 and 2100
 */

const moment = require('moment');
require('./momentkh')(moment);
const momentkh2 = require('./momentkh2');
const fs = require('fs');

// Generate random date between 1900 and 2100
function randomDate() {
    const start = new Date(1900, 0, 1);
    const end = new Date(2100, 11, 31);
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
console.log('COMPREHENSIVE COMPARISON TEST: momentkh vs momentkh2');
console.log('Testing 1000 random dates between 1900-01-01 and 2100-12-31');
console.log('='.repeat(100));

const sampleSize = 1000;
const results = [];
let matchCount = 0;
let mismatchCount = 0;
const mismatches = [];

console.log('\nGenerating and testing dates...\n');

for (let i = 0; i < sampleSize; i++) {
    const { year, month, day, hour, minute } = randomDate();

    // Test with original momentkh
    const m = moment(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`, 'YYYY-MM-DD HH:mm');
    const original = {
        formatted: m.toKhDate(),
        day: m.khDay(),
        month: m.khMonth(),
        year: m.khYear()
    };

    // Test with new momentkh2
    const khmer2 = momentkh2.fromGregorian(year, month, day, hour, minute);
    const new2 = {
        formatted: momentkh2.format(khmer2),
        day: khmer2.khmer.day,
        moonPhase: khmer2.khmer.moonPhase,
        monthIndex: khmer2.khmer.monthIndex,
        beYear: khmer2.khmer.beYear,
        dayNumber: khmer2._khmerDateObj.getDayNumber()
    };

    // Compare
    const isMatch = (
        original.day === new2.dayNumber &&
        original.month === new2.monthIndex &&
        original.year === new2.beYear
    );

    if (isMatch) {
        matchCount++;
    } else {
        mismatchCount++;
        mismatches.push({
            gregorian: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
            original,
            new2
        });
    }

    results.push({
        gregorian: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
        match: isMatch,
        original,
        new2
    });

    // Progress indicator
    if ((i + 1) % 100 === 0) {
        console.log(`Progress: ${i + 1}/${sampleSize} tests completed...`);
    }
}

console.log('\n' + '='.repeat(100));
console.log('TEST RESULTS SUMMARY');
console.log('='.repeat(100));
console.log(`Total Tests: ${sampleSize}`);
console.log(`Matches: ${matchCount} (${(matchCount / sampleSize * 100).toFixed(2)}%)`);
console.log(`Mismatches: ${mismatchCount} (${(mismatchCount / sampleSize * 100).toFixed(2)}%)`);

if (mismatchCount > 0) {
    console.log('\n' + '='.repeat(100));
    console.log('MISMATCHES ANALYSIS');
    console.log('='.repeat(100));

    // Show first 20 mismatches in detail
    console.log(`\nShowing first ${Math.min(20, mismatchCount)} mismatches:\n`);

    for (let i = 0; i < Math.min(20, mismatches.length); i++) {
        const m = mismatches[i];
        console.log(`${i + 1}. Gregorian: ${m.gregorian}`);
        console.log(`   Original: ${m.original.formatted}`);
        console.log(`             day=${m.original.day}, month=${m.original.month}, year=${m.original.year}`);
        console.log(`   New:      ${m.new2.formatted}`);
        console.log(`             dayNumber=${m.new2.dayNumber}, monthIndex=${m.new2.monthIndex}, beYear=${m.new2.beYear}`);
        console.log(`             (day=${m.new2.day}, moonPhase=${m.new2.moonPhase})`);
        console.log('');
    }

    // Analyze patterns in mismatches
    console.log('='.repeat(100));
    console.log('MISMATCH PATTERNS');
    console.log('='.repeat(100));

    const yearMismatches = {};
    const monthMismatches = {};
    const dayMismatches = {};

    mismatches.forEach(m => {
        const yearDiff = m.new2.beYear - m.original.year;
        const monthDiff = m.new2.monthIndex - m.original.month;
        const dayDiff = m.new2.dayNumber - m.original.day;

        yearMismatches[yearDiff] = (yearMismatches[yearDiff] || 0) + 1;
        monthMismatches[monthDiff] = (monthMismatches[monthDiff] || 0) + 1;
        dayMismatches[dayDiff] = (dayMismatches[dayDiff] || 0) + 1;
    });

    console.log('\nYear differences:');
    Object.keys(yearMismatches).sort((a, b) => yearMismatches[b] - yearMismatches[a]).forEach(diff => {
        console.log(`  ${diff > 0 ? '+' : ''}${diff}: ${yearMismatches[diff]} occurrences`);
    });

    console.log('\nMonth differences:');
    Object.keys(monthMismatches).sort((a, b) => monthMismatches[b] - monthMismatches[a]).forEach(diff => {
        console.log(`  ${diff > 0 ? '+' : ''}${diff}: ${monthMismatches[diff]} occurrences`);
    });

    console.log('\nDay differences:');
    Object.keys(dayMismatches).sort((a, b) => dayMismatches[b] - dayMismatches[a]).forEach(diff => {
        console.log(`  ${diff > 0 ? '+' : ''}${diff}: ${dayMismatches[diff]} occurrences`);
    });
}

// Write full results to file
const reportContent = {
    summary: {
        totalTests: sampleSize,
        matches: matchCount,
        mismatches: mismatchCount,
        accuracy: `${(matchCount / sampleSize * 100).toFixed(2)}%`
    },
    allMismatches: mismatches
};

fs.writeFileSync('test_comparison_report.json', JSON.stringify(reportContent, null, 2));
console.log('\n' + '='.repeat(100));
console.log('Full report written to: test_comparison_report.json');
console.log('='.repeat(100) + '\n');

if (matchCount === sampleSize) {
    console.log('✅ SUCCESS! All tests passed. momentkh2 output matches momentkh perfectly!');
} else {
    console.log('❌ FAILED! There are discrepancies that need to be fixed.');
    console.log('\nNext steps:');
    console.log('1. Review the mismatch patterns above');
    console.log('2. Check test_comparison_report.json for full details');
    console.log('3. Fix the issues in momentkh2.js');
    console.log('4. Run this test again');
}

process.exit(mismatchCount > 0 ? 1 : 0);
