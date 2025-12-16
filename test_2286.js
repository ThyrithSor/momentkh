/**
 * Test specific date: 2286-05-08
 */

const momentkh2 = require('./momentkh2');

console.log('Testing: 2286-05-08\n');

// Test different times on this date
console.log('Checking 2286-05-08 at different times:');
const hours = [0, 6, 12, 18, 23];
hours.forEach(hour => {
    const result = momentkh2.fromGregorian(2286, 5, 8, hour, 0);
    console.log(`  ${String(hour).padStart(2, '0')}:00 → ${result.khmer.day}${result.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${result.khmer.monthName} BE ${result.khmer.beYear}`);
});

console.log('\nChecking surrounding dates at noon:');
for (let day = 6; day <= 10; day++) {
    const result = momentkh2.fromGregorian(2286, 5, day, 12, 0);
    console.log(`  2286-05-${String(day).padStart(2, '0')} 12:00 → ${result.khmer.day}${result.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${result.khmer.monthName} BE ${result.khmer.beYear}`);
}

console.log('\nRound-trip test:');
const original = momentkh2.fromGregorian(2286, 5, 8, 12, 0);
console.log(`Original: 2286-05-08 12:00`);
console.log(`Khmer: ${original.khmer.day}${original.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${original.khmer.monthName} BE ${original.khmer.beYear}`);

const reversed = momentkh2.fromKhmer(
    original.khmer.day,
    original.khmer.moonPhase,
    original.khmer.monthIndex,
    original.khmer.beYear
);

console.log(`Reversed: ${reversed.year}-${String(reversed.month).padStart(2, '0')}-${String(reversed.day).padStart(2, '0')}`);
console.log(`Match: ${reversed.year === 2286 && reversed.month === 5 && reversed.day === 8 ? '✓' : '✗'}`);

if (reversed.year !== 2286 || reversed.month !== 5 || reversed.day !== 8) {
    console.log(`ERROR: Expected 2286-05-08, got ${reversed.year}-${reversed.month}-${reversed.day}`);
}
