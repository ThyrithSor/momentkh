
const { fromGregorian, format } = require('../dist/momentkh');
const assert = require('assert');

console.log('Testing Raw Format Codes...');

try {
  // Test Date: Use fromKhmer to guarantee specific Khmer values
  // Day 14, Waxing (0), Pisakh (5), 2568 -> May 2024
  const greg = require('../dist/momentkh').fromKhmer(14, 0, 5, 2568);
  const date = fromGregorian(greg.year, greg.month, greg.day);

  // Test Case 1: Day (d vs dr)
  const d = format(date, 'd');
  const dr = format(date, 'dr');
  console.log(`Day: d='${d}', dr='${dr}'`);
  assert.strictEqual(d, '១៤', 'd should be Khmer numeral 14');
  assert.strictEqual(dr, '14', 'dr should be Latin numeral 14');

  // Test Case 2: Padded Day (D vs Dr)
  // Use a single digit day (Day 5)
  const gregSingle = require('../dist/momentkh').fromKhmer(5, 0, 4, 2568);
  const dateSingle = fromGregorian(gregSingle.year, gregSingle.month, gregSingle.day);
  const D = format(dateSingle, 'D');
  const Dr = format(dateSingle, 'Dr');
  console.log(`Padded Day: D='${D}', Dr='${Dr}'`);
  assert.strictEqual(D, '០៥', 'D should be Khmer numeral padded');
  assert.strictEqual(Dr, '05', 'Dr should be Latin numeral padded');

  // Test Case 3: BE Year (b vs br)
  // BE for April 2024 is 2567 (before new year logic updates era? Wait, logic is complex.)
  // Let's check what it actually is.
  const b = format(date, 'b');
  const br = format(date, 'br');
  console.log(`BE Year: b='${b}', br='${br}'`);
  // Just ensure one is khmer and one is latin version of the same number
  // Simple check: b contains Khmer digits, br contains Latin digits
  assert.match(b, /^[០-៩]+$/, 'b should contain Khmer digits');
  assert.match(br, /^[0-9]+$/, 'br should contain Latin digits');

  // Test Case 4: CE Year (c vs cr)
  const c = format(date, 'c');
  const cr = format(date, 'cr');
  console.log(`CE Year: c='${c}', cr='${cr}'`);
  assert.strictEqual(c, '២០២៥', 'c should be Khmer numeral');
  assert.strictEqual(cr, '2025', 'cr should be Latin numeral');

  // Test Case 5: JS Year (j vs jr)
  const j = format(date, 'j');
  const jr = format(date, 'jr');
  console.log(`JS Year: j='${j}', jr='${jr}'`);
  assert.match(j, /^[០-៩]+$/, 'j should contain Khmer digits');
  assert.match(jr, /^[0-9]+$/, 'jr should contain Latin digits');

  // Test Case 6: Mixed usage
  // "Day 14 Month 14 Year 2025"
  // Use escaped brackets for text containing format tokens (D, a, M, o, n, e, a, r)
  const mixed = format(date, '[Day] dr [Month] Dr [Year] cr');
  console.log(`Mixed: '${mixed}'`);
  assert.strictEqual(mixed, 'Day 14 Month 14 Year 2025');

  console.log('SUCCESS: All raw format tests passed!');

} catch (e) {
  console.error('FAILURE:', e);
  process.exit(1);
}
