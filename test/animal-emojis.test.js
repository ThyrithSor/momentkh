
const { fromGregorian, format, constants } = require('../dist/momentkh');
const assert = require('assert');

console.log('Testing Animal Year Emojis...');

try {
  // Constants checks
  assert.strictEqual(constants.AnimalYearEmojis.length, 12, 'AnimalYearEmojis should have 12 items');
  
  // Verify emoji mapping
  const expectedEmojis = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'];
  assert.deepStrictEqual(constants.AnimalYearEmojis, expectedEmojis, 'Emoji list does not match expected list');

  // Test Case 1: 2024 is Year of the Dragon (Rong)
  // New Year 2024 starts April 13.
  // Before April 13, it's Rabbit (Thoh) 🐇
  // After April 13 (specifically after the time), it's Dragon (Rong) 🐉
  
  const dateBeforeNY = fromGregorian(2024, 4, 1);
  const emojiBefore = format(dateBeforeNY, 'as');
  console.log(`2024-04-01 (Before NY) -> as: ${emojiBefore}`);
  assert.strictEqual(emojiBefore, '🐇', 'Should be Rabbit before NY 2024');

  const dateAfterNY = fromGregorian(2024, 5, 1);
  const emojiAfter = format(dateAfterNY, 'as');
  console.log(`2024-05-01 (After NY) -> as: ${emojiAfter}`);
  assert.strictEqual(emojiAfter, '🐉', 'Should be Dragon after NY 2024');

  console.log('SUCCESS: All emoji tests passed!');

} catch (e) {
  console.error('FAILURE:', e);
  process.exit(1);
}
