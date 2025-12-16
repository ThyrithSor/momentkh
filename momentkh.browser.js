// Browser-compatible wrapper for MomentKH
// This file wraps the CommonJS module for browser use

(function(global) {
  'use strict';
  
  // Create a minimal module system for the browser
  var module = { exports: {} };
  var exports = module.exports;
  
  // Include the compiled momentkh.js code
  // (The actual code will be injected here during build)
  
  // For now, we'll load it via a separate script tag and expose it
  // After the main momentkh.js loads, expose it globally
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function() { return module.exports.momentkh || module.exports; });
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    // Already set
  } else {
    // Browser global
    global.momentkh = module.exports.momentkh || module.exports;
  }
  
})(typeof window !== 'undefined' ? window : this);
