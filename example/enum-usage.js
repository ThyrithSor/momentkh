/**
 * Example: Using MomentKH with Enums
 *
 * This example demonstrates how to use the new enum features in MomentKH 3.0
 */

const momentkh = require('@thyrith/momentkh');
const { MoonPhase, MonthIndex, AnimalYear, Sak, DayOfWeek } = momentkh;

console.log('='.repeat(80));
console.log('MOMENTKH 3.0 - ENUM USAGE EXAMPLES');
console.log('='.repeat(80));
console.log();

// Example 1: Convert Gregorian to Khmer
console.log('1. GREGORIAN TO KHMER CONVERSION');
console.log('-'.repeat(80));
const result = momentkh.fromGregorian(2024, 12, 16);
console.log('Input: December 16, 2024');
console.log();
console.log('Output:');
console.log('  Day:', result.khmer.day);
console.log('  Moon Phase (enum):', result.khmer.moonPhase, '→', result.khmer.moonPhaseName);
console.log('  Month Index (enum):', result.khmer.monthIndex, '→', result.khmer.monthName);
console.log('  Animal Year (enum):', result.khmer.animalYear, '→', result.khmer.animalYearName);
console.log('  Sak (enum):', result.khmer.sak, '→', result.khmer.sakName);
console.log('  Day of Week (enum):', result.khmer.dayOfWeek, '→', result.khmer.dayOfWeekName);
console.log('  BE Year:', result.khmer.beYear);
console.log();

// Example 2: Compare using enums
console.log('2. USING ENUMS FOR COMPARISON');
console.log('-'.repeat(80));
if (result.khmer.moonPhase === MoonPhase.Waxing) {
  console.log('✓ It is Waxing Moon (កើត)');
} else if (result.khmer.moonPhase === MoonPhase.Waning) {
  console.log('✓ It is Waning Moon (រោច)');
}

if (result.khmer.monthIndex === MonthIndex.Migasir) {
  console.log('✓ It is Migasir month (មិគសិរ)');
} else {
  console.log(`  Current month: ${result.khmer.monthName}`);
}

if (result.khmer.dayOfWeek === DayOfWeek.Monday) {
  console.log('✓ It is Monday (ចន្ទ)');
} else {
  console.log(`  Day of week: ${result.khmer.dayOfWeekName}`);
}
console.log();

// Example 3: Convert Khmer to Gregorian using enums
console.log('3. KHMER TO GREGORIAN CONVERSION (USING ENUMS)');
console.log('-'.repeat(80));
const gregorianDate = momentkh.fromKhmer(
  15,                    // day
  MoonPhase.Waxing,     // moon phase (using enum)
  MonthIndex.Pisakh,    // month index (using enum)
  2568                  // BE year
);
console.log('Input: 15កើត ខែពិសាខ ព.ស.2568');
console.log('Output:', `${gregorianDate.year}-${gregorianDate.month}-${gregorianDate.day}`);
console.log();

// Example 4: Convert Khmer to Gregorian using numbers (backward compatible)
console.log('4. KHMER TO GREGORIAN CONVERSION (USING NUMBERS - BACKWARD COMPATIBLE)');
console.log('-'.repeat(80));
const gregorianDate2 = momentkh.fromKhmer(
  15,   // day
  0,    // moon phase (0 = Waxing)
  5,    // month index (5 = Pisakh)
  2568  // BE year
);
console.log('Input: 15កើត ខែពិសាខ ព.ស.2568');
console.log('Output:', `${gregorianDate2.year}-${gregorianDate2.month}-${gregorianDate2.day}`);
console.log();

// Example 5: All available enums
console.log('5. AVAILABLE ENUM VALUES');
console.log('-'.repeat(80));
console.log();
console.log('MoonPhase:');
console.log('  Waxing:', MoonPhase.Waxing, '(កើត)');
console.log('  Waning:', MoonPhase.Waning, '(រោច)');
console.log();

console.log('MonthIndex (selected):');
console.log('  Migasir:', MonthIndex.Migasir, '(មិគសិរ)');
console.log('  Pisakh:', MonthIndex.Pisakh, '(ពិសាខ)');
console.log('  Jesth:', MonthIndex.Jesth, '(ជេស្ឋ)');
console.log('  Asadh:', MonthIndex.Asadh, '(អាសាឍ)');
console.log();

console.log('AnimalYear (selected):');
console.log('  Chhut (Rat):', AnimalYear.Chhut);
console.log('  Chlov (Ox):', AnimalYear.Chlov);
console.log('  Khal (Tiger):', AnimalYear.Khal);
console.log('  Rong (Dragon):', AnimalYear.Rong);
console.log();

console.log('DayOfWeek:');
console.log('  Sunday:', DayOfWeek.Sunday, '(អាទិត្យ)');
console.log('  Monday:', DayOfWeek.Monday, '(ចន្ទ)');
console.log('  Tuesday:', DayOfWeek.Tuesday, '(អង្គារ)');
console.log('  Wednesday:', DayOfWeek.Wednesday, '(ពុធ)');
console.log();

console.log('='.repeat(80));
console.log('✓ All examples completed successfully!');
console.log('='.repeat(80));
