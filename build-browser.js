/**
 * Build script to create browser-compatible UMD bundle
 * Wraps the CommonJS module for browser use
 */

const fs = require('fs');
const path = require('path');

// Read the compiled CommonJS module
const cjsCode = fs.readFileSync(path.join(__dirname, 'dist', 'momentkh.js'), 'utf8');

// Create UMD wrapper
const umdBundle = `(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    var exp = factory();
    root.momentkh = exp;
    root.MoonPhase = exp.MoonPhase;
    root.MonthIndex = exp.MonthIndex;
    root.AnimalYear = exp.AnimalYear;
    root.AnimalYearEmojis = exp.AnimalYearEmojis;
    root.Sak = exp.Sak;
    root.DayOfWeek = exp.DayOfWeek;
  }
}(typeof self !== 'undefined' ? self : this, function () {
  // CommonJS module code
  var module = { exports: {} };
  var exports = module.exports;

  ${cjsCode.replace(/\\"use strict\\";?\\n?/, '')}

  return module.exports;
}));
`;

// Write browser bundle
fs.writeFileSync(path.join(__dirname, 'momentkh.js'), umdBundle, 'utf8');

console.log('✓ Browser bundle created: momentkh.js');
