"use strict";
/**
 * MomentKH2 - Standalone Khmer Calendar Library (TypeScript)
 *
 * A simplified, standalone library for Khmer calendar conversion
 * No dependencies required
 *
 * Based on:
 * - khmer_calendar.cpp implementation
 * - Original momentkh library
 *
 * @version 2.0.0
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.momentkh = exports.DayOfWeek = exports.EraYear = exports.AnimalYear = exports.MonthIndex = exports.MoonPhase = void 0;
// ============================================================================
// Type Definitions
// ============================================================================
// Enums for better type safety and ease of use
var MoonPhase;
(function (MoonPhase) {
    MoonPhase[MoonPhase["Waxing"] = 0] = "Waxing";
    MoonPhase[MoonPhase["Waning"] = 1] = "Waning"; // រោច
})(MoonPhase || (exports.MoonPhase = MoonPhase = {}));
var MonthIndex;
(function (MonthIndex) {
    MonthIndex[MonthIndex["Mikasar"] = 0] = "Mikasar";
    MonthIndex[MonthIndex["Bos"] = 1] = "Bos";
    MonthIndex[MonthIndex["Meak"] = 2] = "Meak";
    MonthIndex[MonthIndex["Phalgun"] = 3] = "Phalgun";
    MonthIndex[MonthIndex["Chetr"] = 4] = "Chetr";
    MonthIndex[MonthIndex["Visakh"] = 5] = "Visakh";
    MonthIndex[MonthIndex["Jesth"] = 6] = "Jesth";
    MonthIndex[MonthIndex["Asath"] = 7] = "Asath";
    MonthIndex[MonthIndex["Srap"] = 8] = "Srap";
    MonthIndex[MonthIndex["Photrobot"] = 9] = "Photrobot";
    MonthIndex[MonthIndex["Assoch"] = 10] = "Assoch";
    MonthIndex[MonthIndex["Kadek"] = 11] = "Kadek";
    MonthIndex[MonthIndex["BothmakAsath"] = 12] = "BothmakAsath";
    MonthIndex[MonthIndex["TutiyakAsath"] = 13] = "TutiyakAsath"; // ទុតិយាសាឍ
})(MonthIndex || (exports.MonthIndex = MonthIndex = {}));
var AnimalYear;
(function (AnimalYear) {
    AnimalYear[AnimalYear["Chhut"] = 0] = "Chhut";
    AnimalYear[AnimalYear["Chlov"] = 1] = "Chlov";
    AnimalYear[AnimalYear["Khal"] = 2] = "Khal";
    AnimalYear[AnimalYear["Thos"] = 3] = "Thos";
    AnimalYear[AnimalYear["Rong"] = 4] = "Rong";
    AnimalYear[AnimalYear["Masagn"] = 5] = "Masagn";
    AnimalYear[AnimalYear["Momee"] = 6] = "Momee";
    AnimalYear[AnimalYear["Momae"] = 7] = "Momae";
    AnimalYear[AnimalYear["Vok"] = 8] = "Vok";
    AnimalYear[AnimalYear["Roka"] = 9] = "Roka";
    AnimalYear[AnimalYear["Cho"] = 10] = "Cho";
    AnimalYear[AnimalYear["Kor"] = 11] = "Kor"; // កុរ - Pig
})(AnimalYear || (exports.AnimalYear = AnimalYear = {}));
var EraYear;
(function (EraYear) {
    EraYear[EraYear["Samridhisak"] = 0] = "Samridhisak";
    EraYear[EraYear["Ekasak"] = 1] = "Ekasak";
    EraYear[EraYear["Tosak"] = 2] = "Tosak";
    EraYear[EraYear["Tresak"] = 3] = "Tresak";
    EraYear[EraYear["Chatvasak"] = 4] = "Chatvasak";
    EraYear[EraYear["Panchasak"] = 5] = "Panchasak";
    EraYear[EraYear["Chhasak"] = 6] = "Chhasak";
    EraYear[EraYear["Saptasak"] = 7] = "Saptasak";
    EraYear[EraYear["Atthasak"] = 8] = "Atthasak";
    EraYear[EraYear["Novvasak"] = 9] = "Novvasak"; // នព្វស័ក
})(EraYear || (exports.EraYear = EraYear = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday"; // សៅរ៍
})(DayOfWeek || (exports.DayOfWeek = DayOfWeek = {}));
// ============================================================================
// Constants and Locale Data
// ============================================================================
const LunarMonths = {
    'មិគសិរ': 0, 'បុស្ស': 1, 'មាឃ': 2, 'ផល្គុន': 3,
    'ចេត្រ': 4, 'ពិសាខ': 5, 'ជេស្ឋ': 6, 'អាសាឍ': 7,
    'ស្រាពណ៍': 8, 'ភទ្របទ': 9, 'អស្សុជ': 10, 'កត្ដិក': 11,
    'បឋមាសាឍ': 12, 'ទុតិយាសាឍ': 13
};
const LunarMonthNames = [
    'មិគសិរ', 'បុស្ស', 'មាឃ', 'ផល្គុន', 'ចេត្រ', 'ពិសាខ',
    'ជេស្ឋ', 'អាសាឍ', 'ស្រាពណ៍', 'ភទ្របទ', 'អស្សុជ', 'កត្ដិក',
    'បឋមាសាឍ', 'ទុតិយាសាឍ'
];
const SolarMonthNames = [
    'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
    'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
];
const AnimalYearNames = [
    'ជូត', 'ឆ្លូវ', 'ខាល', 'ថោះ', 'រោង', 'ម្សាញ់',
    'មមី', 'មមែ', 'វក', 'រកា', 'ច', 'កុរ'
];
const EraYearNames = [
    'សំរឹទ្ធិស័ក', 'ឯកស័ក', 'ទោស័ក', 'ត្រីស័ក', 'ចត្វាស័ក',
    'បញ្ចស័ក', 'ឆស័ក', 'សប្តស័ក', 'អដ្ឋស័ក', 'នព្វស័ក'
];
const WeekdayNames = [
    'អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'
];
const WeekdayNamesShort = ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'];
const MoonStatusNames = ['កើត', 'រោច'];
const MoonStatusShort = ['ក', 'រ'];
const MoonDaySymbols = [
    '᧡', '᧢', '᧣', '᧤', '᧥', '᧦', '᧧', '᧨', '᧩', '᧪',
    '᧫', '᧬', '᧭', '᧮', '᧯', '᧱', '᧲', '᧳', '᧴', '᧵',
    '᧶', '᧷', '᧸', '᧹', '᧺', '᧻', '᧼', '᧽', '᧾', '᧿'
];
const KhmerNumerals = {
    '0': '០', '1': '១', '2': '២', '3': '៣', '4': '៤',
    '5': '៥', '6': '៦', '7': '៧', '8': '៨', '9': '៩'
};
// Exceptional New Year moments (cached values for specific years)
const khNewYearMoments = {
    '1879': '12-04-1879 11:36',
    '1897': '13-04-1897 02:00',
    '2011': '14-04-2011 13:12',
    '2012': '14-04-2012 19:11',
    '2013': '14-04-2013 02:12',
    '2014': '14-04-2014 08:07',
    '2015': '14-04-2015 14:02',
    '2024': '13-04-2024 22:17',
};
// ============================================================================
// Utility Functions
// ============================================================================
function toKhmerNumeral(num) {
    return String(num).replace(/\d/g, d => KhmerNumerals[d]);
}
function isGregorianLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
function getDaysInGregorianMonth(year, month) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isGregorianLeapYear(year)) {
        return 29;
    }
    return daysInMonth[month - 1];
}
// Julian Day Number conversion
function gregorianToJulianDay(year, month, day) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y +
        Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}
function julianDayToGregorian(jdn) {
    const a = jdn + 32044;
    const b = Math.floor((4 * a + 3) / 146097);
    const c = a - Math.floor((146097 * b) / 4);
    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    const day = e - Math.floor((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = 100 * b + d - 4800 + Math.floor(m / 10);
    return { year, month, day };
}
function getDayOfWeek(year, month, day) {
    const jdn = gregorianToJulianDay(year, month, day);
    // JDN % 7: where 0=Monday, 1=Tuesday, ..., 6=Sunday
    // We want: 0=Sunday, 1=Monday, ..., 6=Saturday
    // So we need to convert: (jdn + 1) % 7
    return (jdn + 1) % 7;
}
// ============================================================================
// Era Conversions
// ============================================================================
function adToJs(adYear) {
    return adYear - 638;
}
function adToBe(adYear) {
    return adYear + 544;
}
function beToAd(beYear) {
    return beYear - 544;
}
function jsToAd(jsYear) {
    return jsYear + 638;
}
function beToJs(beYear) {
    return beYear - 1182;
}
function jsToBe(jsYear) {
    return jsYear + 1182;
}
// ============================================================================
// Calendar Calculation Functions
// ============================================================================
function getAharkun(beYear) {
    return Math.floor((beYear * 292207 + 499) / 800) + 4;
}
function getAharkunMod(beYear) {
    return (beYear * 292207 + 499) % 800;
}
function getKromthupul(beYear) {
    return 800 - getAharkunMod(beYear);
}
function getAvoman(beYear) {
    return (getAharkun(beYear) * 11 + 25) % 692;
}
function getBodithey(beYear) {
    const aharkun = getAharkun(beYear);
    return (Math.floor((aharkun * 11 + 25) / 692) + aharkun + 29) % 30;
}
function isKhmerSolarLeap(beYear) {
    return getKromthupul(beYear) <= 207;
}
function isKhmerLeapDayByCalculation(beYear) {
    const avoman = getAvoman(beYear);
    const isSolarLeap = isKhmerSolarLeap(beYear);
    if (avoman === 0 && getAvoman(beYear - 1) === 137) {
        return true;
    }
    else if (isSolarLeap) {
        return avoman < 127;
    }
    else if (avoman === 137 && getAvoman(beYear + 1) === 0) {
        return false;
    }
    else if (avoman < 138) {
        return true;
    }
    return false;
}
function isKhmerLeapMonth(beYear) {
    const bodithey = getBodithey(beYear);
    const boditheyNextYear = getBodithey(beYear + 1);
    if (bodithey === 25 && boditheyNextYear === 5) {
        return false;
    }
    return (bodithey === 24 && boditheyNextYear === 6) ||
        (bodithey >= 25) ||
        (bodithey < 6);
}
function getLeapType(beYear) {
    if (isKhmerLeapMonth(beYear)) {
        return 1; // Leap month (អធិកមាស)
    }
    else if (isKhmerLeapDayByCalculation(beYear)) {
        return 2; // Leap day (ចន្ទ្រាធិមាស)
    }
    else if (isKhmerLeapMonth(beYear - 1)) {
        let previousYear = beYear - 1;
        while (true) {
            if (isKhmerLeapDayByCalculation(previousYear)) {
                return 2;
            }
            previousYear -= 1;
            if (!isKhmerLeapMonth(previousYear)) {
                return 0;
            }
        }
    }
    return 0; // Regular year
}
function getNumberOfDaysInKhmerMonth(monthIndex, beYear) {
    const leapType = getLeapType(beYear);
    const idx = typeof monthIndex === 'number' ? monthIndex : monthIndex;
    if (idx === MonthIndex.Jesth && leapType === 2) { // ជេស្ឋ with leap day
        return 30;
    }
    if (idx === MonthIndex.BothmakAsath || idx === MonthIndex.TutiyakAsath) { // បឋមាសាឍ, ទុតិយាសាឍ
        return leapType === 1 ? 30 : 0;
    }
    // Alternating pattern: even months = 29 days, odd months = 30 days
    // មិគសិរ:29, បុស្ស:30, មាឃ:29, ផល្គុន:30, ចេត្រ:29, ពិសាខ:30, ជេស្ឋ:29, អាសាឍ:30, etc.
    return idx % 2 === 0 ? 29 : 30;
}
function getNumberOfDaysInKhmerYear(beYear) {
    const leapType = getLeapType(beYear);
    if (leapType === 1)
        return 384; // Leap month
    if (leapType === 2)
        return 355; // Leap day
    return 354; // Regular
}
function nextMonthOf(monthIndex, beYear) {
    const leapType = getLeapType(beYear);
    const idx = typeof monthIndex === 'number' ? monthIndex : monthIndex;
    if (idx === MonthIndex.Jesth && leapType === 1) { // ជេស្ឋ in leap month year
        return MonthIndex.BothmakAsath; // បឋមាសាឍ
    }
    if (idx === MonthIndex.Kadek)
        return MonthIndex.Mikasar; // កត្ដិក -> មិគសិរ
    if (idx === MonthIndex.BothmakAsath)
        return MonthIndex.TutiyakAsath; // បឋមាសាឍ -> ទុតិយាសាឍ
    if (idx === MonthIndex.TutiyakAsath)
        return MonthIndex.Srap; // ទុតិយាសាឍ -> ស្រាពណ៍
    return (idx + 1);
}
function previousMonthOf(monthIndex, beYear) {
    const leapType = getLeapType(beYear);
    const idx = typeof monthIndex === 'number' ? monthIndex : monthIndex;
    if (idx === MonthIndex.Mikasar)
        return MonthIndex.Kadek; // មិគសិរ -> កត្ដិក
    if (idx === MonthIndex.Srap && leapType === 1)
        return MonthIndex.TutiyakAsath; // ស្រាពណ៍ -> ទុតិយាសាឍ (leap)
    if (idx === MonthIndex.TutiyakAsath)
        return MonthIndex.BothmakAsath; // ទុតិយាសាឍ -> បឋមាសាឍ
    if (idx === MonthIndex.BothmakAsath)
        return MonthIndex.Jesth; // បឋមាសាឍ -> ជេស្ឋ
    return (idx - 1);
}
// ============================================================================
// Khmer New Year Calculation (JS Year based)
// ============================================================================
function getAharkunJs(jsYear) {
    const h = jsYear * 292207 + 373;
    return Math.floor(h / 800) + 1;
}
function getAvomanJs(jsYear) {
    return (getAharkunJs(jsYear) * 11 + 650) % 692;
}
function getKromthupulJs(jsYear) {
    return 800 - ((292207 * jsYear + 373) % 800);
}
function getBoditheyJs(jsYear) {
    const aharkun = getAharkunJs(jsYear);
    const a = 11 * aharkun + 650;
    return (aharkun + Math.floor(a / 692)) % 30;
}
function isAdhikameas(jsYear) {
    const bodithey = getBoditheyJs(jsYear);
    const boditheyNext = getBoditheyJs(jsYear + 1);
    if (bodithey === 24 && boditheyNext === 6)
        return true;
    if (bodithey === 25 && boditheyNext === 5)
        return false;
    return bodithey > 24 || bodithey < 6;
}
function isChantrathimeas(jsYear) {
    const avoman = getAvomanJs(jsYear);
    const avomanNext = getAvomanJs(jsYear + 1);
    const avomanPrev = getAvomanJs(jsYear - 1);
    const isSolarLeap = getKromthupulJs(jsYear) <= 207;
    if (avoman === 0 && avomanPrev === 137)
        return true;
    if (isSolarLeap)
        return avoman < 127;
    if (avoman === 137 && avomanNext === 0)
        return false;
    if (!isSolarLeap && avoman < 138)
        return true;
    if (avomanPrev === 137 && avoman === 0)
        return true;
    return false;
}
function has366Days(jsYear) {
    return getKromthupulJs(jsYear) <= 207;
}
function getSunInfo(jsYear, sotin) {
    const infoOfPrevYear = {
        kromathopol: getKromthupulJs(jsYear - 1)
    };
    // Sun average as Libda
    const r2 = 800 * sotin + infoOfPrevYear.kromathopol;
    const reasey = Math.floor(r2 / 24350);
    const r3 = r2 % 24350;
    const angsar = Math.floor(r3 / 811);
    const r4 = r3 % 811;
    const l1 = Math.floor(r4 / 14);
    const libda = l1 - 3;
    const sunAverageAsLibda = (30 * 60 * reasey) + (60 * angsar) + libda;
    // Left over
    const s1 = ((30 * 60 * 2) + (60 * 20));
    let leftOver = sunAverageAsLibda - s1;
    if (sunAverageAsLibda < s1) {
        leftOver += (30 * 60 * 12);
    }
    const kaen = Math.floor(leftOver / (30 * 60));
    // Last left over
    let rs = -1;
    if ([0, 1, 2].includes(kaen)) {
        rs = kaen;
    }
    else if ([3, 4, 5].includes(kaen)) {
        rs = (30 * 60 * 6) - leftOver;
    }
    else if ([6, 7, 8].includes(kaen)) {
        rs = leftOver - (30 * 60 * 6);
    }
    else if ([9, 10, 11].includes(kaen)) {
        rs = ((30 * 60 * 11) + (60 * 29) + 60) - leftOver;
    }
    const lastLeftOver = {
        reasey: Math.floor(rs / (30 * 60)),
        angsar: Math.floor((rs % (30 * 60)) / 60),
        libda: rs % 60
    };
    // Khan and pouichalip
    let khan, pouichalip;
    if (lastLeftOver.angsar >= 15) {
        khan = 2 * lastLeftOver.reasey + 1;
        pouichalip = 60 * (lastLeftOver.angsar - 15) + lastLeftOver.libda;
    }
    else {
        khan = 2 * lastLeftOver.reasey;
        pouichalip = 60 * lastLeftOver.angsar + lastLeftOver.libda;
    }
    // Chhaya sun
    const chhayaSunMap = [
        { multiplicity: 35, chhaya: 0 },
        { multiplicity: 32, chhaya: 35 },
        { multiplicity: 27, chhaya: 67 },
        { multiplicity: 22, chhaya: 94 },
        { multiplicity: 13, chhaya: 116 },
        { multiplicity: 5, chhaya: 129 }
    ];
    const chhayaSun = khan <= 5 ? chhayaSunMap[khan] : { multiplicity: 0, chhaya: 134 };
    const q = Math.floor((pouichalip * chhayaSun.multiplicity) / 900);
    const pholAsLibda = q + chhayaSun.chhaya;
    // Sun inauguration
    const sunInaugurationAsLibda = kaen <= 5
        ? sunAverageAsLibda - pholAsLibda
        : sunAverageAsLibda + pholAsLibda;
    return {
        sunInaugurationAsLibda,
        reasey: Math.floor(sunInaugurationAsLibda / (30 * 60)),
        angsar: Math.floor((sunInaugurationAsLibda % (30 * 60)) / 60),
        libda: sunInaugurationAsLibda % 60
    };
}
function getNewYearInfo(jsYear) {
    const sotins = has366Days(jsYear - 1)
        ? [363, 364, 365, 366]
        : [362, 363, 364, 365];
    const newYearsDaySotins = sotins.map(sotin => getSunInfo(jsYear, sotin));
    // Find time of new year
    let timeOfNewYear = { hour: 0, minute: 0 };
    for (const sotin of newYearsDaySotins) {
        if (sotin.angsar === 0) {
            const minutes = (24 * 60) - (sotin.libda * 24);
            timeOfNewYear = {
                hour: Math.floor(minutes / 60) % 24,
                minute: minutes % 60
            };
            break;
        }
    }
    // Number of Vanabat days
    const numberOfVanabatDays = (newYearsDaySotins[0].angsar === 0) ? 2 : 1;
    return {
        timeOfNewYear,
        numberOfVanabatDays,
        newYearsDaySotins
    };
}
// ============================================================================
// Khmer Date Class
// ============================================================================
class KhmerDate {
    constructor(day, moonPhase, monthIndex, beYear) {
        this.day = day;
        this.moonPhase = moonPhase;
        this.monthIndex = monthIndex;
        this.beYear = beYear;
    }
    // Get day number (0-29) - converts from 1-based internal to 0-based external
    getDayNumber() {
        if (this.moonPhase === MoonPhase.Waxing) { // កើត
            return this.day - 1; // day 1-15 → dayNum 0-14
        }
        else { // រោច
            return 15 + (this.day - 1); // day 1-15 → dayNum 15-29
        }
    }
    static fromDayNumber(dayNum) {
        // Converts from 0-based dayNum to 1-based day
        if (dayNum < 15) {
            return { day: dayNum + 1, moonPhase: MoonPhase.Waxing }; // dayNum 0-14 → day 1-15
        }
        else {
            return { day: (dayNum - 15) + 1, moonPhase: MoonPhase.Waning }; // dayNum 15-29 → day 1-15
        }
    }
    addDays(count) {
        if (count === 0)
            return this;
        if (count < 0)
            return this.subtractDays(-count);
        let result = new KhmerDate(this.day, this.moonPhase, this.monthIndex, this.beYear);
        let remaining = count;
        while (remaining > 0) {
            const daysInMonth = getNumberOfDaysInKhmerMonth(result.monthIndex, result.beYear);
            const currentDayNum = result.getDayNumber();
            const daysLeftInMonth = (daysInMonth - 1) - currentDayNum;
            if (remaining <= daysLeftInMonth) {
                const newDayNum = currentDayNum + remaining;
                const newDay = KhmerDate.fromDayNumber(newDayNum);
                let newBeYear = result.beYear;
                if (result.monthIndex === MonthIndex.Visakh) { // ពិសាខ
                    if (result.moonPhase === MoonPhase.Waxing && newDay.moonPhase === MoonPhase.Waning) {
                        newBeYear++;
                    }
                }
                result = new KhmerDate(newDay.day, newDay.moonPhase, result.monthIndex, newBeYear);
                remaining = 0;
            }
            else {
                remaining -= (daysLeftInMonth + 1);
                const nextMonth = nextMonthOf(result.monthIndex, result.beYear);
                const newBeYear = (result.monthIndex === MonthIndex.Chetr) ? result.beYear + 1 : result.beYear;
                result = new KhmerDate(1, MoonPhase.Waxing, nextMonth, newBeYear); // Start at 1កើត
            }
        }
        return result;
    }
    subtractDays(count) {
        if (count === 0)
            return this;
        let result = new KhmerDate(this.day, this.moonPhase, this.monthIndex, this.beYear);
        let remaining = count;
        while (remaining > 0) {
            const currentDayNum = result.getDayNumber();
            if (remaining <= currentDayNum) {
                const newDayNum = currentDayNum - remaining;
                const newDay = KhmerDate.fromDayNumber(newDayNum);
                let newBeYear = result.beYear;
                if (result.monthIndex === MonthIndex.Visakh) { // ពិសាខ
                    if (result.moonPhase === MoonPhase.Waning && newDay.moonPhase === MoonPhase.Waxing) {
                        newBeYear--;
                    }
                }
                result = new KhmerDate(newDay.day, newDay.moonPhase, result.monthIndex, newBeYear);
                remaining = 0;
            }
            else {
                remaining -= (currentDayNum + 1);
                const prevMonth = previousMonthOf(result.monthIndex, result.beYear);
                const newBeYear = (result.monthIndex === MonthIndex.Visakh) ? result.beYear - 1 : result.beYear;
                const daysInPrevMonth = getNumberOfDaysInKhmerMonth(prevMonth, newBeYear);
                const newDay = KhmerDate.fromDayNumber(daysInPrevMonth - 1);
                result = new KhmerDate(newDay.day, newDay.moonPhase, prevMonth, newBeYear);
            }
        }
        return result;
    }
    toString() {
        return `${this.day}${MoonStatusNames[this.moonPhase]} ខែ${LunarMonthNames[this.monthIndex]} ព.ស.${this.beYear}`;
    }
}
// ============================================================================
// Main Conversion Functions
// ============================================================================
// Helper function to get approximate BE year (like original getMaybeBEYear)
function getMaybeBEYear(year, month) {
    // SolarMonth['មេសា'] = 3 (0-based), so month <= 4 (1-based)
    if (month <= 4) {
        return year + 543;
    }
    else {
        return year + 544;
    }
}
// Cache for Visakha Bochea dates by year
const visakhaBocheaCache = {};
// Cache for New Year Full Info
const newYearInfoCache = {};
/**
 * Find BE Year transition datetime for a given Gregorian year
 * BE year increases on ១រោច ខែពិសាខ (1st waning day of Pisakh = dayNumber 15 of month 5)
 * Returns timestamp in milliseconds at midnight of that day
 */
function getVisakhaBochea(year, isSearching = false) {
    if (visakhaBocheaCache[year]) {
        return visakhaBocheaCache[year];
    }
    // Search for 1រោច Pisakh (when BE year changes) - start from April since it typically occurs then
    for (let searchMonth = 4; searchMonth <= 6; searchMonth++) {
        const daysInMonth = new Date(year, searchMonth, 0).getDate();
        for (let searchDay = 1; searchDay <= daysInMonth; searchDay++) {
            // Avoid infinite recursion by using simplified BE year during search
            const result = gregorianToKhmerInternal(year, searchMonth, searchDay, 12, 0, 0, true);
            if (result.khmer.monthIndex === MonthIndex.Visakh && result._khmerDateObj.getDayNumber() === 15) {
                // Found 1រោច Pisakh - return timestamp at midnight (start of BE year change day)
                // BE year changes at 00:00 on this day
                const timestamp = new Date(year, searchMonth - 1, searchDay, 0, 0, 0, 0).getTime();
                visakhaBocheaCache[year] = timestamp;
                return timestamp;
            }
        }
    }
    // Fallback if not found
    const fallback = new Date(year, 3, 15, 0, 0, 0, 0).getTime();
    visakhaBocheaCache[year] = fallback;
    return fallback;
}
function gregorianToKhmerInternal(year, month, day, hour = 0, minute = 0, second = 0, isSearching = false) {
    /**
     * This follows the original momentkh algorithm exactly using JDN for tracking
     */
    // Epoch: January 1, 1900 = dayNumber 0 (១កើត), month index 1 (បុស្ស)
    let epochJdn = gregorianToJulianDay(1900, 1, 1);
    const targetJdn = gregorianToJulianDay(year, month, day);
    let khmerMonth = 1; // បុស្ស
    let khmerDayNumber = 0; // 0-29 format
    let diffDays = targetJdn - epochJdn;
    // Move epoch by full Khmer years
    if (diffDays > 0) {
        while (true) {
            // Get Gregorian date of current epoch to calculate BE year
            const epochGreg = julianDayToGregorian(epochJdn);
            // Match original: use epochMoment.clone().add(1, 'year')
            const nextYearBE = getMaybeBEYear(epochGreg.year + 1, epochGreg.month);
            const daysInNextYear = getNumberOfDaysInKhmerYear(nextYearBE);
            if (diffDays > daysInNextYear) {
                diffDays -= daysInNextYear;
                epochJdn += daysInNextYear;
            }
            else {
                break;
            }
        }
    }
    else if (diffDays < 0) {
        while (diffDays < 0) {
            const epochGreg = julianDayToGregorian(epochJdn);
            const currentYearBE = getMaybeBEYear(epochGreg.year, epochGreg.month);
            const daysInCurrentYear = getNumberOfDaysInKhmerYear(currentYearBE);
            diffDays += daysInCurrentYear;
            epochJdn -= daysInCurrentYear;
        }
    }
    // Move epoch by full Khmer months
    while (diffDays > 0) {
        const epochGreg = julianDayToGregorian(epochJdn);
        const currentBE = getMaybeBEYear(epochGreg.year, epochGreg.month);
        const daysInMonth = getNumberOfDaysInKhmerMonth(khmerMonth, currentBE);
        if (diffDays > daysInMonth) {
            diffDays -= daysInMonth;
            epochJdn += daysInMonth;
            khmerMonth = nextMonthOf(khmerMonth, currentBE);
        }
        else {
            break;
        }
    }
    // Add remaining days
    khmerDayNumber = diffDays;
    // Fix overflow (e.g., if month has only 29 days but we calculated 30)
    const finalBE = getMaybeBEYear(year, month);
    const totalDaysInMonth = getNumberOfDaysInKhmerMonth(khmerMonth, finalBE);
    if (khmerDayNumber >= totalDaysInMonth) {
        khmerDayNumber = khmerDayNumber % totalDaysInMonth;
        khmerMonth = nextMonthOf(khmerMonth, finalBE);
    }
    // Convert dayNumber to day/moonPhase format
    const khmerDayInfo = KhmerDate.fromDayNumber(khmerDayNumber);
    // Calculate actual BE year
    // The BE year changes on ១រោច ខែពិសាខ (1st waning day of Pisakh = dayNumber 15)
    // Compare datetime (including hour/minute) against BE year transition datetime
    let beYear;
    if (isSearching) {
        // During search, use simple approximation to avoid recursion
        beYear = month <= 4 ? year + 543 : year + 544;
    }
    else {
        // Normal mode: compare against exact BE year transition datetime (1រោច Pisakh at 00:00)
        const inputTimestamp = new Date(year, month - 1, day, hour, minute, second).getTime();
        const beYearTransitionTimestamp = getVisakhaBochea(year);
        if (inputTimestamp >= beYearTransitionTimestamp) {
            // On or after 1រោច Pisakh (new BE year)
            beYear = year + 544;
        }
        else {
            // Before 1រោច Pisakh (old BE year)
            beYear = year + 543;
        }
    }
    // Calculate additional info
    let jsYear = beToJs(beYear);
    let animalYearIndex = ((beYear + 4) % 12 + 12) % 12;
    // Adjust Era and Animal Year based on Khmer New Year logic
    // They should change at New Year, not wait for Visakha Bochea (which changes BE)
    if (!isSearching) {
        const newYearInfo = getNewYearFullInfo(year);
        const inputTimestamp = new Date(year, month - 1, day, hour, minute, second).getTime();
        const visakhaBocheaTimestamp = getVisakhaBochea(year);
        // Animal Year changes at Moha Songkran (exact New Year time)
        // Only apply manual increment if we are in the gap between New Year and Visakha Bochea
        // (After Visakha Bochea, the BE year increments, so the formula based on BE automatically gives the new Animal Year)
        if (inputTimestamp >= newYearInfo.newYearMoment.getTime() && inputTimestamp <= visakhaBocheaTimestamp) {
            animalYearIndex = (animalYearIndex + 1) % 12;
        }
        // Era changes at Midnight of Date Lerng Sak (3rd or 4th day of NY)
        if (inputTimestamp >= newYearInfo.lerngSakMoment.getTime() && inputTimestamp <= visakhaBocheaTimestamp) {
            jsYear++;
        }
    }
    const eraYearIndex = ((jsYear % 10) + 10) % 10;
    const dayOfWeek = getDayOfWeek(year, month, day);
    const khmerDate = new KhmerDate(khmerDayInfo.day, khmerDayInfo.moonPhase, khmerMonth, beYear);
    return {
        gregorian: { year, month, day, hour, minute, second, dayOfWeek },
        khmer: {
            day: khmerDayInfo.day,
            moonPhase: khmerDayInfo.moonPhase,
            moonPhaseName: MoonStatusNames[khmerDayInfo.moonPhase],
            monthIndex: khmerMonth,
            monthName: LunarMonthNames[khmerMonth],
            beYear: beYear,
            jsYear: jsYear,
            animalYear: animalYearIndex,
            animalYearName: AnimalYearNames[animalYearIndex],
            eraYear: eraYearIndex,
            eraYearName: EraYearNames[eraYearIndex],
            dayOfWeek: dayOfWeek,
            dayOfWeekName: WeekdayNames[dayOfWeek]
        },
        _khmerDateObj: khmerDate
    };
}
function khmerToGregorian(day, moonPhase, monthIndex, beYear) {
    // Convert enums to numbers if needed
    const moonPhaseNum = typeof moonPhase === 'number' ? moonPhase : moonPhase;
    const monthIndexNum = typeof monthIndex === 'number' ? monthIndex : monthIndex;
    // Convert BE year to approximate Gregorian year
    const approxYear = beYear - 544;
    // Search within a range around the approximate year
    // Start from 2 years before to 2 years after to account for calendar differences
    const startYear = approxYear - 2;
    const endYear = approxYear + 2;
    let candidates = [];
    // Iterate through Gregorian dates to find all matches
    for (let year = startYear; year <= endYear; year++) {
        for (let month = 1; month <= 12; month++) {
            const daysInMonth = getDaysInGregorianMonth(year, month);
            for (let gDay = 1; gDay <= daysInMonth; gDay++) {
                // For BE year transition day (1រោច Pisakh) and the day before (15កើត Pisakh),
                // check multiple times during the day because BE year can change during this period
                const isAroundBEYearChange = monthIndexNum === MonthIndex.Visakh &&
                    ((day === 15 && moonPhaseNum === MoonPhase.Waxing) || (day === 1 && moonPhaseNum === MoonPhase.Waning));
                const timesToCheck = isAroundBEYearChange
                    ? [0, 6, 12, 18, 23] // Check at different hours
                    : [0]; // Normal case: just check at midnight
                for (const hour of timesToCheck) {
                    const khmerResult = gregorianToKhmerInternal(year, month, gDay, hour, 0, 0, false);
                    // Check if it matches our target
                    if (khmerResult.khmer.beYear === beYear &&
                        khmerResult.khmer.monthIndex === monthIndexNum &&
                        khmerResult.khmer.day === day &&
                        khmerResult.khmer.moonPhase === moonPhaseNum) {
                        candidates.push({ year, month, day: gDay });
                        break; // Found a match for this date, no need to check other times
                    }
                }
            }
        }
    }
    if (candidates.length === 0) {
        throw new Error(`Could not find Gregorian date for Khmer date: ${day} ${moonPhaseNum === MoonPhase.Waxing ? 'កើត' : 'រោច'} month ${monthIndexNum} BE ${beYear}`);
    }
    // If multiple candidates found, prefer closest to approximate year
    if (candidates.length > 1) {
        // First, try to filter by year distance
        const minDistance = Math.min(...candidates.map(c => Math.abs(c.year - approxYear)));
        const closestCandidates = candidates.filter(c => Math.abs(c.year - approxYear) === minDistance);
        // If we have a unique closest candidate, return it
        if (closestCandidates.length === 1) {
            return closestCandidates[0];
        }
        // If there are ties, prefer the one that matches at noon
        const noonMatches = closestCandidates.filter(c => {
            const noonCheck = gregorianToKhmerInternal(c.year, c.month, c.day, 12, 0, 0, false);
            return noonCheck.khmer.beYear === beYear &&
                noonCheck.khmer.monthIndex === monthIndexNum &&
                noonCheck.khmer.day === day &&
                noonCheck.khmer.moonPhase === moonPhaseNum;
        });
        if (noonMatches.length > 0) {
            return noonMatches[0];
        }
        // Fall back to first closest candidate
        return closestCandidates[0];
    }
    return candidates[0];
}
function getNewYearFullInfo(ceYear) {
    if (newYearInfoCache[ceYear]) {
        return newYearInfoCache[ceYear];
    }
    // Calculate using the standard algorithm first to get necessary info (like angsar for numberNewYearDay)
    const jsYear = adToJs(ceYear);
    let newYearInfo = getNewYearInfo(jsYear);
    // Get Lerng Sak info
    let bodithey = getBoditheyJs(jsYear);
    const isAthikameasPrev = isAdhikameas(jsYear - 1);
    const isChantrathimeasPrev = isChantrathimeas(jsYear - 1);
    if (isAthikameasPrev && isChantrathimeasPrev) {
        bodithey = (bodithey + 1) % 30;
    }
    // lunar DateLerngSak
    const lunarDateLerngSak = {
        day: bodithey >= 6 ? bodithey - 1 : bodithey,
        month: bodithey >= 6 ? 4 : 5 // ចេត្រ or ពិសាខ
    };
    // Number of new year days
    const numberNewYearDay = newYearInfo.newYearsDaySotins[0].angsar === 0 ? 4 : 3;
    // Use April 17 as epoch and work backwards
    const epochLerngSakGreg = { year: ceYear, month: 4, day: 17 };
    // IMPORTANT: prevent recursion by passing isSearching=true (or any flag that skips Era check)
    // gregorianToKhmerInternal(..., isSearching=true) uses simplified BE calc and skips Era check
    const khEpoch = gregorianToKhmerInternal(ceYear, 4, 17, 12, 0, 0, true)._khmerDateObj;
    // Calculate difference
    const diffFromEpoch = ((khEpoch.monthIndex - 4) * 29 + khEpoch.getDayNumber()) -
        ((lunarDateLerngSak.month - 4) * 29 + lunarDateLerngSak.day);
    // Calculate days to subtract
    const daysToSubtract = diffFromEpoch + numberNewYearDay - 1;
    // Calculate new year date (Moha Songkran)
    const epochJdn = gregorianToJulianDay(epochLerngSakGreg.year, epochLerngSakGreg.month, epochLerngSakGreg.day);
    let newYearJdn = epochJdn - daysToSubtract;
    // Override with cache if available
    if (khNewYearMoments[ceYear]) {
        const [datePart, timePart] = khNewYearMoments[ceYear].split(' ');
        const [d, m, y] = datePart.split('-').map(Number);
        const [hr, min] = timePart.split(':').map(Number);
        // Update newYearInfo time
        newYearInfo.timeOfNewYear = { hour: hr, minute: min };
        // Update JDN based on cached date
        newYearJdn = gregorianToJulianDay(y, m, d);
    }
    const newYearDate = julianDayToGregorian(newYearJdn);
    const newYearMoment = new Date(newYearDate.year, newYearDate.month - 1, newYearDate.day, newYearInfo.timeOfNewYear.hour, newYearInfo.timeOfNewYear.minute);
    // Calculate Lerng Sak Date (Midnight)
    // Lerng Sak is the last day of NY celebration.
    // Jdn = newYearJdn + (numberNewYearDay - 1)
    const lerngSakJdn = newYearJdn + numberNewYearDay - 1;
    const lerngSakDate = julianDayToGregorian(lerngSakJdn);
    const lerngSakMoment = new Date(lerngSakDate.year, lerngSakDate.month - 1, lerngSakDate.day, 0, 0, 0); // Midnight
    const result = {
        newYearMoment,
        lerngSakMoment,
        newYearInfo: {
            year: newYearDate.year,
            month: newYearDate.month,
            day: newYearDate.day,
            hour: newYearInfo.timeOfNewYear.hour,
            minute: newYearInfo.timeOfNewYear.minute
        }
    };
    newYearInfoCache[ceYear] = result;
    return result;
}
function getKhmerNewYear(ceYear) {
    const info = getNewYearFullInfo(ceYear);
    return info.newYearInfo;
}
// ============================================================================
// Formatting Functions
// ============================================================================
function format(khmerData, formatString) {
    if (!formatString) {
        // Default format
        const { khmer } = khmerData;
        const moonDay = `${khmer.day}${khmer.moonPhaseName}`;
        return toKhmerNumeral(`ថ្ងៃ${khmer.dayOfWeekName} ${moonDay} ខែ${khmer.monthName} ឆ្នាំ${khmer.animalYearName} ${khmer.eraYearName} ពុទ្ធសករាជ ${khmer.beYear}`);
    }
    // Custom format
    const formatRules = {
        'W': () => khmerData.khmer.dayOfWeekName,
        'w': () => WeekdayNamesShort[khmerData.gregorian.dayOfWeek],
        'd': () => khmerData.khmer.day,
        'D': () => (khmerData.khmer.day < 10 ? '0' : '') + khmerData.khmer.day,
        'n': () => MoonStatusShort[khmerData.khmer.moonPhase],
        'N': () => khmerData.khmer.moonPhaseName,
        'o': () => MoonDaySymbols[khmerData._khmerDateObj.getDayNumber()],
        'm': () => khmerData.khmer.monthName,
        'M': () => SolarMonthNames[khmerData.gregorian.month - 1],
        'a': () => khmerData.khmer.animalYearName,
        'e': () => khmerData.khmer.eraYearName,
        'b': () => khmerData.khmer.beYear,
        'c': () => khmerData.gregorian.year,
        'j': () => khmerData.khmer.jsYear
    };
    const regex = new RegExp(Object.keys(formatRules).join('|'), 'g');
    const result = formatString.replace(regex, match => {
        const value = formatRules[match]();
        return toKhmerNumeral(String(value));
    });
    return result;
}
// ============================================================================
// Wrapper function for public API
function gregorianToKhmer(year, month, day, hour = 0, minute = 0, second = 0) {
    return gregorianToKhmerInternal(year, month, day, hour, minute, second, false);
}
// ============================================================================
// Public API
// ============================================================================
exports.momentkh = {
    // Conversion functions
    fromGregorian(year, month, day, hour = 0, minute = 0, second = 0) {
        return gregorianToKhmer(year, month, day, hour, minute, second);
    },
    fromKhmer(day, moonPhase, monthIndex, beYear) {
        return khmerToGregorian(day, moonPhase, monthIndex, beYear);
    },
    // New Year function
    getNewYear(ceYear) {
        return getKhmerNewYear(ceYear);
    },
    // Format function
    format(khmerData, formatString) {
        return format(khmerData, formatString);
    },
    // Utility for creating date from Date object
    fromDate(date) {
        return gregorianToKhmer(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    },
    // Convert Khmer to Date object
    toDate(day, moonPhase, monthIndex, beYear) {
        const greg = khmerToGregorian(day, moonPhase, monthIndex, beYear);
        return new Date(greg.year, greg.month - 1, greg.day);
    },
    // Constants export
    constants: {
        LunarMonths,
        LunarMonthNames,
        SolarMonthNames,
        AnimalYearNames,
        EraYearNames,
        WeekdayNames,
        MoonStatusNames
    },
    // Enums export for easier usage
    MoonPhase,
    MonthIndex,
    AnimalYear,
    EraYear,
    DayOfWeek
};
// Default export
exports.default = exports.momentkh;
