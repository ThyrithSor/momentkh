/**
 * Generate Khmer New Year moments for range of years
 * Output: test/new-year.json
 */

const momentkh = require('../momentkh');
const fs = require('fs');
const path = require('path');

console.log('Generating Khmer New Year data...\n');

// Generate New Year moments from 1800 to 2300
const startYear = 1800;
const endYear = 2300;
const newYearData = {};

let count = 0;
const total = endYear - startYear + 1;

for (let year = startYear; year <= endYear; year++) {
  try {
    // Get New Year info
    const newYear = momentkh.getNewYear(year);
    
    // Create Date object from the New Year info
    const newYearDate = new Date(
      newYear.year,
      newYear.month - 1, // JavaScript months are 0-indexed
      newYear.day,
      newYear.hour,
      newYear.minute,
      0, // seconds
      0  // milliseconds
    );
    
    // Format as ISO string with UTC+7:00 timezone
    // JavaScript Date treats local time, so we format it as local time with +07:00 offset
    const year4 = newYearDate.getFullYear();
    const month2 = String(newYearDate.getMonth() + 1).padStart(2, '0');
    const day2 = String(newYearDate.getDate()).padStart(2, '0');
    const hour2 = String(newYearDate.getHours()).padStart(2, '0');
    const minute2 = String(newYearDate.getMinutes()).padStart(2, '0');
    const second2 = String(newYearDate.getSeconds()).padStart(2, '0');
    
    const isoString = `${year4}-${month2}-${day2}T${hour2}:${minute2}:${second2}+07:00`;
    
    // Add to data object
    newYearData[year] = isoString;
    
    count++;
    
    // Progress indicator
    if (count % 100 === 0) {
      console.log(`Generated ${count}/${total} years...`);
    }
  } catch (error) {
    console.error(`Error generating New Year for ${year}: ${error.message}`);
  }
}

// Write to file
const outputPath = path.join(__dirname, 'new-year.json');
fs.writeFileSync(
  outputPath,
  JSON.stringify(newYearData, null, 2),
  'utf8'
);

console.log(`\n✓ Successfully generated ${count} New Year moments`);
console.log(`✓ Year range: ${startYear} - ${endYear}`);
console.log(`✓ Saved to: ${outputPath}`);
console.log(`\nSample entries:`);

// Show some sample entries
const sampleYears = [1900, 1950, 2000, 2024, 2050, 2100, 2200];
sampleYears.forEach(year => {
  if (newYearData[year]) {
    const date = new Date(newYearData[year]);
    console.log(`  ${year}: ${date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    })}`);
  }
});
