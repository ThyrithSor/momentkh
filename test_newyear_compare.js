const moment = require('moment');
const momentkh = require('./momentkh'); // Original
momentkh(moment); // Initialize

const momentkh2 = require('./momentkh2'); // New

console.log('Comparison of Khmer New Year Times (1800-2200)');
console.log('momentkh (v1) vs momentkh2 (v2)');
console.log('=============================================');

let total = 0;
let mismatch = 0;
let errors = [];

for (let year = 1800; year <= 2200; year++) {
    total++;

    // Get from momentkh (v1)
    let ny1;
    try {
        ny1 = moment.getKhNewYearMoment(year);
    } catch (e) {
        errors.push({ year, error: `v1 error: ${e.message}` });
        mismatch++;
        continue;
    }

    // Get from momentkh2 (v2)
    let ny2;
    try {
        ny2 = momentkh2.getNewYear(year);
    } catch (e) {
        errors.push({ year, error: `v2 error: ${e.message}` });
        mismatch++;
        continue;
    }

    // Extract from v1
    // moment objects use 0-based months (0-11)
    const v1 = {
        year: ny1.year(),
        month: ny1.month() + 1,
        day: ny1.date(),
        hour: ny1.hour(),
        minute: ny1.minute()
    };

    // v2 uses 1-based months (1-12) based on previous logs (month: 4 for April)
    const v2 = {
        year: ny2.year,
        month: ny2.month,
        day: ny2.day,
        hour: ny2.hour,
        minute: ny2.minute
    };

    // Compare
    const isMatch = v1.year === v2.year &&
        v1.month === v2.month &&
        v1.day === v2.day &&
        v1.hour === v2.hour &&
        v1.minute === v2.minute;

    if (!isMatch) {
        mismatch++;
        errors.push({
            year,
            v1: `${v1.year}-${v1.month}-${v1.day} ${v1.hour}:${v1.minute}`,
            v2: `${v2.year}-${v2.month}-${v2.day} ${v2.hour}:${v2.minute}`
        });
    }
}

// Report
console.log(`Total Years: ${total}`);
console.log(`Matches: ${total - mismatch}`);
console.log(`Mismatches: ${mismatch}`);
console.log(`Match Percentage: ${((total - mismatch) / total * 100).toFixed(2)}%`);

if (mismatch > 0) {
    console.log('\nMismatches:');
    errors.forEach(err => {
        if (err.error) {
            console.log(`Year ${err.year}: ${err.error}`);
        } else {
            console.log(`Year ${err.year}: v1=${err.v1} | v2=${err.v2}`);
        }
    });
}
