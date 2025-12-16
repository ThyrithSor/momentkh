/**
 * Debug Visakha Bochea date conversion issue
 */

const momentkh2 = require('./momentkh2');

// Test the first problematic case
console.log('Analyzing: 1888-04-25 18:19\n');

// Convert to Khmer
const khmer1 = momentkh2.fromGregorian(1888, 4, 25, 18, 19);
console.log('1888-04-25 18:19 →', momentkh2.format(khmer1));
console.log('  BE Year:', khmer1.khmer.beYear);
console.log('  Day:', khmer1.khmer.day, khmer1.khmer.moonPhase === 0 ? 'កើត' : 'រោច');
console.log('  Month:', khmer1.khmer.monthName);
console.log('');

// Now check what date gives us the reversed result
const khmer2 = momentkh2.fromGregorian(1889, 5, 14, 0, 0);
console.log('1889-05-14 00:00 →', momentkh2.format(khmer2));
console.log('  BE Year:', khmer2.khmer.beYear);
console.log('  Day:', khmer2.khmer.day, khmer2.khmer.moonPhase === 0 ? 'កើត' : 'រោច');
console.log('  Month:', khmer2.khmer.monthName);
console.log('');

// Check dates around 1888-04-25 to see when BE year changes
console.log('Checking dates around 1888-04-25:');
for (let day = 24; day <= 26; day++) {
    const result = momentkh2.fromGregorian(1888, 4, day, 12, 0);
    console.log(`  1888-04-${day} 12:00 → BE ${result.khmer.beYear}, ${result.khmer.day}${result.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${result.khmer.monthName}`);
}
console.log('');

// Check if there are multiple Gregorian dates that give the same Khmer date
console.log('Searching for all Gregorian dates that give: 15កើត Pisakh BE 2432');
let found = [];
for (let year = 1886; year <= 1891; year++) {
    for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const result = momentkh2.fromGregorian(year, month, day, 0, 0);
            if (result.khmer.beYear === 2432 &&
                result.khmer.monthIndex === 5 &&
                result.khmer.day === 15 &&
                result.khmer.moonPhase === 0) {
                found.push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
            }
        }
    }
}
console.log('  Found:', found.length, 'dates');
found.forEach(date => console.log('    -', date));
