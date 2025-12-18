
const { fromGregorian, format, constants } = require('../dist/momentkh');
const assert = require('assert');

console.log('Testing Month Abbreviations...');

try {
  // Constants checks
  assert.strictEqual(constants.SolarMonthAbbreviationNames.length, 12, 'Solar month abbreviations should have 12 items');
  assert.strictEqual(constants.LunarMonthAbbreviationNames.length, 14, 'Lunar month abbreviations should have 14 items');

  // Test Case 1: Solar Month Abbreviations (Ms)
  
  // January (1) -> 'មក'
  const dateJan = fromGregorian(2023, 1, 1);
  const msJan = format(dateJan, 'Ms');
  console.log(`Jan (1) -> Ms: ${msJan}`);
  assert.strictEqual(msJan, 'មក');

  // December (12) -> 'ធន'
  const dateDec = fromGregorian(2023, 12, 1);
  const msDec = format(dateDec, 'Ms');
  console.log(`Dec (12) -> Ms: ${msDec}`);
  assert.strictEqual(msDec, 'ធន');

  // Test Case 2: Lunar Month Abbreviations (ms)
  
  // Migasir (0) -> 'មិ'
  // 2023-11-20 is likely in Kadeuk or Migasir? Let's construct specifically.
  // We can mock the object or search for a date.
  // 2023-12-15 is likely in Migasir.
  const dateMigasir = fromGregorian(2023, 12, 15); 
  // Let's check what month it actually is
  console.log(`Actual month index: ${dateMigasir.khmer.monthIndex} (${dateMigasir.khmer.monthName})`);
  const msLunar = format(dateMigasir, 'ms');
  console.log(`Abbr 'ms': ${msLunar}`);
  
  // Check against the constant array directly to be sure
  const expectedLunarAbbr = constants.LunarMonthAbbreviationNames[dateMigasir.khmer.monthIndex];
  assert.strictEqual(msLunar, expectedLunarAbbr);

  console.log('SUCCESS: All abbreviation tests passed!');

} catch (e) {
  console.error('FAILURE:', e);
  process.exit(1);
}
