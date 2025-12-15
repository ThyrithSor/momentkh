/**
 * MomentKH2 Example - ES Module (import)
 *
 * Run this file with: node example_momentkh2.mjs
 * Note: Requires Node.js 12+ with ES module support
 */

// For ES modules, you may need to adjust the import based on your setup
// This example shows how it would work in a bundler or with proper ES module configuration

import momentkh2 from './momentkh2.js';

console.log('='.repeat(80));
console.log('MomentKH2 - ES Module Example');
console.log('='.repeat(80));

// Example: Convert current date
const now = new Date();
const khmerNow = momentkh2.fromDate(now);

console.log('\nCurrent Date:');
console.log('Gregorian:', now.toDateString());
console.log('Khmer:    ', momentkh2.format(khmerNow));

// Example: Get Khmer New Year for current year
const currentYear = now.getFullYear();
const newYear = momentkh2.getNewYear(currentYear);

console.log(`\nKhmer New Year ${currentYear}:`);
console.log(`Date: ${newYear.day}/${newYear.month}/${newYear.year}`);
console.log(`Time: ${String(newYear.hour).padStart(2, '0')}:${String(newYear.minute).padStart(2, '0')}`);

// Example: Custom format
console.log('\nCustom Formats:');
console.log('Format 1:', momentkh2.format(khmerNow, 'ថ្ងៃW dN ខែm ឆ្នាំa'));
console.log('Format 2:', momentkh2.format(khmerNow, 'c-M-D'));
console.log('Format 3:', momentkh2.format(khmerNow, 'o ខែm ព.ស.b'));

console.log('\n' + '='.repeat(80));
