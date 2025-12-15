// Test epoch dates with original momentkh
const moment = require('moment');
require('./momentkh')(moment);

console.log('=== Checking dates around epoch ===\n');

// Check several dates around January 1, 1900
const dates = [
    '1899-12-30',
    '1899-12-31',
    '1900-01-01',  // Epoch
    '1900-01-02',
    '1900-01-03',
    '1900-01-10',
    '1900-02-01',
];

dates.forEach(dateStr => {
    const m = moment(dateStr);
    console.log(`${dateStr}: ${m.toKhDate()}`);
    console.log(`  khDay: ${m.khDay()}, khMonth: ${m.khMonth()}, khYear: ${m.khYear()}`);
});

console.log('\n=== Checking New Year calculation ===');
console.log('New Year 2024:', moment.getKhNewYearMoment(2024).format('YYYY-MM-DD HH:mm'));
console.log('New Year 2023:', moment.getKhNewYearMoment(2023).format('YYYY-MM-DD HH:mm'));
console.log('New Year 2025:', moment.getKhNewYearMoment(2025).format('YYYY-MM-DD HH:mm'));
