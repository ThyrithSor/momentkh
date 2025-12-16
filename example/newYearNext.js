/**
 * Example 2: Get Khmer New Year datetime of next year
 *
 * This example demonstrates how to calculate the exact date and time
 * of Khmer New Year (Moha Songkran) for next year.
 */

const momentkh = require('../momentkh');

// Get next year
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

// Get Khmer New Year information
const newYear = momentkh.getNewYear(nextYear);

// Convert to Khmer calendar for additional info
const khmerNewYear = momentkh.fromGregorian(
    newYear.year,
    newYear.month,
    newYear.day,
    newYear.hour,
    newYear.minute
);

// Display results
console.log('='.repeat(80));
console.log('Example 2: Get Khmer New Year DateTime of Next Year');
console.log('='.repeat(80));
console.log();

console.log(`Khmer New Year ${nextYear}:`);
console.log(`  Gregorian Date: ${newYear.year}-${String(newYear.month).padStart(2, '0')}-${String(newYear.day).padStart(2, '0')}`);
console.log(`  Time: ${String(newYear.hour).padStart(2, '0')}:${String(newYear.minute).padStart(2, '0')}`);
console.log(`  Exact Moment: ${newYear.year}-${String(newYear.month).padStart(2, '0')}-${String(newYear.day).padStart(2, '0')} ${String(newYear.hour).padStart(2, '0')}:${String(newYear.minute).padStart(2, '0')}`);
console.log();

console.log('Khmer Calendar Information:');
console.log(`  Khmer Date: ${momentkh.format(khmerNewYear, 'dN ខែm')}`);
console.log(`  BE Year: ${khmerNewYear.khmer.beYear}`);
console.log(`  Animal Year: ${khmerNewYear.khmer.animalYear}`);
console.log(`  Era Year: ${khmerNewYear.khmer.eraYear}`);
console.log(`  Weekday: ${khmerNewYear.khmer.dayOfWeek}`);
console.log();

console.log('Full Formatted:');
console.log(`  ${momentkh.format(khmerNewYear)}`);
console.log();

// Compare with current year
const currentNewYear = momentkh.getNewYear(currentYear);
console.log(`Previous New Year (${currentYear}):`);
console.log(`  Date: ${currentNewYear.year}-${String(currentNewYear.month).padStart(2, '0')}-${String(currentNewYear.day).padStart(2, '0')}`);
console.log(`  Time: ${String(currentNewYear.hour).padStart(2, '0')}:${String(currentNewYear.minute).padStart(2, '0')}`);
console.log();

// Calculate days until next New Year
const today = new Date();
const newYearDate = new Date(newYear.year, newYear.month - 1, newYear.day, newYear.hour, newYear.minute);
const daysUntil = Math.ceil((newYearDate - today) / (1000 * 60 * 60 * 24));

console.log(`Days until Khmer New Year ${nextYear}: ${daysUntil} days`);
console.log();

console.log('='.repeat(80));
