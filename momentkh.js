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
 * @ref http://www.dahlina.com/education/khmer_new_year_time.html?fbclid=IwAR3lVUvvd4bM6QD635djBpgWt_VDE9KFf4zfqK02RiagIVvRtDMkY2TNWMo
 */

// const Moment = require('moment');
function getLocaleConfig() {
  if (typeof require === 'function') {
    return require('./locale/km')
  } else {
    if (!this.momentkhLocales) {
      throw "Please import [MOMENTKH]/locale/km.js to your project"
    } else {
      return this.momentkhLocales['km']
    }
  }
}

let config = getLocaleConfig();

let constant, LunarMonths, SolarMonth, MoonStatus, khNewYearMoments;
if (typeof require === 'function') {
  constant = require('./constant')
} else {
  if (!this.momentkhConstant)  {
    throw "Please import [MOMENTKH]/constant.js to your project"
  } else {
    constant = this.momentkhConstant
  }
}
LunarMonths = constant.LunarMonths
SolarMonth = constant.SolarMonth
MoonStatus = constant.MoonStatus
khNewYearMoments = constant.khNewYearMoments

;(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory
  } else {
    if (typeof define === 'function' && define.amd) {
      define(factory)
    } else {
      global.momentkh = factory
    }
  }
}(this, (function (Moment) {
  'use strict';

  Moment.khNewYearMoments = khNewYearMoments

  /**
   * Bodithey: បូតិថី
   * Bodithey determines if a given beYear is a leap-month year. Given year target year in Buddhist Era
   * @return Number (0-29)
   */
  function getBodithey(beYear) {
    let ahk = getAharkun(beYear);
    let avml = Math.floor((11 * ahk + 25) / 692);
    let m = avml + ahk + 29;
    return (m % 30);
  }

  /**
   * Avoman: អាវមាន
   * Avoman determines if a given year is a leap-day year. Given a year in Buddhist Era as denoted as adYear
   * @param beYear (0 - 691)
   */
  function getAvoman(beYear) {
    let ahk = getAharkun(beYear);
    let avm = (11 * ahk + 25) % 692;
    return avm;
  }

  /**
   * Aharkun: អាហារគុណ ឬ ហារគុណ
   * Aharkun is used for Avoman and Bodithey calculation below. Given adYear as a target year in Buddhist Era
   * @param beYear
   * @returns {number}
   */
  function getAharkun(beYear) {
    let t = beYear * 292207 + 499;
    let ahk = Math.floor(t / 800) + 4;
    return ahk;
  }

  /**
   * Kromathupul
   * @param beYear
   * @returns {number} (1-800)
   */
  function kromthupul(beYear) {
    let ah = getAharkunMod(beYear);
    let krom = 800 - ah;
    return krom;
  }

  /**
   * isKhmerSolarLeap
   * @param beYear
   * @returns {number}
   */
  function isKhmerSolarLeap(beYear) {
    let krom = kromthupul(beYear);
    if (krom <= 207)
      return 1;
    else
      return 0;
  }

  /**
   * getAkhakunMod
   * @param beYear
   * @returns {number}
   */
  function getAharkunMod(beYear) {
    let t = beYear * 292207 + 499;
    let ahkmod = t % 800;
    return ahkmod;
  }

  /**
   * * Regular if year has 30 day
   * * leap month if year has 13 months
   * * leap day if Jesth month of the year has 1 extra day
   * * leap day and month: both of them
   * @param beYear
   * @returns {number} return 0:regular, 1:leap month, 2:leap day, 3:leap day and month
   */
  function getBoditheyLeap(beYear) {
    let result = 0;
    let avoman = getAvoman(beYear);
    let bodithey = getBodithey(beYear);

    // check bodithey leap month
    let boditheyLeap = 0;
    if (bodithey >= 25 || bodithey <= 5) {
      boditheyLeap = 1;
    }
    // check for avoman leap-day based on gregorian leap
    let avomanLeap = 0;
    if (isKhmerSolarLeap(beYear)) {
      if (avoman <= 126)
        avomanLeap = 1;
    } else {
      if (avoman <= 137) {
        // check for avoman case 137/0, 137 must be normal year (p.26)
        if (getAvoman(beYear + 1) === 0) {
          avomanLeap = 0;
        } else {
          avomanLeap = 1;
        }
      }
    }

    // case of 25/5 consecutively
    // only bodithey 5 can be leap-month, so set bodithey 25 to none
    if (bodithey === 25) {
      let nextBodithey = getBodithey(beYear + 1);
      if (nextBodithey === 5) {
        boditheyLeap = 0;
      }
    }

    // case of 24/6 consecutively, 24 must be leap-month
    if (bodithey == 24) {
      let nextBodithey = getBodithey(beYear + 1);
      if (nextBodithey == 6) {
        boditheyLeap = 1;
      }
    }

    // format leap result (0:regular, 1:month, 2:day, 3:both)
    if (boditheyLeap === 1 && avomanLeap === 1) {
      result = 3;
    } else if (boditheyLeap === 1) {
      result = 1;
    } else if (avomanLeap === 1) {
      result = 2;
    } else {
      result = 0;
    }

    return result;
  }

  // return 0:regular, 1:leap month, 2:leap day (no leap month and day together)
  /**
   * bodithey leap can be both leap-day and leap-month but following the khmer calendar rule, they can't be together on the same year, so leap day must be delayed to next year
   * @param beYear
   * @returns {number}
   */
  function getProtetinLeap(beYear) {
    let b = getBoditheyLeap(beYear);
    if (b === 3) {
      return 1;
    }
    if (b === 2 || b === 1) {
      return b;
    }
    // case of previous year is 3
    if (getBoditheyLeap(beYear - 1) === 3) {
      return 2;
    }
    // normal case
    return 0;
  }

  /**
   * Maximum number of day in Khmer Month
   * @param beMonth
   * @param beYear
   * @returns {number}
   */
  function getNumberOfDayInKhmerMonth(beMonth, beYear) {
    if (beMonth === LunarMonths['ជេស្ឋ'] && isKhmerLeapDay(beYear)) {
      return 30;
    }
    if (beMonth === LunarMonths['បឋមាសាឍ'] || beMonth === LunarMonths['ទុតិយាសាឍ']) {
      return 30;
    }
    // មិគសិរ : 29 , បុស្ស : 30 , មាឃ : 29 .. 30 .. 29 ..30 .....
    return beMonth % 2 === 0 ? 29 : 30;
  }

  /**
   * Get number of day in Khmer year
   * @param beYear
   * @returns {number}
   */
  function getNumerOfDayInKhmerYear(beYear) {
    if (isKhmerLeapMonth(beYear)) {
      return 384;
    } else if (isKhmerLeapDay(beYear)) {
      return 355;
    } else {
      return 354;
    }
  }

  /**
   * Get number of day in Gregorian year
   * @param adYear
   * @returns {number}
   */
  function getNumberOfDayInGregorianYear(adYear) {
    if (isGregorianLeap(adYear)) {
      return 366;
    } else {
      return 365;
    }
  }

  /**
   * A year with an extra month is called Adhikameas (អធិកមាស). This year has 384 days.
   * @param beYear
   * @returns {boolean}
   */
  function isKhmerLeapMonth(beYear) {
    return getProtetinLeap(beYear) === 1
  }

  /**
   * A year with an extra day is called Chhantrea Thimeas (ចន្ទ្រាធិមាស) or Adhikavereak (អធិកវារៈ). This year has 355 days.
   * @param beYear
   * @returns {boolean}
   */
  function isKhmerLeapDay(beYear) {
    return getProtetinLeap(beYear) === 2
  }

  /**
   * Gregorian Leap
   * @param adYear
   * @returns {boolean}
   */
  function isGregorianLeap(adYear) {
    if (adYear % 4 === 0 && adYear % 100 !== 0 || adYear % 400 === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * រកថ្ងៃវិសាខបូជា
   * ថ្ងៃដាច់ឆ្នាំពុទ្ធសករាជ
   */
  function getVisakhaBochea(gregorianYear) {
    var date = Moment('1/1/' + gregorianYear, 'D/M/YYYY')
    for (var i = 0; i < 365; i++) {
      var lunarDate = findLunarDate(date);
      if (lunarDate.month == LunarMonths['ពិសាខ'] && lunarDate.day == 14) {
        return date
      }
      date.add(1, 'day')
    }
    throw 'Cannot find Visakhabochea day. Please report this bug.';
  }

  /**
   * Buddhist Era
   * ថ្ងៃឆ្លងឆ្នាំ គឺ ១ រោច ខែពិសាខ
   * @ref http://news.sabay.com.kh/article/1039620
   * @summary: ឯកឧត្តម សេង សុមុនី អ្នកនាំពាក្យ​ក្រ​សួង​ធម្មការ និង​សាសនា​ឲ្យ​Sabay ដឹង​ថា​នៅ​ប្រ​ទេស​កម្ពុជា​ការ​ឆ្លង​ចូល​ពុទ្ធសករាជថ្មី​គឺ​កំណត់​យក​នៅ​ថ្ងៃព្រះ​ពុទ្ធយាងចូល​និព្វាន ពោល​គឺ​នៅ​ថ្ងៃ​១រោច ខែពិសាខ។
   * @param moment
   * @returns {*}
   */
  function getBEYear(moment) {
    if (moment.diff(getVisakhaBochea(moment.year())) > 0) {
      return moment.year() + 544;
    } else {
      return moment.year() + 543;
    }
  }

  /**
   * Due to recursive problem, I need to calculate the BE based on new year's day
   * This won't be displayed on final result, it is used to find number of day in year,
   * It won't affect the result because on ខែចេត្រ និង ខែពិសាខ, number of days is the same every year
   * ពីព្រោះចូលឆ្នាំតែងតែចំខែចេត្រ​ ឬ ពិសាខ
   * @param moment
   * @returns {*}
   */
  function getMaybeBEYear(moment) {
    if (moment.month() + 1 <= SolarMonth['មេសា'] + 1) {
      return moment.year() + 543;
    } else {
      return moment.year() + 544;
    }
  }

  /**
   * Moha Sakaraj
   * @param adYear
   * @returns {number}
   */
  function getMohaSakarajYear(adYear) {
    return adYear - 77;
  }

  /**
   * Jolak Sakaraj
   * @param beYear
   * @returns {number}
   */
  function getJolakSakarajYear(moment) {
    let gregorianYear = moment.year();
    let newYearMoment = getKhNewYearMoment(gregorianYear);
    if (moment.diff(newYearMoment) < 0) {
      return gregorianYear + 543 - 1182
    } else {
      return gregorianYear + 544 - 1182
    }
  }

  /**
   * ១កើត ៤កើត ២រោច ១៤រោច ...
   * @param day 1-30
   * @returns {{count: number, moonStatus: number}}
   */
  function getKhmerLunarDay(day) {
    return {
      count: (day % 15) + 1,
      moonStatus: day > 14 ? MoonStatus['រោច'] : MoonStatus['កើត']
    }
  }

  /**
   * Turn be year to animal year
   * @param beYear
   * @returns {number}
   */
  function getAnimalYear(moment) {
    let gregorianYear = moment.year();
    let newYearMoment = getKhNewYearMoment(gregorianYear);
    if (moment.diff(newYearMoment) < 0) {
      return (gregorianYear + 543 + 4) % 12
    } else {
      return (gregorianYear + 544 + 4) % 12
    }
  }

  /**
   * Khmer date format handler
   * @param day
   * @param month
   * @param moment
   * @param format
   * @returns {*}
   */
  function formatKhmerDate({day, month, moment}, format) {
    if (format === null || format === undefined) {
      // Default date format
      let dayOfWeek = moment.day();
      let moonDay = getKhmerLunarDay(day);
      let beYear = getBEYear(moment);
      let animalYear = getAnimalYear(moment);
      let eraYear = getJolakSakarajYear(moment) % 10;
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
          let moonDay = getKhmerLunarDay(day);
          return moonDay.count;
        },
        'D': function () { // minimum 2 digits
          let moonDay = getKhmerLunarDay(day);
          return ('' + moonDay.count).length === 1 ? '0' + moonDay.count : moonDay.count;
        },
        'n': function () {
          let moonDay = getKhmerLunarDay(day);
          return config.moonStatusShort[moonDay.moonStatus]
        },
        'N': function () {
          let moonDay = getKhmerLunarDay(day);
          return config.moonStatus[moonDay.moonStatus]
        },
        'o': function () {
          return config.moonDays[day];
        },
        'm': function () {
          return config.lunarMonths[month];
        },
        'M': function () {
          return config.months[moment.month()];
        },
        'a': function () {
          let animalYear = getAnimalYear(moment);
          return config.animalYear[animalYear];
        },
        'e': function () {
          let eraYear = getJolakSakarajYear(moment) % 10;
          return config.eraYear[eraYear];
        },
        'b': function () {
          return getBEYear(moment);
        },
        'c': function () {
          return moment.year();
        },
        'j': function () {
          return getJolakSakarajYear(moment);
        }
      }

      return config.postformat(format.replace(new RegExp(Object.keys(formatRule).join('|'), 'g'), function (matched) {
        return formatRule[matched]();
      }));

    }
    throw Error(format + ' is not a valid date format.');
  }

  /**
   * Read Khmer lunar date
   * @param params : String (2) (input and format)
   * @or @param Object {ថ្ងៃ: ..., កើត: ..., ខែ: ..., ពស: ...}
   * @return Moment
   */
  function readLunarDate(...params) {
    console.log('Now working yet')
  }

  /**
   * Next month of the month
   */
  function nextMonthOf(khmerMonth, BEYear) {
    switch (khmerMonth) {
    case LunarMonths['មិគសិរ']:
      return LunarMonths['បុស្ស'];
    case LunarMonths['បុស្ស']:
      return LunarMonths['មាឃ'];
    case LunarMonths['មាឃ']:
      return LunarMonths['ផល្គុន'];
    case LunarMonths['ផល្គុន']:
      return LunarMonths['ចេត្រ'];
    case LunarMonths['ចេត្រ']:
      return LunarMonths['ពិសាខ'];
    case LunarMonths['ពិសាខ']:
      return LunarMonths['ជេស្ឋ'];
    case LunarMonths['ជេស្ឋ']: {
      if (isKhmerLeapMonth(BEYear)) {
        return LunarMonths['បឋមាសាឍ']
      } else {
        return LunarMonths['អាសាឍ']
      }
    }
    case LunarMonths['អាសាឍ']:
      return LunarMonths['ស្រាពណ៍'];
    case LunarMonths['ស្រាពណ៍']:
      return LunarMonths['ភទ្របទ'];
    case LunarMonths['ភទ្របទ']:
      return LunarMonths['អស្សុជ'];
    case LunarMonths['អស្សុជ']:
      return LunarMonths['កក្ដិក'];
    case LunarMonths['កក្ដិក']:
      return LunarMonths['មិគសិរ'];
    case LunarMonths['បឋមាសាឍ']:
      return LunarMonths['ទុតិយាសាឍ'];
    case LunarMonths['ទុតិយាសាឍ']:
      return LunarMonths['ស្រាពណ៍'];
    default:
      throw Error('Plugin is facing wrong calculation (Invalid month)');
    }
  }

  /**
   * Calculate date from momoentjs to Khmer date
   * @param target : Moment
   * @returns {{day: number, month: *, epochMoved: (*|moment.Moment)}}
   */
  function findLunarDate(target) {
    /**
     * Epoch Date: January 1, 1900
     */
    let epochMoment = Moment('1/1/1900', 'D/M/YYYY')
    let khmerMonth = LunarMonths['បុស្ស'];
    let khmerDay = 0; // 0 - 29 ១កើត ... ១៥កើត ១រោច ...១៤រោច (១៥រោច)

    let differentFromEpoch = target.diff(epochMoment)

    // Find nearest year epoch
    if (differentFromEpoch > 0) {
      while (Moment.duration(target.diff(epochMoment), 'milliseconds').asDays() > getNumerOfDayInKhmerYear(getMaybeBEYear(epochMoment.clone().add(1, 'year')))) {
        epochMoment.add(getNumerOfDayInKhmerYear(getMaybeBEYear(epochMoment.clone().add(1, 'year'))), 'day')
      }
    } else {
      do {
        epochMoment.subtract(getNumerOfDayInKhmerYear(getMaybeBEYear(epochMoment)), 'day')
      } while (Moment.duration(epochMoment.diff(target), 'milliseconds').asDays() > 0)
    }

    // Move epoch month
    while (Moment.duration(target.diff(epochMoment), 'milliseconds').asDays() > getNumberOfDayInKhmerMonth(khmerMonth, getMaybeBEYear(epochMoment))) {
      epochMoment.add(getNumberOfDayInKhmerMonth(khmerMonth, getMaybeBEYear(epochMoment)), 'day');
      khmerMonth = nextMonthOf(khmerMonth, getMaybeBEYear(epochMoment))
    }

    khmerDay += Math.floor(Moment.duration(target.diff(epochMoment), 'milliseconds').asDays());

    /**
     * Fix result display 15 រោច ខែ ជេស្ឋ នៅថ្ងៃ ១ កើតខែបឋមាសាធ
     * ករណី ខែជេស្ឋមានតែ ២៩ ថ្ងៃ តែលទ្ធផលបង្ហាញ ១៥រោច ខែជេស្ឋ
     */
     const totalDaysOfTheMonth = getNumberOfDayInKhmerMonth(khmerMonth, getMaybeBEYear(target))
    if (totalDaysOfTheMonth <= khmerDay) {
      khmerDay = khmerDay % totalDaysOfTheMonth
      khmerMonth = nextMonthOf(khmerMonth, getMaybeBEYear(epochMoment))
    }

    epochMoment.add(Moment.duration(target.diff(epochMoment), 'milliseconds').asDays(), 'day');

    return {
      day: khmerDay,
      month: khmerMonth,
      epochMoved: epochMoment
    }
  }

  /**
   * Return khmer lunar date
   * @param format String (wanted format)
   * @return String
   * @or @param Array (wanted field) [ថ្ងៃ ថ្ងៃទី កើត/រោច ខែចន្ទគតិ ខែសុរិយគតិ ឆ្នាំសត្វ ឆ្នាំស័ក ពស គស ចស មស សីល]
   * @return Object
   */
  function toLunarDate(format) {

    let target = this.clone();

    let result = findLunarDate(target);

    return formatKhmerDate({
      day: result.day,
      month: result.month,
      moment: target
    }, format)
  }

  function getKhNewYearMoment(gregorianYear) {
    if (Moment.khNewYearMoments[gregorianYear] !== undefined) {
      // console.log('cache')
      return Moment(Moment.khNewYearMoments[gregorianYear], 'DD-MM-YYYY H:m')
    } else {
      // console.log('calculate')
      let getSoriyatraLerngSak;
      if (typeof require === 'function') {
        getSoriyatraLerngSak = require('./getSoriyatraLerngSak')
      } else {
        if (window) {
          if (!window.getSoriyatraLerngSak) {
            throw 'Please import [MOMENTKH]/getSoriyatraLerngSak.js to your project'
          } else {
            getSoriyatraLerngSak = window.getSoriyatraLerngSak
          }
        } else {
          throw 'Cannot import getSoriyatraLerngSak. This is might not a nodejs environment or a browser'
        }
      }
      // ពីគ្រិស្ដសករាជ ទៅ ចុល្លសករាជ
      let jsYear = (gregorianYear + 544) - 1182;
      let info = getSoriyatraLerngSak(jsYear);
      // ចំនួនថ្ងៃចូលឆ្នាំ
      let numberNewYearDay;
      if (info.newYearsDaySotins[0].angsar === 0) { // ថ្ងៃ ខែ ឆ្នាំ ម៉ោង និង នាទី ចូលឆ្នាំ
        // ចូលឆ្នាំ ៤ ថ្ងៃ
        numberNewYearDay = 4;
        // return Moment(`13-04-${gregorianYear} ${info.timeOfNewYear.hour}:${info.timeOfNewYear.minute}`, 'DD-MM-YYYY H:m')
      } else {
        // ចូលឆ្នាំ ៣ ថ្ងៃ
        numberNewYearDay = 3;
        // return Moment(`14-04-${gregorianYear} ${info.timeOfNewYear.hour}:${info.timeOfNewYear.minute}`, 'DD-MM-YYYY H:m')
      }
      let epochLerngSak = Moment(`17-04-${gregorianYear} ${info.timeOfNewYear.hour}:${info.timeOfNewYear.minute}`, 'DD-MM-YYYY H:m')
      let khEpoch = findLunarDate(epochLerngSak)
      let diffFromEpoch = (((khEpoch.month - 4) * 30) + khEpoch.day) -
                          (((info.lunarDateLerngSak.month - 4) * 30) + info.lunarDateLerngSak.day)
      let result = epochLerngSak.subtract(diffFromEpoch + numberNewYearDay - 1, 'day')
      // Caching
      Moment.khNewYearMoments[gregorianYear] = result.format('DD-MM-YYYY H:m')
      return result
    }
  }

  function khDay() {
    let result = findLunarDate(this.clone());
    return result.day;
  }

  function khMonth() {
    let result = findLunarDate(this.clone());
    return result.month;
  }

  function khYear() {
    return getBEYear(this.clone());
  }

  Moment.readLunarDate =
    Moment.khDate =
      Moment.khdate =
        readLunarDate;

  Moment.fn.toLunarDate =
    Moment.fn.toKhDate =
      Moment.fn.tokhdate =
        toLunarDate;

  Moment.getKhNewYearMoment = getKhNewYearMoment;

  Moment.fn.khDay = khDay;
  Moment.fn.khMonth = khMonth;
  Moment.fn.khYear = khYear;

  return Moment;
})));
