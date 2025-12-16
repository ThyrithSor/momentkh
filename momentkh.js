// Re-export from compiled TypeScript
const dist = require('./dist/momentkh');

// Export the default (momentkh object) as the main export
module.exports = dist.default;

// Also export named exports for those who want to use them
module.exports.MoonPhase = dist.MoonPhase;
module.exports.MonthIndex = dist.MonthIndex;
module.exports.AnimalYear = dist.AnimalYear;
module.exports.EraYear = dist.EraYear;
module.exports.DayOfWeek = dist.DayOfWeek;
module.exports.momentkh = dist.momentkh;
