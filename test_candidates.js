/**
 * Debug which candidates are found for problematic dates
 */

const momentkh2 = require('./momentkh2');

// Test case: 2061-05-03 09:52 → 15កើត Pisakh BE 2604
console.log('Searching for all dates that give: 15កើត Pisakh BE 2604\n');

const targetDay = 15;
const targetMoonPhase = 0;
const targetMonth = 5;
const targetBeYear = 2604;

const approxYear = targetBeYear - 544;
console.log(`Approximate Gregorian year: ${approxYear}\n`);

let candidates = [];

for (let year = approxYear - 2; year <= approxYear + 2; year++) {
    for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            // Check multiple times for Visakha Bochea
            const timesToCheck = [0, 6, 12, 18, 23];

            for (const hour of timesToCheck) {
                const result = momentkh2.fromGregorian(year, month, day, hour, 0);

                if (result.khmer.beYear === targetBeYear &&
                    result.khmer.monthIndex === targetMonth &&
                    result.khmer.day === targetDay &&
                    result.khmer.moonPhase === targetMoonPhase) {
                    const existing = candidates.find(c => c.year === year && c.month === month && c.day === day);
                    if (!existing) {
                        const distance = Math.abs(year - approxYear);
                        candidates.push({ year, month, day, distance });
                        console.log(`Found: ${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} (distance from approx year: ${distance})`);
                    }
                    break;
                }
            }
        }
    }
}

console.log(`\nTotal candidates found: ${candidates.length}`);

if (candidates.length > 1) {
    candidates.sort((a, b) => Math.abs(a.year - approxYear) - Math.abs(b.year - approxYear));
    console.log('\nAfter sorting by distance:');
    candidates.forEach((c, i) => {
        console.log(`  ${i + 1}. ${c.year}-${String(c.month).padStart(2, '0')}-${String(c.day).padStart(2, '0')} (distance: ${c.distance})`);
    });
    console.log(`\nSelected (closest): ${candidates[0].year}-${String(candidates[0].month).padStart(2, '0')}-${String(candidates[0].day).padStart(2, '0')}`);
}
