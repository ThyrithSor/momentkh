const momentkh2 = require('./momentkh2');

console.log('Testing basic conversions...\n');

// Test 1: Epoch date (should be identity)
console.log('Test 1: Epoch - Jan 1, 1900');
const epoch = momentkh2.fromGregorian(1900, 1, 1);
console.log('  Khmer:', momentkh2.format(epoch, 'dN ខែm ព.ស.b'));
console.log('  Expected: ១កើត ខែបុស្ស ព.ស.២៤៤៣');

// Test 2: Convert back
console.log('\nTest 2: Khmer to Gregorian (1កើត បុស្ស 2443)');
const greg = momentkh2.fromKhmer(1, 0, 1, 2443);
console.log('  Gregorian:', `${greg.year}-${greg.month}-${greg.day}`);
console.log('  Expected: 1900-1-1');

// Test 3: New Year 2024 (from cache)
console.log('\nTest 3: Khmer New Year 2024 (cached)');
const ny2024 = momentkh2.getNewYear(2024);
console.log('  Result:', `${ny2024.year}-${ny2024.month}-${ny2024.day} ${ny2024.hour}:${String(ny2024.minute).padStart(2, '0')}`);
console.log('  Expected: Should be in April 2024');

// Test 4: A known date
console.log('\nTest 4: Convert April 14, 2024');
const apr14 = momentkh2.fromGregorian(2024, 4, 14);
console.log('  Khmer:', momentkh2.format(apr14, 'dN ខែm ព.ស.b'));
