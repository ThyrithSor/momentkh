const momentkh2 = require('./momentkh2');

console.log('=== Testing MY library (momentkh2) ===\n');

const dates = [
    { year: 1899, month: 12, day: 30 },
    { year: 1899, month: 12, day: 31 },
    { year: 1900, month: 1, day: 1 },  // Epoch
    { year: 1900, month: 1, day: 2 },
    { year: 1900, month: 1, day: 3 },
    { year: 1900, month: 1, day: 10 },
    { year: 1900, month: 2, day: 1 },
];

console.log('Dates around epoch:');
dates.forEach(({ year, month, day }) => {
    const khmer = momentkh2.fromGregorian(year, month, day);
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    console.log(`${dateStr}: ${momentkh2.format(khmer, 'dN ខែm ព.ស.b')}`);
    console.log(`  dayNumber: ${khmer._khmerDateObj.getDayNumber()}, monthIndex: ${khmer.khmer.monthIndex}, beYear: ${khmer.khmer.beYear}`);
});

console.log('\n=== Comparing Today ===');
const today = momentkh2.fromDate(new Date(2025, 11, 15));  // Dec 15, 2025
console.log('Dec 15, 2025:', momentkh2.format(today));
console.log('Expected:      ថ្ងៃច​ន្ទ ១០រោច ខែមិគសិរ ឆ្នាំម្សាញ់ សប្តស័ក ពុទ្ធសករាជ ២៥៦៩');
