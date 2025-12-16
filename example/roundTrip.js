/**
 * Example 3: Convert today's Khmer date to Gregorian date (Round-trip conversion)
 *
 * This example demonstrates bidirectional conversion:
 * Gregorian → Khmer → Gregorian (and verify they match)
 */

const momentkh = require('@thyrith/momentkh');

// Step 1: Get today's Gregorian date
const today = new Date();
const gregorianDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hour: today.getHours(),
    minute: today.getMinutes(),
    second: today.getSeconds()
};

console.log('='.repeat(80));
console.log('Example 3: Round-Trip Conversion (Gregorian → Khmer → Gregorian)');
console.log('='.repeat(80));
console.log();

// Step 2: Convert Gregorian to Khmer
console.log('STEP 1: Gregorian → Khmer');
console.log('-'.repeat(80));
console.log('Original Gregorian Date:');
console.log(`  ${gregorianDate.year}-${String(gregorianDate.month).padStart(2, '0')}-${String(gregorianDate.day).padStart(2, '0')} ` +
    `${String(gregorianDate.hour).padStart(2, '0')}:${String(gregorianDate.minute).padStart(2, '0')}:${String(gregorianDate.second).padStart(2, '0')}`);
console.log();

const khmer = momentkh.fromGregorian(
    gregorianDate.year,
    gregorianDate.month,
    gregorianDate.day,
    gregorianDate.hour,
    gregorianDate.minute,
    gregorianDate.second
);

console.log('Converted to Khmer:');
console.log(`  Formatted: ${momentkh.format(khmer)}`);
console.log(`  Day: ${khmer.khmer.day}${khmer.khmer.moonPhase === 0 ? 'កើត' : 'រោច'}`);
console.log(`  Month: ${khmer.khmer.monthName} (index: ${khmer.khmer.monthIndex})`);
console.log(`  BE Year: ${khmer.khmer.beYear}`);
console.log();

// Step 3: Convert Khmer back to Gregorian
console.log('STEP 2: Khmer → Gregorian');
console.log('-'.repeat(80));
console.log('Converting back to Gregorian...');
console.log();

const backToGregorian = momentkh.fromKhmer(
    khmer.khmer.day,
    khmer.khmer.moonPhase,
    khmer.khmer.monthIndex,
    khmer.khmer.beYear
);

console.log('Converted back to Gregorian:');
console.log(`  ${backToGregorian.year}-${String(backToGregorian.month).padStart(2, '0')}-${String(backToGregorian.day).padStart(2, '0')}`);
console.log();

// Step 4: Verify they match
console.log('STEP 3: Verification');
console.log('-'.repeat(80));

const isMatch =
    backToGregorian.year === gregorianDate.year &&
    backToGregorian.month === gregorianDate.month &&
    backToGregorian.day === gregorianDate.day;

console.log('Comparison:');
console.log(`  Original:  ${gregorianDate.year}-${String(gregorianDate.month).padStart(2, '0')}-${String(gregorianDate.day).padStart(2, '0')}`);
console.log(`  Converted: ${backToGregorian.year}-${String(backToGregorian.month).padStart(2, '0')}-${String(backToGregorian.day).padStart(2, '0')}`);
console.log();

if (isMatch) {
    console.log('✓ SUCCESS! Round-trip conversion is accurate.');
    console.log('  The dates match perfectly!');
} else {
    console.log('✗ ERROR! Round-trip conversion failed.');
    console.log('  The dates do not match.');
}
console.log();

// Additional examples with different dates
console.log('ADDITIONAL EXAMPLES:');
console.log('-'.repeat(80));

const testDates = [
    { year: 2024, month: 4, day: 14 },  // Khmer New Year
    { year: 2024, month: 5, day: 22 },  // Visakha Bochea
    { year: 2024, month: 1, day: 1 },   // New Year's Day
];

testDates.forEach((date, index) => {
    const khmer = momentkh.fromGregorian(date.year, date.month, date.day);
    const back = momentkh.fromKhmer(khmer.khmer.day, khmer.khmer.moonPhase, khmer.khmer.monthIndex, khmer.khmer.beYear);
    const match = back.year === date.year && back.month === date.month && back.day === date.day;

    console.log(`Test ${index + 1}: ${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`);
    console.log(`  Khmer: ${momentkh.format(khmer, 'dN ខែm ព.ស. b')}`);
    console.log(`  Back: ${back.year}-${String(back.month).padStart(2, '0')}-${String(back.day).padStart(2, '0')}`);
    console.log(`  Result: ${match ? '✓ Match' : '✗ Mismatch'}`);
    console.log();
});

console.log('='.repeat(80));
