/**
 * Generate test data: 2000 random dates converted to Khmer format
 * Output: test/conversion.json
 */

const momentkh = require('../momentkh');
const fs = require('fs');
const path = require('path');

console.log('Generating 2000 random date conversions...\n');

// Helper function to generate random date between 1900 and 2200
function randomDate() {
  const year = Math.floor(Math.random() * (2200 - 1900 + 1)) + 1900;
  const month = Math.floor(Math.random() * 12) + 1;
  
  // Get valid day range for the month/year
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;
  
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);
  
  return { year, month, day, hour, minute, second };
}

// Format Gregorian date as string
function formatGregorianDateTime(date) {
  const year = String(date.year).padStart(4, '0');
  const month = String(date.month).padStart(2, '0');
  const day = String(date.day).padStart(2, '0');
  const hour = String(date.hour).padStart(2, '0');
  const minute = String(date.minute).padStart(2, '0');
  const second = String(date.second).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// Generate conversions
const conversions = {};
const generated = new Set(); // Track unique dates

let count = 0;
while (count < 2000) {
  const date = randomDate();
  const gregorianStr = formatGregorianDateTime(date);
  
  // Skip if we've already generated this date
  if (generated.has(gregorianStr)) {
    continue;
  }
  
  try {
    // Convert to Khmer
    const khmer = momentkh.fromGregorian(
      date.year,
      date.month,
      date.day,
      date.hour,
      date.minute,
      date.second
    );
    
    // Format Khmer date
    const khmerFormatted = momentkh.format(khmer);
    
    // Add to conversions
    conversions[gregorianStr] = khmerFormatted;
    generated.add(gregorianStr);
    count++;
    
    // Progress indicator
    if (count % 100 === 0) {
      console.log(`Generated ${count}/2000 conversions...`);
    }
  } catch (error) {
    // Skip invalid dates (shouldn't happen with our validation)
    console.error(`Error converting ${gregorianStr}: ${error.message}`);
  }
}

// Sort the conversions by date for easier reading
const sortedConversions = {};
Object.keys(conversions)
  .sort()
  .forEach(key => {
    sortedConversions[key] = conversions[key];
  });

// Write to file
const outputPath = path.join(__dirname, 'conversion.json');
fs.writeFileSync(
  outputPath,
  JSON.stringify(sortedConversions, null, 2),
  'utf8'
);

console.log(`\n✓ Successfully generated 2000 conversions`);
console.log(`✓ Saved to: ${outputPath}`);
console.log(`\nSample entries:`);

// Show first 5 entries
const entries = Object.entries(sortedConversions).slice(0, 5);
entries.forEach(([gregorian, khmer]) => {
  console.log(`  ${gregorian} => ${khmer}`);
});
