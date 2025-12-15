/**
 * MomentKH2 Example - Node.js (CommonJS)
 *
 * Run this file with: node example_momentkh2.js
 */

const momentkh2 = require('./momentkh2');

console.log('='.repeat(80));
console.log('MomentKH2 - Standalone Khmer Calendar Library Examples');
console.log('='.repeat(80));

// Example 1: Convert today's date to Khmer
console.log('\n1. TODAY\'S DATE');
console.log('-'.repeat(80));
const today = new Date();
const todayKhmer = momentkh2.fromGregorian(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
);
console.log('Gregorian:', today.toDateString());
console.log('Khmer:    ', momentkh2.format(todayKhmer));

// Example 2: Convert specific dates
console.log('\n2. SPECIFIC DATE CONVERSIONS');
console.log('-'.repeat(80));

const dates = [
    { year: 2000, month: 1, day: 1, label: 'Y2K - Jan 1, 2000' },
    { year: 1996, month: 9, day: 24, label: 'Sep 24, 1996' },
    { year: 2024, month: 4, day: 14, label: 'Khmer New Year 2024' },
    { year: 1900, month: 1, day: 1, label: 'Epoch - Jan 1, 1900' },
];

dates.forEach(({ year, month, day, label }) => {
    const khmer = momentkh2.fromGregorian(year, month, day);
    console.log(`\n${label}:`);
    console.log('  Default:', momentkh2.format(khmer));
});

// Example 3: Custom format examples
console.log('\n3. CUSTOM FORMAT EXAMPLES');
console.log('-'.repeat(80));

const sampleDate = momentkh2.fromGregorian(2024, 4, 14);

const formats = [
    { format: null, label: 'Default Format' },
    { format: 'dN ថ្ងៃW ខែm ព.ស. b', label: 'Format 1' },
    { format: 'o ខែm ឆ្នាំa e', label: 'Format 2' },
    { format: 'ថ្ងៃទី d n ខែ m ឆ្នាំ a', label: 'Format 3' },
    { format: 'ថ្ងៃW d n ខែ m ព.ស. b គ.ស. c', label: 'Format 4' },
    { format: 'c-M-D (j)', label: 'Short Format' }
];

formats.forEach(({ format, label }) => {
    console.log(`\n${label}:`);
    console.log(' ', momentkh2.format(sampleDate, format));
});

// Example 4: Khmer New Year calculations
console.log('\n4. KHMER NEW YEAR CALCULATIONS');
console.log('-'.repeat(80));

const years = [2020, 2021, 2022, 2023, 2024, 2025];
years.forEach(year => {
    const newYear = momentkh2.getNewYear(year);
    const timeStr = `${String(newYear.hour).padStart(2, '0')}:${String(newYear.minute).padStart(2, '0')}`;
    console.log(`${year}: ${newYear.day}/${newYear.month}/${newYear.year} at ${timeStr}`);
});

// Example 5: Khmer to Gregorian conversion
console.log('\n5. KHMER TO GREGORIAN CONVERSION');
console.log('-'.repeat(80));

const khmerDates = [
    { day: 1, moonPhase: 0, monthIndex: 1, beYear: 2443, label: '១កើត ខែបុស្ស ២៤៤៣' },
    { day: 15, moonPhase: 0, monthIndex: 5, beYear: 2568, label: '១៥កើត ខែពិសាខ ២៥៦៨' },
    { day: 1, moonPhase: 1, monthIndex: 4, beYear: 2568, label: '១រោច ខែចេត្រ ២៥៦៨' },
];

khmerDates.forEach(({ day, moonPhase, monthIndex, beYear, label }) => {
    const gregorian = momentkh2.fromKhmer(day, moonPhase, monthIndex, beYear);
    console.log(`\n${label}:`);
    console.log(`  Gregorian: ${gregorian.day}/${gregorian.month}/${gregorian.year}`);
});

// Example 6: Working with JavaScript Date objects
console.log('\n6. JAVASCRIPT DATE OBJECT INTEGRATION');
console.log('-'.repeat(80));

const jsDate = new Date(1996, 8, 24); // September 24, 1996
const khmerFromDate = momentkh2.fromDate(jsDate);
console.log('JS Date:  ', jsDate.toDateString());
console.log('Khmer:    ', momentkh2.format(khmerFromDate));

// Convert back to Date object
const dateObj = momentkh2.toDate(
    khmerFromDate.khmer.day,
    khmerFromDate.khmer.moonPhase,
    khmerFromDate.khmer.monthIndex,
    khmerFromDate.khmer.beYear
);
console.log('Back to JS:', dateObj.toDateString());

// Example 7: Display all available constants
console.log('\n7. AVAILABLE CONSTANTS');
console.log('-'.repeat(80));

console.log('\nLunar Months:');
console.log(' ', momentkh2.constants.LunarMonthNames.join(', '));

console.log('\nSolar Months:');
console.log(' ', momentkh2.constants.SolarMonthNames.join(', '));

console.log('\nAnimal Years:');
console.log(' ', momentkh2.constants.AnimalYearNames.join(', '));

console.log('\nEra Years:');
console.log(' ', momentkh2.constants.EraYearNames.join(', '));

console.log('\nWeekdays:');
console.log(' ', momentkh2.constants.WeekdayNames.join(', '));

// Example 8: Date range conversion
console.log('\n8. DATE RANGE CONVERSION (Jan 1-7, 2024)');
console.log('-'.repeat(80));

for (let day = 1; day <= 7; day++) {
    const khmer = momentkh2.fromGregorian(2024, 1, day);
    const formatted = momentkh2.format(khmer, 'c/M/D → dN ខែm');
    console.log(formatted);
}

console.log('\n' + '='.repeat(80));
console.log('Examples completed successfully!');
console.log('='.repeat(80) + '\n');
