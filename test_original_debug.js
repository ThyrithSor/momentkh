const moment = require('moment');
const Moment = require('moment');

// Read the momentkh file and inject debugging
const fs = require('fs');
let momentkhCode = fs.readFileSync('./momentkh.js', 'utf8');

// Replace the findLunarDate function to add logging
momentkhCode = momentkhCode.replace(
  'khmerDay += Math.floor(Moment.duration(target.diff(epochMoment), \'milliseconds\').asDays());',
  `const remainingDays = Math.floor(Moment.duration(target.diff(epochMoment), 'milliseconds').asDays());
   console.log('[ORIGINAL DEBUG] After month loop, epochMoment:', epochMoment.format('YYYY-MM-DD'));
   console.log('[ORIGINAL DEBUG] Remaining days:', remainingDays);
   console.log('[ORIGINAL DEBUG] khmerMonth:', khmerMonth);
   khmerDay += remainingDays;
   console.log('[ORIGINAL DEBUG] khmerDay after adding remaining:', khmerDay);`
);

// Write to temp file and require it
fs.writeFileSync('./momentkh_debug_temp.js', momentkhCode);
require('./momentkh_debug_temp')(moment);

const testDate = moment('1992-07-16');
console.log('\n=== RESULT ===');
console.log('khDay():', testDate.khDay());
console.log('khMonth():', testDate.khMonth());
console.log('Full:', testDate.toKhDate());
