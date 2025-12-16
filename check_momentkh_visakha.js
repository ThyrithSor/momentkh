const moment = require('moment');
require('./momentkh')(moment);

// Check when momentkh increments the year
console.log('Checking momentkh behavior on 2252-05-23:');
for (let day = 22; day <= 24; day++) {
    console.log(`\nDay ${day}:`);
    for (let hour = 0; hour <= 23; hour += 1) {
        const m = moment(`2252-05-${day} ${String(hour).padStart(2, '0')}:00`, 'YYYY-MM-DD HH:mm');
        const khDay = m.khDay();
        const khMonth = m.khMonth();
        const khYear = m.khYear();
        const moonPhase = khDay < 15 ? 'កើត' : 'រោច';
        const dayNum = khDay < 15 ? khDay + 1 : khDay - 14;
        console.log(`  ${String(hour).padStart(2, '0')}:00 → ${dayNum}${moonPhase} month ${khMonth} BE ${khYear}`);
    }
}
