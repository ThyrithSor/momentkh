/**
 * Example 1: Get Khmer date of today
 *
 * This example demonstrates how to convert today's date
 * to the Khmer calendar format.
 */

const momentkh = require('../momentkh');

// Get today's date
const today = new Date();
const khmer = momentkh.fromDate(today);

// Display results
console.log('='.repeat(80));
console.log('Example 1: Get Khmer Date of Today');
console.log('='.repeat(80));
console.log();

console.log('Today (Gregorian):');
console.log(`  Date: ${today.toDateString()}`);
console.log(`  Time: ${today.toTimeString()}`);
console.log();

console.log('Today (Khmer Calendar):');
console.log(`  Formatted: ${momentkh.format(khmer)}`);
console.log();

console.log('Detailed Information:');
console.log(`  Day: ${khmer.khmer.day}${khmer.khmer.moonPhase === 0 ? 'កើត' : 'រោច'}`);
console.log(`  Month: ${khmer.khmer.monthName}`);
console.log(`  BE Year: ${khmer.khmer.beYear}`);
console.log(`  Animal Year: ${khmer.khmer.animalYear}`);
console.log(`  Era Year: ${khmer.khmer.eraYear}`);
console.log(`  Weekday: ${khmer.khmer.dayOfWeek}`);
console.log();

console.log('Custom Formats:');
console.log(`  Format 1: ${momentkh.format(khmer, 'W dN ខែm ព.ស.b')}`);
console.log(`  Format 2: ${momentkh.format(khmer, 'dN m ឆ្នាំa e')}`);
console.log(`  Format 3: ${momentkh.format(khmer, 'c/M/D - j/m/D')}`);
console.log();

console.log('='.repeat(80));
