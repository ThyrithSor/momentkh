/**
 * Test BE year transition at midnight between 15កើត and 1រោច Pisakh
 */

const moment = require('moment');
require('./momentkh')(moment);
const momentkh2 = require('./momentkh2');

const problematicDates = [
    { year: 2252, month: 5, day: 23, hour: 7, minute: 37 },
    { year: 2024, month: 5, day: 22, hour: 3, minute: 47 },
    { year: 2138, month: 5, day: 23, hour: 14, minute: 23 },
    { year: 2064, month: 4, day: 30, hour: 22, minute: 41 }
];

console.log('Testing BE year transition problematic dates:\n');

problematicDates.forEach((date, index) => {
    const { year, month, day, hour, minute } = date;
    const gregorianDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    console.log(`Test ${index + 1}: ${gregorianDate}`);

    // Test with momentkh (original)
    const m = moment(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`, 'YYYY-MM-DD HH:mm');
    const original = {
        formatted: m.toKhDate(),
        day: m.khDay(),
        month: m.khMonth(),
        year: m.khYear()
    };

    // Test with momentkh2
    const khmer2 = momentkh2.fromGregorian(year, month, day, hour, minute);
    const new2 = {
        formatted: momentkh2.format(khmer2),
        day: khmer2._khmerDateObj.getDayNumber(),
        month: khmer2.khmer.monthIndex,
        year: khmer2.khmer.beYear
    };

    console.log('  momentkh:  ', original.formatted);
    console.log('  momentkh2: ', new2.formatted);

    const isMatch = (
        original.day === new2.day &&
        original.month === new2.month &&
        original.year === new2.year
    );

    console.log(`  Match: ${isMatch ? '✓' : '✗'}`);

    if (!isMatch) {
        console.log(`  Difference: day=${original.day} vs ${new2.day}, month=${original.month} vs ${new2.month}, year=${original.year} vs ${new2.year}`);
    }

    // Check surrounding dates
    console.log(`  Checking surrounding dates:`);
    for (let d = day - 1; d <= day + 1; d++) {
        if (d >= 1 && d <= 31) {
            const check = momentkh2.fromGregorian(year, month, d, 12, 0);
            console.log(`    ${d}: ${check.khmer.day}${check.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${check.khmer.monthName} BE ${check.khmer.beYear}`);
        }
    }

    console.log('');
});
