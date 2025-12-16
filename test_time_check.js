/**
 * Check different times on 2060-05-14 to see when BE year changes
 */

const momentkh2 = require('./momentkh2');

console.log('Checking 2060-05-14 at different times:\n');

const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

times.forEach(hour => {
    const result = momentkh2.fromGregorian(2060, 5, 14, hour, 0);
    console.log(`  ${hour}:00 → ${result.khmer.day}${result.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${result.khmer.monthName} BE ${result.khmer.beYear}`);
});

console.log('\nChecking 2061-05-03 at different times:\n');

times.forEach(hour => {
    const result = momentkh2.fromGregorian(2061, 5, 3, hour, 0);
    console.log(`  ${hour}:00 → ${result.khmer.day}${result.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${result.khmer.monthName} BE ${result.khmer.beYear}`);
});
