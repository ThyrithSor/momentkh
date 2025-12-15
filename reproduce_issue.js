const momentkh2 = require('./momentkh2');

function checkDate(year, month, day, hour, minute) {
  const result = momentkh2.fromGregorian(year, month, day, hour, minute);
  const khmer = result.khmer;
  console.log(`Date: ${year}-${month}-${day} ${hour}:${minute}`);
  console.log(`Animal: ${khmer.animalYear}`);
  console.log(`Era (Sak): ${khmer.eraYear}`);
  console.log(`BE Year: ${khmer.beYear}`);
  console.log('---');
}

// Check around Khmer New Year 2024
// New Year is usually April 13-16
console.log('Checking New Year 2024');
checkDate(2024, 4, 13, 12, 0); // Before
checkDate(2024, 4, 14, 12, 0); // Likely during/start
checkDate(2024, 4, 15, 12, 0);
checkDate(2024, 4, 16, 12, 0); // Likely Lerng Sak
checkDate(2024, 4, 17, 12, 0); // After

const ny2024 = momentkh2.getNewYear(2024);
console.log('New Year 2024 Info:', ny2024);
