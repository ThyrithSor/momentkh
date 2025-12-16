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
    root.momentkh = factory().momentkh;
    root.MoonPhase = factory().MoonPhase;
    root.MonthIndex = factory().MonthIndex;
    root.AnimalYear = factory().AnimalYear;
    root.EraYear = factory().EraYear;
    root.DayOfWeek = factory().DayOfWeek;
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
