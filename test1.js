const moment = require('moment');
const fs = require('fs');
require('./momentkh')(moment);

console.log('Starting conversion test from 01/01/1900 to 31/12/2100...');

// Create write stream for the output file
const outputStream = fs.createWriteStream('tested_momentkh.txt');

// Start date: January 1, 1900
const startDate = moment('1900-01-01', 'YYYY-MM-DD');
// End date: December 31, 2100
const endDate = moment('2100-12-31', 'YYYY-MM-DD');

// Counter for progress tracking
let count = 0;
const totalDays = endDate.diff(startDate, 'days') + 1;

console.log(`Total days to process: ${totalDays.toLocaleString()}`);

// Write header
outputStream.write('Gregorian Date\t\t|\tKhmer Lunar Date\n');
outputStream.write('='.repeat(100) + '\n');

// Loop through each day
let currentDate = startDate.clone();

while (currentDate.isSameOrBefore(endDate)) {
    try {
        // Get Gregorian date
        const gregorianDate = currentDate.format('DD/MM/YYYY');

        // Convert to Khmer lunar date
        const khmerDate = currentDate.toKhDate();

        // Write to file
        outputStream.write(`${gregorianDate}\t\t|\t${khmerDate}\n`);

        count++;

        // Progress indicator every 1000 days
        if (count % 1000 === 0) {
            const progress = ((count / totalDays) * 100).toFixed(2);
            console.log(`Processed ${count.toLocaleString()} days (${progress}%)`);
        }

        // Move to next day
        currentDate.add(1, 'day');
    } catch (error) {
        // Log any errors but continue processing
        outputStream.write(`${currentDate.format('DD/MM/YYYY')}\t\t|\tERROR: ${error.message}\n`);
        currentDate.add(1, 'day');
        count++;
    }
}

// Close the stream
outputStream.end(() => {
    console.log('\n=== Conversion Complete ===');
    console.log(`Total days processed: ${count.toLocaleString()}`);
    console.log(`Output file: tested_momentkh.txt`);
    console.log('File generated successfully!');
});
