/**
 * Debug candidates for BE 2829
 */

const momentkh2 = require('./momentkh2');

const targetBeYear = 2829;
const approxYear = targetBeYear - 544; // 2285

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
    console.log(`   Year distance from ${approxYear}: ${yearDist}`);
    console.log(`   Matches at noon: ${matchesAtNoon ? 'YES' : 'NO'}`);

    // Show the BE year at different times
    console.log(`   At 00:00: BE ${momentkh2.fromGregorian(c.year, c.month, c.day, 0, 0).khmer.beYear}`);
    console.log(`   At 12:00: BE ${momentkh2.fromGregorian(c.year, c.month, c.day, 12, 0).khmer.beYear}`);
    console.log(`   At 23:00: BE ${momentkh2.fromGregorian(c.year, c.month, c.day, 23, 0).khmer.beYear}`);
    console.log('');
});

console.log('Which one will be selected?');
const minDistance = Math.min(...candidates.map(c => Math.abs(c.year - approxYear)));
const closestCandidates = candidates.filter(c => Math.abs(c.year - approxYear) === minDistance);
console.log(`Closest candidates (distance ${minDistance}):`, closestCandidates.map(c => `${c.year}-${String(c.month).padStart(2, '0')}-${String(c.day).padStart(2, '0')}`).join(', '));

if (closestCandidates.length === 1) {
    console.log('Selected:', closestCandidates[0].year + '-' + String(closestCandidates[0].month).padStart(2, '0') + '-' + String(closestCandidates[0].day).padStart(2, '0'));
} else {
    const noonMatches = closestCandidates.filter(c => {
        const noonCheck = momentkh2.fromGregorian(c.year, c.month, c.day, 12, 0);
        return noonCheck.khmer.beYear === targetBeYear &&
               noonCheck.khmer.monthIndex === 5 &&
               noonCheck.khmer.day === 15 &&
               noonCheck.khmer.moonPhase === 0;
    });
    if (noonMatches.length > 0) {
        console.log('Selected (noon match):', noonMatches[0].year + '-' + String(noonMatches[0].month).padStart(2, '0') + '-' + String(noonMatches[0].day).padStart(2, '0'));
    } else {
        console.log('Selected (first closest):', closestCandidates[0].year + '-' + String(closestCandidates[0].month).padStart(2, '0') + '-' + String(closestCandidates[0].day).padStart(2, '0'));
    }
}
