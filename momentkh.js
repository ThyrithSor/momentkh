/**
 * be : Buddhist Era
 * ad : Anno Domini
 *
 * The following calculation is from "Pratitin Soryakkatik-Chankatik 1900-1999" by Mr. Roath Kim Soeun.
 * It illustrates how to determine if a given year is a normal year, leap-day year, or leap-month year.
 * The calculation can use different eras including Buddhist Era, Jola Sakaraj but not AD.
 * Here we choose to use only Buddhist Era.
 *
 * @credit http://www.cam-cc.org
 */

const Moment = require('moment');
const config = require('./locale/km');

const LunarMonths = {};
"មិគសិរ_បុស្ស_មាឃ_ផល្គុន_ចេត្រ_ពិសាខ_ជេស្ឋ_អាសាឍ_ស្រាពណ៍_ភទ្របទ_អស្សុជ_កក្ដិក_បឋមាសាឍ_ទុតិយាសាឍ".split("_").forEach((month, index) => {
  LunarMonths[month] = index
});

const SolarMonth = {}
'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_').forEach((month, index) => {
  SolarMonth[month] = index
});

const AnimalYear = {}
"ជូត_ឆ្លូវ_ខាល_ថោះ_រោង_ម្សាញ់_មមីរ_មមែ_វក_រកា_ច_កុរ".split("_").forEach((year, index) => {
  AnimalYear[year] = index
});

const EraYear = {}
"សំរឹទ្ធិស័ក_ឯកស័ក_ទោស័ក_ត្រីស័ក_ចត្វាស័ក_បញ្ចស័ក_ឆស័ក_សប្តស័ក_អដ្ឋស័ក_នព្វស័ក".split("_").forEach((year, index) => {
  EraYear[year] = index
});

const MoonStatus = {}
"កើត_រោច".split("_").forEach((moon, index) => {
  MoonStatus[moon] = index
});

;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      global.momentkh = factory()
}(this, (function () {
  'use strict';

  /**
   * Bodithey: បូតិថី
   * Bodithey determines if a given be_year is a leap-month year. Given year target year in Buddhist Era
   * @return Number (0-29)
   */
  function get_bodithey(be_year) {
    let ahk = get_aharkun(be_year);
    let avml = Math.floor((11 * ahk + 25) / 692);
    let m = avml + ahk + 29;
    return (m % 30);
  }

  /**
   * Avoman: អាវមាន
   * Avoman determines if a given year is a leap-day year. Given a year in Buddhist Era as denoted as ad_year
   * @param year (0 - 691)
   */
  function get_avoman(be_year) {
    let ahk = get_aharkun(be_year);
    let avm = (11 * ahk + 25) % 692;
    return avm;
  }

  /**
   * Aharkun: អាហារគុណ ឬ ហារគុណ
   * Aharkun is used for Avoman and Bodithey calculation below. Given ad_year as a target year in Buddhist Era
   * @param ad_year
   * @returns {number}
   */
  function get_aharkun(be_year) {
    let t = be_year * 292207 + 499;
    let ahk = Math.floor(t / 800) + 4;
    return ahk;
  }

  /**
   * Kromathupul
   * @param be_year
   * @returns {number} (1-800)
   */
  function kromthupul(be_year) {
    let akh = get_akhakun_mod(be_year);
    let krom = 800 - akh;
    return krom;
  }

  /**
   * is_khmer_solar_leap
   * @param be_year
   * @returns {number}
   */
  function is_khmer_solar_leap(be_year) {
    let krom = kromthupul(be_year);
    if (krom <= 207)
      return 1;
    else
      return 0;
  }

  /**
   * get_akhakun_mod
   * @param be_year
   * @returns {number}
   */
  function get_akhakun_mod(be_year) {
    let t = be_year * 292207 + 499;
    let ahkmod = t % 800;
    return ahkmod;
  }

  /**
   * * Regular if year has 30 day
   * * leap month if year has 13 months
   * * leap day if Jesth month of the year has 1 extra day
   * * leap day and month: both of them
   * @param $ad_year
   * @returns {number} return 0:regular, 1:leap month, 2:leap day, 3:leap day and month
   */
  function get_bodithey_leap(be_year) {
    let result = 0;
    let a = get_avoman(be_year);
    let b = get_bodithey(be_year);

    // check bodithey leap month
    let bodithey_leap = 0;
    if (b >= 25 || b <= 5) {
      bodithey_leap = 1;
    }
    // check for avoman leap-day based on gregorian leap
    let avoman_leap = 0;
    if (is_khmer_solar_leap(be_year)) {
      if (a <= 126)
        avoman_leap = 1;
    } else {
      if (a <= 137) {
        // check for avoman case 137/0, 137 must be normal year (p.26)
        if (get_avoman(be_year + 1) == 0) {
          avoman_leap = 0;
        } else {
          avoman_leap = 1;
        }
      }
    }

    // case of 25/5 consecutively
    // only bodithey 5 can be leap-month, so set bodithey 25 to none
    if (b == 25) {
      let next_b = get_bodithey(be_year + 1);
      if (next_b == 5) {
        bodithey_leap = 0;
      }
    }

    // case of 24/6 consecutively, 24 must be leap-month
    if (b == 24) {
      let next_b = get_bodithey(be_year + 1);
      if (next_b == 6) {
        bodithey_leap = 1;
      }
    }

    // format leap result (0:regular, 1:month, 2:day, 3:both)
    if (bodithey_leap == 1 && avoman_leap == 1) {
      result = 3;
    } else if (bodithey_leap == 1) {
      result = 1;
    } else if (avoman_leap == 1) {
      result = 2;
    } else {
      result = 0;
    }

    return result;
  }

  // return 0:regular, 1:leap month, 2:leap day (no leap month and day together)
  /**
   * bodithey leap can be both leap-day and leap-month but following the khmer calendar rule, they can't be together on the same year, so leap day must be delayed to next year
   * @param be_year
   * @returns {number}
   */
  function get_protetin_leap(be_year) {
    let b = get_bodithey_leap(be_year);
    if (b == 3) {
      return 1;
    }
    if (b == 2 || b == 1) {
      return b;
    }
    // case of previous year is 3
    if (get_bodithey_leap(be_year - 1) == 3) {
      return 2;
    }
    // normal case
    return 0;
  }

  /**
   * Maximum number of day in Khmer Month
   * @param be_month
   * @param be_year
   * @returns {number}
   */
  function get_numofday_in_kmonth(be_month, be_year) {
    if (be_month === LunarMonths.ជេស្ឋ && is_khmer_leap_day(be_year)) {
      return 30;
    }
    if (be_month === LunarMonths.បឋមាសាឍ || be_month === LunarMonths.ទុតិយាសាឍ) {
      return 30;
    }
    // មិគសិរ : 29 , បុស្ស : 30 , មាឃ : 29 .. 30 .. 29 ..30 .....
    return be_month % 2 === 0 ? 29 : 30;
  }

  /**
   * Get number of day in Khmer year
   * @param be_year
   * @returns {number}
   */
  function get_numofday_in_kyear(be_year) {
    if (is_khmer_leap_month(be_year)) {
      return 384;
    } else if (is_khmer_leap_day(be_year)) {
      return 355;
    } else {
      return 354;
    }
  }

  /**
   * Get number of day in Gregorian year
   * @param ad_year
   * @returns {number}
   */
  function get_numofday_in_gyear(ad_year) {
    if (is_gregorian_leap(ad_year)) {
      return 366;
    } else {
      return 365;
    }
  }

  /**
   * A year with an extra month is called Adhikameas (អធិកមាស). This year has 384 days.
   * @param be_year
   * @returns {boolean}
   */
  function is_khmer_leap_month(be_year) {
    return get_protetin_leap(be_year) === 1
  }

  /**
   * A year with an extra day is called Chhantrea Thimeas (ចន្ទ្រាធិមាស) or Adhikavereak (អធិកវារៈ). This year has 355 days.
   * @param be_year
   * @returns {boolean}
   */
  function is_khmer_leap_day(be_year) {
    return get_protetin_leap(be_year) === 2
  }

  function is_gregorian_leap(ad_year) {
    if (ad_year % 4 === 0 && ad_year % 100 !== 0 || ad_year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Buddhist Era
   * @param moment
   * @returns {*}
   */
  function get_be_year(moment) {
    if (parseInt(moment.format('M')) < SolarMonth.មេសា + 1) {
      return parseInt(moment.format('YYYY')) + 543;
    } else {
      return parseInt(moment.format('YYYY')) + 544;
    }
  }

  /**
   * Moha Sakaraj
   * @param ad_year
   * @returns {number}
   */
  function get_ms_year(ad_year) {
    return ad_year - 77;
  }

  /**
   * Jolak Sakaraj
   * @param be_year
   * @returns {number}
   */
  function get_js_year(be_year) {
    return be_year - 1182;
  }

  /**
   * ១កើត ៤កើត ២រោច ១៤រោច ...
   * @param day 1-30
   * @returns {{count: number, moonStatus: number}}
   */
  function get_khmer_lunar_day(day) {
    return {
      count: (day % 15) + 1,
      moonStatus: day > 14 ? MoonStatus.រោច : MoonStatus.កើត
    }
  }

  function get_animal_year(be_year) {
    return (be_year + 4) % 12
  }

  function formatKhmerDate({day, month, moment}, format) {
    if (format === null || format === undefined) {
      // Default date format
      let dayOfWeek = moment.day();
      let moonDay = get_khmer_lunar_day(day);
      let beYear = get_be_year(moment);
      let animalYear = get_animal_year(beYear);
      let eraYear = get_js_year(beYear) % 10;
      return config.postformat(`ថ្ងៃ${config.weekdays[dayOfWeek]} ${moonDay.count}${config.moonStatus[moonDay.moonStatus]} ខែ${config.lunarMonths[month]} ឆ្នាំ${config.animalYear[animalYear]} ${config.eraYear[eraYear]} ពុទ្ធសករាជ ${beYear}`);
    } else if (typeof format === 'string') {
      // Follow the format
      let formatRule = {
        'W': function () { // Day of week
          let dayOfWeek = moment.day();
          return config.weekdays[dayOfWeek]
        },
        'w': function () { // Day of week
          let dayOfWeek = moment.day();
          return config.weekdaysShort[dayOfWeek]
        },
        'd': function () { // no determine digit
          let moonDay = get_khmer_lunar_day(day);
          return moonDay.count;
        },
        'D': function () { // minimum 2 digits
          let moonDay = get_khmer_lunar_day(day);
          return ('' + moonDay.count).length === 1 ? '0' + moonDay.count : moonDay.count;
        },
        'n': function () {
          let moonDay = get_khmer_lunar_day(day);
          return config.moonStatusShort[moonDay.moonStatus]
        },
        'N': function () {
          let moonDay = get_khmer_lunar_day(day);
          return config.moonStatus[moonDay.moonStatus]
        },
        'o': function () {
          return config.moonDays[day];
        },
        'm': function () {
          return config.lunarMonths[month];
        },
        'a': function () {
          let beYear = get_be_year(moment);
          let animalYear = get_animal_year(beYear);
          return config.animalYear[animalYear];
        },
        'e': function () {
          let beYear = get_be_year(moment);
          let eraYear = get_js_year(beYear) % 10;
          return config.eraYear[eraYear];
        },
        'b': function () {
          return get_be_year(moment);
        },
        'c': function () {
          return moment.format('YYYY');
        },
        'j': function () {
          let beYear = get_be_year(moment);
          return get_js_year(beYear);
        }
      }

      return config.postformat(format.replace(/[WwdDnNomaebcj]/g, function (matched) {
        return formatRule[matched]();
      }));

    } else if (typeof format === 'object') {
      try {
        // Return object by filling the need
      } catch (e) {
        Error(format + ' is not a valid date format.');
      }
    }
    return null;
  }

  /**
   * Read Khmer lunar date
   * @param params : String (2) (input and format)
   * @or @param Object {ថ្ងៃ: ..., កើត: ..., ខែ: ..., ពស: ...}
   * @return Moment
   */
  function readLunarDate(...params) {
    console.log('hi')
  }

  /**
   * Return khmer lunar date
   * @param String (wanted format)
   * @return String
   * @or @param Array (wanted field) [ថ្ងៃ ថ្ងៃទី កើត/រោច ខែចន្ទគតិ ខែសុរិយគតិ ឆ្នាំសត្វ ឆ្នាំស័ក ពស គស ចស មស សីល]
   * @return Object
   */
  function toLunarDate(format) {

    // let target = this.clone()
    //
    // let month = parseInt(target.format('M'));
    // let day   = parseInt(target.format('D'));
    // let year  = parseInt(target.format('YYYY'));

    /**
     * Epoch Date: January 1, 1900
     */
    let epoch_moment = Moment('1/1/1900', 'D/M/YYYY')
    let khmer_month = LunarMonths.បុស្ស;
    let khmer_day = 0; // 0 - 29 ១កើត ... ១៥កើត ១រោច ...១៤រោច (១៥រោច)

    let target = this.clone()

    let differentFromEpoch = target.diff(epoch_moment)

    // Find nearest year epoch
    if (differentFromEpoch > 0) {
      while (Moment.duration(target.diff(epoch_moment), 'milliseconds').asDays() > get_numofday_in_kyear(get_be_year(epoch_moment.clone().add(1, 'year')))) {
        epoch_moment.add(get_numofday_in_kyear(get_be_year(epoch_moment.clone().add(1, 'year'))), 'day')
      }
    } else {
      do {
        epoch_moment.subtract(get_numofday_in_kyear(get_be_year(epoch_moment)), 'day')
      } while (Moment.duration(epoch_moment.diff(target), 'milliseconds').asDays() > 0)
    }

    // Move epoch month
    while (Moment.duration(target.diff(epoch_moment), 'milliseconds').asDays() > get_numofday_in_kmonth(khmer_month, get_be_year(epoch_moment))) {
      epoch_moment.add(get_numofday_in_kmonth(khmer_month, get_be_year(epoch_moment)), 'day');
      switch (khmer_month) {
        case LunarMonths.មិគសិរ:
          khmer_month = LunarMonths.បុស្ស;
          break;
        case LunarMonths.បុស្ស:
          khmer_month = LunarMonths.មាឃ;
          break;
        case LunarMonths.មាឃ:
          khmer_month = LunarMonths.ផល្គុន;
          break;
        case LunarMonths.ផល្គុន:
          khmer_month = LunarMonths.ចេត្រ;
          break;
        case LunarMonths.ចេត្រ:
          khmer_month = LunarMonths.ពិសាខ;
          break;
        case LunarMonths.ពិសាខ:
          khmer_month = LunarMonths.ជេស្ឋ;
          break;
        case LunarMonths.ជេស្ឋ: {
          if (is_khmer_leap_month(get_be_year(epoch_moment))) {
            khmer_month = LunarMonths.បឋមាសាឍ
          } else {
            khmer_month = LunarMonths.អាសាឍ
          }
          break;
        }
        case LunarMonths.អាសាឍ:
          khmer_month = LunarMonths.ស្រាពណ៍;
          break;
        case LunarMonths.ស្រាពណ៍:
          khmer_month = LunarMonths.ភទ្របទ;
          break;
        case LunarMonths.ភទ្របទ:
          khmer_month = LunarMonths.អស្សុជ;
          break;
        case LunarMonths.អស្សុជ:
          khmer_month = LunarMonths.កក្ដិក;
          break;
        case LunarMonths.កក្ដិក:
          khmer_month = LunarMonths.មិគសិរ;
          break;
        case LunarMonths.បឋមាសាឍ:
          khmer_month = LunarMonths.ទុតិយាសាឍ;
          break;
        case LunarMonths.ទុតិយាសាឍ:
          khmer_month = LunarMonths.ស្រាពណ៍;
          break;
        default:
          throw Error('Plugin is facing wrong calculation (Invalid month)');
      }
    }

    khmer_day += Math.floor(Moment.duration(target.diff(epoch_moment), 'milliseconds').asDays());

    epoch_moment.add(Moment.duration(target.diff(epoch_moment), 'milliseconds').asDays(), 'day');

    return formatKhmerDate({
      day: khmer_day,
      month: khmer_month,
      moment: epoch_moment
    }, format)
  }

  Moment.readLunarDate = readLunarDate;

  Moment.fn.toLunarDate = toLunarDate;

  return Moment;
})));
