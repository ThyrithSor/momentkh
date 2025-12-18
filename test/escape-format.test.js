
const { format, toDate } = require('../dist/momentkh');
const assert = require('assert');

// 2023-04-14 is Khmer New Year 2023
const date = toDate(14, 1, 5, 2567); // 14th day, Waxing (1), Pisakh (5), 2567 BE

// Create a mock object that mimics what momentkh returns for internal functions if needed, 
// but we are testing public API 'format', so we need a valid KhmerConversionResult or similar if we were calling internal.
// However, the 'format' function usually takes the result of 'fromGregorian' or similar.
// Let's use 'fromGregorian' to get a valid object.

const { fromGregorian } = require('../dist/momentkh');
const khmerDate = fromGregorian(2023, 4, 14); 
// 14th April 2023
// Gregorian: 2023-04-14
// Khmer: Likely around New Year. 
// Just ensuring we have valid data to format.

console.log('Testing Escape Support in Format...');

try {
  // Test Case 1: Simple text (existing behavior check - no escape chars)
  // 'd' is day. 
  const result1 = format(khmerDate, 'd');
  console.log(`Format 'd': ${result1}`); 
  // Should be Khmer numeral for day.

  // Test Case 2: Escaped text [d]
  // Expected: "d" (literal 'd', not replaced by day number)
  // Current behavior (before fix): likely replaces 'd' with day number or keeps brackets if not matched?
  // Actually currently it matches 'd' inside the string and replaces it because regex is global OR it might not match brackets.
  // The current regex is just `Object.keys(formatRules).join('|')`.
  // So '[d]' becomes '[<khmer_day>]'.
  
  const result2 = format(khmerDate, '[d]');
  console.log(`Format '[d]': ${result2}`);
  
  if (result2 === 'd') {
    console.log('SUCCESS: [d] formatted as literal "d"');
  } else {
    console.log(`FAILURE: [d] formatted as "${result2}", expected "d"`);
  }

  // Test Case 3: Escaped text with non-tokens [Hello]
  const result3 = format(khmerDate, '[Hello]');
  console.log(`Format '[Hello]': ${result3}`);
  
    if (result3 === 'Hello') {
    console.log('SUCCESS: [Hello] formatted as literal "Hello"');
  } else {
      // Current behavior will likely be "[Hello]" because H, e, l, o are not tokens (except maybe 'e', 'o' if they are tokens?)
      // Check tokens: W w d D n N o m M a e b c j
      // 'e' is sakName. 'o' is MoonDaySymbols. 
      // So 'Hello' -> 'H' + sakName + 'll' + symbol + brackets? 
      console.log(`FAILURE: [Hello] formatted as "${result3}", expected "Hello"`);
  }

  // Test Case 4: Escaped numbers [123]
  // Should not be converted to Khmer numerals if escaped (this is a stricter requirement, maybe not explicitly requested but implied by "escape")
  // Wait, `formatKhmer` applies `toKhmerNumeral` to the result of replacements.
  // If we escape `[123]`, it should probably return `123` in Western numerals, or `១២៣`?
  // Moment.js `[text]` outputs `text` without any processing.
  // So `[123]` should be `123`.
  const result4 = format(khmerDate, '[123]');
  console.log(`Format '[123]': ${result4}`);
   if (result4 === '123') {
    console.log('SUCCESS: [123] formatted as literal "123"');
  } else {
    console.log(`FAILURE: [123] formatted as "${result4}", expected "123"`);
  }



  // Test Case 5: Escaped brackets [[Day]]:
  // Expected: "[Day]: " (The outer brackets escape the inner string "[Day]")
  const result5 = format(khmerDate, '[[Day]]: ');
  console.log(`Format '[[Day]]: ': ${result5}`);
  if (result5 === '[Day]: ') {
    console.log('SUCCESS: [[Day]]: formatted as literal "[Day]: "');
  } else {
    console.log(`FAILURE: [[Day]]: formatted as "${result5}", expected "[Day]: "`);
  }

} catch (e) {
  console.error('Error running test:', e);
}
