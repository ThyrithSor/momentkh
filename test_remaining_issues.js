/**
 * Test remaining 2 problematic dates
 */

const momentkh2 = require('./momentkh2');

const problematicDates = [
    { year: 2097, month: 4, day: 25, hour: 22, minute: 11 },
    { year: 2116, month: 4, day: 26, hour: 17, minute: 51 }
];

console.log('Testing remaining problematic dates:\n');

problematicDates.forEach((date, index) => {
    const { year, month, day, hour, minute } = date;
    const gregorianDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    console.log(`Test ${index + 1}: ${gregorianDate}`);

    try {
        // Step 1: Gregorian → Khmer
        const khmerResult = momentkh2.fromGregorian(year, month, day, hour, minute);
        const khmerFormatted = momentkh2.format(khmerResult);

        const khmerDay = khmerResult.khmer.day;
        const khmerMoonPhase = khmerResult.khmer.moonPhase;
        const khmerMonthIndex = khmerResult.khmer.monthIndex;
        const khmerBeYear = khmerResult.khmer.beYear;

        console.log(`  Khmer: ${khmerFormatted}`);
        console.log(`  Details: day=${khmerDay}, moonPhase=${khmerMoonPhase}, month=${khmerMonthIndex}, beYear=${khmerBeYear}`);

        // Step 2: Khmer → Gregorian (reverse)
        const reversedResult = momentkh2.fromKhmer(khmerDay, khmerMoonPhase, khmerMonthIndex, khmerBeYear);
        const reversedDate = `${reversedResult.year}-${String(reversedResult.month).padStart(2, '0')}-${String(reversedResult.day).padStart(2, '0')}`;

        console.log(`  Reversed: ${reversedDate}`);

        // Step 3: Compare
        const isMatch = (
            reversedResult.year === year &&
            reversedResult.month === month &&
            reversedResult.day === day
        );

        console.log(`  Match: ${isMatch ? '✓' : '✗'}`);

        if (!isMatch) {
            console.log(`  ERROR: Expected ${year}-${month}-${day}, got ${reversedResult.year}-${reversedResult.month}-${reversedResult.day}`);
        }

        // Check surrounding dates
        console.log(`  Checking ${year}-${month} around day ${day}:`);
        for (let d = day - 1; d <= day + 1; d++) {
            if (d >= 1 && d <= 31) {
                const check = momentkh2.fromGregorian(year, month, d, 12, 0);
                console.log(`    ${d}: ${check.khmer.day}${check.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${check.khmer.monthName} BE ${check.khmer.beYear}`);
            }
        }

    } catch (error) {
        console.log(`  ERROR: ${error.message}`);
    }

    console.log('');
});
