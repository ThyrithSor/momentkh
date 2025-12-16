/**
 * Debug candidates for BE 2641
 */

const momentkh2 = require('./momentkh2');

const targetBeYear = 2641;
const approxYear = targetBeYear - 544; // 2097

console.log(`Searching for: 15កើត Pisakh BE ${targetBeYear}`);
console.log(`Approximate year: ${approxYear}\n`);

let candidates = [];

for (let year = approxYear - 2; year <= approxYear + 2; year++) {
    for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const timesToCheck = [0, 6, 12, 18, 23];

            for (const hour of timesToCheck) {
                const result = momentkh2.fromGregorian(year, month, day, hour, 0);

                if (result.khmer.beYear === targetBeYear &&
                    result.khmer.monthIndex === 5 &&
                    result.khmer.day === 15 &&
                    result.khmer.moonPhase === 0) {
                    const existing = candidates.find(c => c.year === year && c.month === month && c.day === day);
                    if (!existing) {
                        candidates.push({ year, month, day });
                    }
                    break;
                }
            }
        }
    }
}

console.log(`Found ${candidates.length} candidates:\n`);

candidates.forEach((c, i) => {
    const dateStr = `${c.year}-${String(c.month).padStart(2, '0')}-${String(c.day).padStart(2, '0')}`;
    const yearDist = Math.abs(c.year - approxYear);

    // Check at noon
    const noonCheck = momentkh2.fromGregorian(c.year, c.month, c.day, 12, 0);
    const matchesAtNoon = (noonCheck.khmer.beYear === targetBeYear &&
                           noonCheck.khmer.monthIndex === 5 &&
                           noonCheck.khmer.day === 15 &&
                           noonCheck.khmer.moonPhase === 0);

    console.log(`${i + 1}. ${dateStr}`);
    console.log(`   Year distance: ${yearDist}`);
    console.log(`   Matches at noon: ${matchesAtNoon ? 'YES' : 'NO'}`);
    console.log(`   At noon: ${noonCheck.khmer.day}${noonCheck.khmer.moonPhase === 0 ? 'កើត' : 'រោច'} ${noonCheck.khmer.monthName} BE ${noonCheck.khmer.beYear}`);

    // Show which hours match
    const matchingHours = [];
    for (let h = 0; h < 24; h++) {
        const check = momentkh2.fromGregorian(c.year, c.month, c.day, h, 0);
        if (check.khmer.beYear === targetBeYear &&
            check.khmer.monthIndex === 5 &&
            check.khmer.day === 15 &&
            check.khmer.moonPhase === 0) {
            matchingHours.push(h);
        }
    }
    console.log(`   Matching hours: ${matchingHours.length > 10 ? matchingHours.slice(0, 5).join(',') + '...' + matchingHours.slice(-2).join(',') : matchingHours.join(',')}`);
    console.log('');
});
