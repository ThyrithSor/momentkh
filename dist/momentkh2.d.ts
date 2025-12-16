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
    moonPhase: number;
    monthIndex: number;
    monthName: string;
    beYear: number;
    jsYear: number;
    animalYear: string;
    eraYear: string;
    dayOfWeek: string;
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
    moonPhase: number;
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
    moonPhase: number;
    monthIndex: number;
    beYear: number;
    constructor(day: number, moonPhase: number, monthIndex: number, beYear: number);
    getDayNumber(): number;
    static fromDayNumber(dayNum: number): MoonDayInfo;
    addDays(count: number): KhmerDate;
    subtractDays(count: number): KhmerDate;
    toString(): string;
}
export declare const momentkh2: {
    fromGregorian(year: number, month: number, day: number, hour?: number, minute?: number, second?: number): KhmerConversionResult;
    fromKhmer(day: number, moonPhase: number, monthIndex: number, beYear: number): GregorianDate;
    getNewYear(ceYear: number): NewYearInfo;
    format(khmerData: KhmerConversionResult, formatString?: string): string;
    fromDate(date: Date): KhmerConversionResult;
    toDate(day: number, moonPhase: number, monthIndex: number, beYear: number): Date;
    constants: {
        LunarMonths: Record<string, number>;
        LunarMonthNames: string[];
        SolarMonthNames: string[];
        AnimalYearNames: string[];
        EraYearNames: string[];
        WeekdayNames: string[];
        MoonStatusNames: string[];
    };
};
export default momentkh2;
//# sourceMappingURL=momentkh2.d.ts.map