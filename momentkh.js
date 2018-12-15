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

const LunarMonths = {
  'មិគសិរ': 1,
  'បុស្ស': 2,
  'មាឃ': 3,
  'ផល្គុន': 4,
  'ចេត្រ': 5,
  'ពិសាខ': 6,
  'ជេស្ឋ': 7,
  'អាសាឍ': 8,
  'ស្រាពណ៍': 9,
  'ភទ្របទ': 10,
  'អស្សុជ': 11,
  'កក្ដិក': 12,
  'បឋមាសាឍ': 81,
  'ទុតិយាសាឍ': 82
};

const SolarMonth = {
  'មករា': 1,
  'កុម្ភៈ': 2,
  'មីនា': 3,
  'មេសា': 4,
  'ឧសភា': 5,
  'មិថុនា': 6,
  'កក្កដា': 7,
  'សីហា': 8,
  'កញ្ញា': 9,
  'តុលា': 10,
  'វិច្ឆិកា': 11,
  'ធ្នូ': 12,
};

const AnimalYear = {
  'ជូត': 1,
  'ឆ្លូវ': 2,
  'ខាល': 3,
  'ថោះ': 4,
  'រោង': 5,
  'ម្សាញ់': 6,
  'មមីរ': 7,
  'មមែ': 8,
  'វក': 9,
  'រកា': 10,
  'ច': 11,
  'កុរ': 12,
}

const SakYear = {
  'ឯកស័ក': 1,
  'ទោស័ក': 2,
  'ត្រីស័ក': 3,
  'ចត្វាស័ក': 4,
  'បញ្ចស័ក': 5,
  'ឆស័ក': 6,
  'សប្តស័ក': 7,
  'អដ្ឋស័ក': 8,
  'នព្វស័ក': 9,
  'សំរឹទ្ធិស័ក': 0
}

const MoonStatus = {
  'កើត': 0,
  'រោច': 1
}

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
   * Kromthupul: ក្រមធុពល
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
   * @param year
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
   * ១កើត ៤កើត ២រោច ១៤រោច ...
   * @param day 1-30
   * @returns {{count: number, moonStatus: number}}
   */
  function get_khmer_lunar_day(day) {
    return {
      count: ((day - 1) % 15) + 1,
      moonStatus: day > 15 ? MoonStatus.រោច : MoonStatus.កើត
    }
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
    return 30 - (be_month % 2);
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
    if (parseInt(moment.format('M')) < SolarMonth.មេសា) {
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
  function toLunarDate() {

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
    let khmer_day = 1; // 1 - 30 ១កើត ... ១៥កើត ១រោច ...១៤រោច (១៥រោច)

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
      epoch_moment.add(get_numofday_in_kmonth(khmer_month, get_be_year(epoch_moment)), 'day')
      switch (khmer_month) {
        case LunarMonths.មិគសិរ: khmer_month = LunarMonths.បុស្ស; break;
        case LunarMonths.បុស្ស: khmer_month = LunarMonths.មាឃ; break;
        case LunarMonths.មាឃ: khmer_month = LunarMonths.ផល្គុន; break;
        case LunarMonths.ផល្គុន: khmer_month = LunarMonths.ចេត្រ; break;
        case LunarMonths.ចេត្រ: khmer_month = LunarMonths.ពិសាខ; break;
        case LunarMonths.ពិសាខ: khmer_month = LunarMonths.ជេស្ឋ; break;
        case LunarMonths.ជេស្ឋ: {
          if (is_khmer_leap_month(get_be_year(epoch_moment))) {
            khmer_month = LunarMonths.បឋមាសាឍ
          } else {
            khmer_month = LunarMonths.អាសាឍ
          }
          break;
        }
        case LunarMonths.អាសាឍ: khmer_month = LunarMonths.ស្រាពណ៍; break;
        case LunarMonths.ស្រាពណ៍: khmer_month = LunarMonths.ភទ្របទ; break;
        case LunarMonths.ភទ្របទ: khmer_month = LunarMonths.អស្សុជ; break;
        case LunarMonths.អស្សុជ: khmer_month = LunarMonths.កក្ដិក; break;
        case LunarMonths.កក្ដិក: khmer_month = LunarMonths.មិគសិរ; break;
        case LunarMonths.បឋមាសាឍ: khmer_month = LunarMonths.ទុតិយាសាឍ; break;
        case LunarMonths.ទុតិយាសាឍ: khmer_month = LunarMonths.ស្រាពណ៍; break;
        default: console.log('error', khmer_month)
      }
    }

    khmer_day = Moment.duration(target.diff(epoch_moment), 'milliseconds').asDays() + 1

    epoch_moment.add(Moment.duration(target.diff(epoch_moment), 'milliseconds').asDays(), 'day')

    return this.localeData();
    return {
      day: khmer_day,
      month: khmer_month,
      year: get_be_year(epoch_moment),
    }
  }

  Moment.readLunarDate = readLunarDate;

  Moment.fn.toLunarDate = toLunarDate;

  return Moment;
})));
