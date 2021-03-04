/**
 * @see http://www.dahlina.com/education/khmer_new_year_time.html?fbclid=IwAR0Eq6US-F0LfplMjKzmiRn7rvPgi31i74Wpv4mNhU034mzdyj-3hYrCA8w
 * @param jsYear
 * @returns {{harkun, kromathopol, avaman, bodithey, has366day: *, isAthikameas: *, isChantreathimeas: *, jesthHas30: *, dayLerngSak: number, lunarDateLerngSak: {day: number, month: *}}}
 */

;(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory
  } else {
    if (typeof define === 'function' && define.amd) {
      define(factory)
    } else {
      global.getSoriyatraLerngSak = factory
    }
  }
}(this, (function (jsYear) {
  'use strict';

  return (function (jsYear) {

    let LunarMonths;

    if (typeof require === 'function') {
      LunarMonths = require('./constant').LunarMonths;
    } else {
      if (!window.momentkhConstant) {
        throw "Please import [MOMENTKH]/constant.js to your project"
      } else {
        LunarMonths = window.momentkhConstant.LunarMonths;
      }
    }

    /**
     * គណនា ហារគុន Kromathopol អវមាន និង បូតិថី
     * @param jsYear
     * @returns {{bodithey: number, avaman: number, kromathopol: number, harkun: number}}
     */
    function getInfo(jsYear) {
      let h = 292207 * jsYear + 373;
      let harkun = Math.floor(h / 800) + 1;
      let kromathopol = 800 - (h % 800);

      let a = 11 * harkun + 650;
      let avaman = a % 692;
      let bodithey = (harkun + Math.floor((a / 692))) % 30;
      return {
        harkun,
        kromathopol,
        avaman,
        bodithey
      }
    }

    let info = getInfo(jsYear);

    /**
     * ឆ្នាំចុល្លសករាជដែលមាន៣៦៦ថ្ងៃ
     * @param jsYear
     * @returns {boolean}
     */
    function getHas366day(jsYear) {
      let infoOfYear = getInfo(jsYear);
      return infoOfYear.kromathopol <= 207;
    }

    /**
     * រកឆ្នាំអធិកមាស
     * @param jsYear
     * @returns {boolean}
     */
    function getIsAthikameas(jsYear) {
      let infoOfYear = getInfo(jsYear);
      let infoOfNextYear = getInfo(jsYear + 1);
      return (!(infoOfYear.bodithey === 25 && infoOfNextYear.bodithey === 5) &&
        (infoOfYear.bodithey > 24 ||
          infoOfYear.bodithey < 6 ||
          (infoOfYear.bodithey === 24 &&
            infoOfNextYear.bodithey === 6
          )
        )
      );
    }

    /**
     * រកឆ្នាំចន្ទ្រាធិមាស
     * @param jsYear
     * @returns {boolean}
     */
    function getIsChantreathimeas(jsYear) {
      let infoOfYear = getInfo(jsYear);
      let infoOfNextYear = getInfo(jsYear + 1);
      let infoOfPreviousYear = getInfo(jsYear - 1);
      let has366day = getHas366day(jsYear);
      return ((has366day && infoOfYear.avaman < 127) ||
        (!(infoOfYear.avaman === 137 &&
            infoOfNextYear.avaman === 0) &&
          ((!has366day &&
              infoOfYear.avaman < 138) ||
            (infoOfPreviousYear.avaman === 137 &&
              infoOfYear.avaman === 0
            )
          )
        )
      );
    }

    let has366day = getHas366day(jsYear);
    let isAthikameas = getIsAthikameas(jsYear)
    let isChantreathimeas = getIsChantreathimeas(jsYear)

    /**
     * ឆែកមើលថាជាឆ្នាំដែលខែជេស្ឋមាន៣០ថ្ងៃឬទេ
     * @type {boolean}
     */
    let jesthHas30 = (function () {
      let tmp = isChantreathimeas;
      if (isAthikameas && isChantreathimeas) {
        tmp = false;
      }
      if (!isChantreathimeas && getIsAthikameas(jsYear - 1) && getIsChantreathimeas(jsYear - 1)) {
        tmp = true;
      }
      return tmp;
    })();

    /**
     * រកមើលថាតើថ្ងៃឡើងស័កចំថ្ងៃអ្វី
     * @type {number}
     */
    let dayLerngSak = (info.harkun - 2) % 7;

    /**
     * គណនារកថ្ងៃឡើងស័ក
     * @type {{month, day}}
     */
    let lunarDateLerngSak = (function () {
      let bodithey = info.bodithey;
      if (getIsAthikameas(jsYear - 1) && getIsChantreathimeas(jsYear - 1)) {
        bodithey = (bodithey + 1) % 30;
      }
      return {
        day: bodithey >= 6 ? bodithey - 1 : bodithey,
        month: bodithey >= 6 ? LunarMonths['ចេត្រ'] : LunarMonths['ពិសាខ']
      };
    })();

    function getSunInfo(sotin) {  // សុទិន
      let infoOfPreviousYear = getInfo(jsYear - 1);
      // ១ រាសី = ៣០ អង្សា
      // ១ អង្សា = ៦០ លិប្ដា
      let sunAverageAsLibda = (function () {  // មធ្យមព្រះអាទិត្យ គិតជាលិប្ដា
        let r2 = 800 * sotin + infoOfPreviousYear.kromathopol;
        let reasey = Math.floor(r2 / 24350); // រាសី
        let r3 = r2 % 24350;
        let angsar = Math.floor(r3 / 811); // អង្សា
        let r4 = r3 % 811;
        let l1 = Math.floor(r4 / 14);
        let libda = l1 - 3; // លិប្ដា
        return (30 * 60 * reasey) + (60 * angsar) + libda;
      })();

      let leftOver = (function () {
        let s1 = ((30 * 60 * 2) + (60 * 20));
        let leftOver = sunAverageAsLibda - s1; // មធ្យមព្រះអាទិត្យ - R2.A20.L0
        if (sunAverageAsLibda < s1) { // បើតូចជាង ខ្ចី ១២ រាសី
          leftOver += (30 * 60 * 12)
        }
        return leftOver;
      })();

      let kaen = (function () {
        return Math.floor(leftOver / (30 * 60));
      })();

      let lastLeftOver = (function () {
        let rs = -1;
        if ([0, 1, 2].includes(kaen)) {
          rs = kaen;
        } else if ([3, 4, 5].includes(kaen)) {
          rs = (30 * 60 * 6) - leftOver; // R6.A0.L0 - leftover
        } else if ([6, 7, 8].includes(kaen)) {
          rs = leftOver - (30 * 60 * 6); // leftover - R6.A0.L0
        } else if ([9, 10, 11].includes(kaen)) {
          rs = ((30 * 60 * 11) + (60 * 29) + 60) - leftOver; // R11.A29.L60 - leftover
        }
        return {
          reasey: Math.floor(rs / (30 * 60)),
          angsar: Math.floor((rs % (30 * 60)) / (60)),
          libda: rs % 60
        };
      })();

      let [khan, pouichalip] = (function () { // ខណ្ឌ និង pouichalip
        if (lastLeftOver.angsar >= 15) {
          return [
            2 * lastLeftOver.reasey + 1,
            60 * (lastLeftOver.angsar - 15) + lastLeftOver.libda
          ];
        } else {
          return [
            2 * lastLeftOver.reasey,
            60 * lastLeftOver.angsar + lastLeftOver.libda
          ];
        }
      })();

      let phol = (function () { // phol
        const chhayaSun = function (khan) {
          let multiplicities = [35, 32, 27, 22, 13, 5];
          let chhayas = [0, 35, 67, 94, 116, 129];
          switch (khan) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              return {
                multiplicity: multiplicities[khan],
                chhaya: chhayas[khan]
              }
            default:
              return {
                chhaya: 134
              }
          }
        }

        let val = chhayaSun(khan);
        let q = Math.floor((pouichalip * val.multiplicity) / 900);
        return {
          reasey: 0,
          angsar: Math.floor((q + val.chhaya) / 60),
          libda: (q + val.chhaya) % 60
        }
      })();

      let sunInaugurationAsLibda = (function () { // សម្ពោធព្រះអាទិត្យ
        let pholAsLibda = (30 * 60 * phol.reasey) + (60 * phol.angsar) + phol.libda;
        if (kaen <= 5) {
          return sunAverageAsLibda - pholAsLibda;
        } else {
          return sunAverageAsLibda + pholAsLibda;
        }
      })();

      return {
        sunAverageAsLibda,
        khan,
        pouichalip,
        phol,
        sunInaugurationAsLibda
      }
    }

    let newYearsDaySotins = (function () { // ចំនួនថ្ងៃវ័នបត
      let sotins = getHas366day(jsYear - 1) ? [363, 364, 365, 366] : [362, 363, 364, 365]; // សុទិន
      return sotins.map(function (sotin) {
        let sunInfo = getSunInfo(sotin);
        return {
          sotin: sotin,
          reasey: Math.floor(sunInfo.sunInaugurationAsLibda / (30 * 60)),
          angsar: Math.floor((sunInfo.sunInaugurationAsLibda % (30 * 60)) / (60)), // អង្សាស្មើសូន្យ គីជាថ្ងៃចូលឆ្នាំ, មួយ ឬ ពីរ ថ្ងៃបន្ទាប់ជាថ្ងៃវ័នបត ហើយ ថ្ងៃចុងក្រោយគីឡើងស័ក
          libda: sunInfo.sunInaugurationAsLibda % 60,
        }
      })
    })();

    let timeOfNewYear = (function () {
      let sotinNewYear = newYearsDaySotins.filter(function (sotin) {
        return sotin.angsar === 0;
      });
      if (sotinNewYear.length > 0) {
        let libda = sotinNewYear[0].libda; // ២៤ ម៉ោង មាន ៦០លិប្ដា
        let minutes = (24 * 60) - (libda * 24)
        return {
          hour: Math.floor(minutes / 60),
          minute: minutes % 60
        }
      } else {
        throw Error('Plugin is facing wrong calculation on new years hour. No sotin with angsar = 0');
      }
    })();

    return {
      harkun: info.harkun,
      kromathopol: info.kromathopol,
      avaman: info.avaman,
      bodithey: info.bodithey,
      has366day, // សុរិយគតិខ្មែរ
      isAthikameas, // 13 months
      isChantreathimeas, // 30ថ្ងៃនៅខែជេស្ឋ
      jesthHas30, // ខែជេស្ឋមាន៣០ថ្ងៃ
      dayLerngSak, // ថ្ងៃឡើងស័ក ច័ន្ទ អង្គារ ...
      lunarDateLerngSak, // ថ្ងៃទី ខែ ឡើងស័ក
      newYearsDaySotins, // សុទិនសម្រាប់គណនាថ្ងៃចូលឆ្នាំ ថ្ងៃវ័នបត និង ថ្ងៃឡើងស័ក
      timeOfNewYear // ម៉ោងទេវតាចុះ
    }
  })(jsYear);
})));
