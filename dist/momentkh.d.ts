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
export declare enum MoonPhase {
    Waxing = 0,// កើត
    Waning = 1
}
export declare enum MonthIndex {
    Mikasar = 0,// មិគសិរ
    Bos = 1,// បុស្ស
    Meak = 2,// មាឃ
    Phalgun = 3,// ផល្គុន
    Chetr = 4,// ចេត្រ
    Visakh = 5,// ពិសាខ
    Jesth = 6,// ជេស្ឋ
    Asath = 7,// អាសាឍ
    Srap = 8,// ស្រាពណ៍
    Photrobot = 9,// ភទ្របទ
    Assoch = 10,// អស្សុជ
    Kadek = 11,// កត្ដិក
    BothmakAsath = 12,// បឋមាសាឍ
    TutiyakAsath = 13
}
export declare enum AnimalYear {
    Chhut = 0,// ជូត - Rat
    Chlov = 1,// ឆ្លូវ - Ox
    Khal = 2,// ខាល - Tiger
    Thos = 3,// ថោះ - Rabbit
    Rong = 4,// រោង - Dragon
    Masagn = 5,// ម្សាញ់ - Snake
    Momee = 6,// មមី - Horse
    Momae = 7,// មមែ - Goat
    Vok = 8,// វក - Monkey
    Roka = 9,// រកា - Rooster
    Cho = 10,// ច - Dog
    Kor = 11
}
export declare enum EraYear {
    Samridhisak = 0,// សំរឹទ្ធិស័ក
    Ekasak = 1,// ឯកស័ក
    Tosak = 2,// ទោស័ក
    Tresak = 3,// ត្រីស័ក
    Chatvasak = 4,// ចត្វាស័ក
    Panchasak = 5,// បញ្ចស័ក
    Chhasak = 6,// ឆស័ក
    Saptasak = 7,// សប្តស័ក
    Atthasak = 8,// អដ្ឋស័ក
    Novvasak = 9
}
export declare enum DayOfWeek {
    Sunday = 0,// អាទិត្យ
    Monday = 1,// ចន្ទ
    Tuesday = 2,// អង្គារ
    Wednesday = 3,// ពុធ
    Thursday = 4,// ព្រហស្បតិ៍
    Friday = 5,// សុក្រ
    Saturday = 6
}
export interface GregorianDate {
    year: number;
    month: number;
    day: number;
    hour?: number;
    minute?: number;
    second?: number;
    dayOfWeek?: number;
}
export interface KhmerDateInfo {
    day: number;
    moonPhase: MoonPhase;
    moonPhaseName: string;
    monthIndex: MonthIndex;
    monthName: string;
    beYear: number;
    jsYear: number;
    animalYear: AnimalYear;
    animalYearName: string;
    eraYear: EraYear;
    eraYearName: string;
    dayOfWeek: DayOfWeek;
    dayOfWeekName: string;
}
export interface KhmerConversionResult {
    gregorian: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
        dayOfWeek: number;
    };
    khmer: KhmerDateInfo;
    _khmerDateObj: KhmerDate;
}
export interface NewYearInfo {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}
export interface TimeInfo {
    hour: number;
    minute: number;
}
export interface SunInfo {
    sunInaugurationAsLibda: number;
    reasey: number;
    angsar: number;
    libda: number;
}
export interface NewYearInfoInternal {
    timeOfNewYear: TimeInfo;
    numberOfVanabatDays: number;
    newYearsDaySotins: SunInfo[];
}
export interface NewYearFullInfo {
    newYearMoment: Date;
    lerngSakMoment: Date;
    newYearInfo: NewYearInfo;
}
export interface MoonDayInfo {
    day: number;
    moonPhase: MoonPhase;
}
export interface Constants {
    LunarMonths: Record<string, number>;
    LunarMonthNames: string[];
    SolarMonthNames: string[];
    AnimalYearNames: string[];
    EraYearNames: string[];
    WeekdayNames: string[];
    MoonStatusNames: string[];
}
declare class KhmerDate {
    day: number;
    moonPhase: MoonPhase;
    monthIndex: MonthIndex;
    beYear: number;
    constructor(day: number, moonPhase: MoonPhase, monthIndex: MonthIndex, beYear: number);
    getDayNumber(): number;
    static fromDayNumber(dayNum: number): MoonDayInfo;
    addDays(count: number): KhmerDate;
    subtractDays(count: number): KhmerDate;
    toString(): string;
}
export declare const momentkh: {
    fromGregorian(year: number, month: number, day: number, hour?: number, minute?: number, second?: number): KhmerConversionResult;
    fromKhmer(day: number, moonPhase: MoonPhase | number, monthIndex: MonthIndex | number, beYear: number): GregorianDate;
    getNewYear(ceYear: number): NewYearInfo;
    format(khmerData: KhmerConversionResult, formatString?: string): string;
    fromDate(date: Date): KhmerConversionResult;
    toDate(day: number, moonPhase: MoonPhase | number, monthIndex: MonthIndex | number, beYear: number): Date;
    constants: {
        LunarMonths: Record<string, number>;
        LunarMonthNames: string[];
        SolarMonthNames: string[];
        AnimalYearNames: string[];
        EraYearNames: string[];
        WeekdayNames: string[];
        MoonStatusNames: string[];
    };
    MoonPhase: typeof MoonPhase;
    MonthIndex: typeof MonthIndex;
    AnimalYear: typeof AnimalYear;
    EraYear: typeof EraYear;
    DayOfWeek: typeof DayOfWeek;
};
export default momentkh;
//# sourceMappingURL=momentkh.d.ts.map