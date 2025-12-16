const moment = require('moment');
require('./momentkh')(moment);
const momentkh2 = require('./momentkh2');

// Test one of the mismatched dates
const year = 2108, month = 5, day = 24, hour = 10, minute = 50;

console.log(`Testing: ${year}-${month}-${day} ${hour}:${minute}`);
console.log('');

// Test with original momentkh
const m = moment(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`, 'YYYY-MM-DD HH:mm');
const original = {
    formatted: m.toKhDate(),
    day: m.khDay(),
    month: m.khMonth(),
    year: m.khYear()
};

// Test with momentkh2
const khmer2 = momentkh2.fromGregorian(year, month, day, hour, minute);
const new2 = {
    formatted: momentkh2.format(khmer2),
    day: khmer2._khmerDateObj.getDayNumber(),
    month: khmer2.khmer.monthIndex,
    year: khmer2.khmer.beYear
};

console.log('momentkh (original):');
console.log('  Formatted:', original.formatted);
console.log('  Day:', original.day, 'Month:', original.month, 'Year:', original.year);
console.log('');

console.log('momentkh2:');
console.log('  Formatted:', new2.formatted);
console.log('  Day:', new2.day, 'Month:', new2.month, 'Year:', new2.year);
console.log('');

console.log('Match:', original.day === new2.day && original.month === new2.month && original.year === new2.year ? '✓' : '✗');

// Check what the Khmer date is
console.log('');
console.log('Khmer date info:');
console.log('  Moon phase:', khmer2.khmer.moonPhase === 0 ? 'កើត (waxing)' : 'រោច (waning)');
console.log('  Day of month:', khmer2.khmer.day);
console.log('  Month name:', khmer2.khmer.monthName);
