/**
 * Debug BE year transitions around the problematic dates
 */

const momentkh2 = require('./momentkh2');

console.log('=== Checking BE year transitions around 2060-2061 ===\n');

// Check dates in May 2060
console.log('May 2060:');
for (let day = 12; day <= 16; day++) {
    const result = momentkh2.fromGregorian(2060, 5, day, 12, 0);
    console.log(`  2060-05-${day} 12:00 → ${result.khmer.day}${result.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${result.khmer.monthName} BE ${result.khmer.beYear}`);
}

console.log('\nMay 2061:');
for (let day = 1; day <= 5; day++) {
    const result = momentkh2.fromGregorian(2061, 5, day, 12, 0);
    console.log(`  2061-05-${day} 12:00 → ${result.khmer.day}${result.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${result.khmer.monthName} BE ${result.khmer.beYear}`);
}

console.log('\n=== Understanding the issue ===\n');

// The key question: what makes these two dates different?
const date1 = momentkh2.fromGregorian(2060, 5, 14, 12, 0);
const date2 = momentkh2.fromGregorian(2061, 5, 3, 12, 0);

console.log('2060-05-14 12:00:');
console.log(`  Khmer: ${date1.khmer.day}${date1.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${date1.khmer.monthName} BE ${date1.khmer.beYear}`);
console.log(`  Animal Year: ${date1.khmer.animalYear}`);
console.log(`  Era Year: ${date1.khmer.eraYear}`);

console.log('\n2061-05-03 12:00:');
console.log(`  Khmer: ${date2.khmer.day}${date2.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${date2.khmer.monthName} BE ${date2.khmer.beYear}`);
console.log(`  Animal Year: ${date2.khmer.animalYear}`);
console.log(`  Era Year: ${date2.khmer.eraYear}`);

console.log('\n=== Question: Are these the SAME Visakha Bochea or DIFFERENT? ===');
console.log('If they have the same BE year, day, moonPhase, and month, but different');
console.log('animal years or era years, they are different occurrences!\n');
