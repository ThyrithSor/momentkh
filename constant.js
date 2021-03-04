;(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory()
  } else {
    if (typeof define === 'function' && define.amd) {
      define(factory)
    } else {
      global.momentkhConstant = factory()
    }
  }
}(this, (function () {
  'use strict';

  const LunarMonths = {};
  "មិគសិរ_បុស្ស_មាឃ_ផល្គុន_ចេត្រ_ពិសាខ_ជេស្ឋ_អាសាឍ_ស្រាពណ៍_ភទ្របទ_អស្សុជ_កក្ដិក_បឋមាសាឍ_ទុតិយាសាឍ".split("_").forEach((month, index) => {
    LunarMonths[month] = index
  });

  const SolarMonth = {};
  'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_').forEach((month, index) => {
    SolarMonth[month] = index
  });

  const AnimalYear = {};
  "ជូត_ឆ្លូវ_ខាល_ថោះ_រោង_ម្សាញ់_មមីរ_មមែ_វក_រកា_ច_កុរ".split("_").forEach((year, index) => {
    AnimalYear[year] = index
  });

  const EraYear = {};
  "សំរឹទ្ធិស័ក_ឯកស័ក_ទោស័ក_ត្រីស័ក_ចត្វាស័ក_បញ្ចស័ក_ឆស័ក_សប្តស័ក_អដ្ឋស័ក_នព្វស័ក".split("_").forEach((year, index) => {
    EraYear[year] = index
  });

  const MoonStatus = {};
  "កើត_រោច".split("_").forEach((moon, index) => {
    MoonStatus[moon] = index
  });

  // ឆ្នាំលើកលែងមួយចំនួនដែលខុសពីការគណនា
  const khNewYearMoments = {
    '1879' : '12-04-1879 11:36',
    '1897' : '13-04-1897 02:00',
    '2011' : '14-04-2011 13:12',
    '2012' : '14-04-2012 19:11',
    '2013' : '14-04-2013 02:12',
    '2014' : '14-04-2014 08:07',
    '2015' : '14-04-2015 14:02',
  }

  return {
    LunarMonths,
    SolarMonth,
    AnimalYear,
    EraYear,
    MoonStatus,
    khNewYearMoments,
  }
})));
