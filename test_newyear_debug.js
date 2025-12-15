const momentkh2 = require('./momentkh2');

// Debug the new year calculation for 2024console.log('Debugging Khmer New Year 2024 calculation...\n');

// First, let's check what the epoch (April 17, 2024) converts to
const epoch = momentkh2.fromGregorian(2024, 4, 17);
console.log('April 17, 2024 in Khmer:');
console.log('  Full:', momentkh2.format(epoch));
console.log('  Month index:', epoch.khmer.monthIndex);
console.log('  Day:', epoch.khmer.day);
console.log('  Moon phase:', epoch.khmer.moonPhase);
console.log('  Day number (0-29):', epoch._khmerDateObj.getDayNumber());

// Now test the new year function
console.log('\nCalculated New Year 2024:');
const ny = momentkh2.getNewYear(2024);
console.log(' ', ny);

// Also test with a cached year
console.log('\nCached New Year 2014:');
const ny2014 = momentkh2.getNewYear(2014);
console.log(' ', ny2014);
