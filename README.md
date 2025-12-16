# 🇰🇭 MomentKH - Complete Khmer Calendar Library

**MomentKH** is a lightweight, zero-dependency JavaScript/TypeScript library for accurate Khmer (Cambodian) Lunar Calendar conversions. It provides a modern, standalone implementation with full TypeScript support.

[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com/ThyrithSor/momentkh)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-success.svg)]()

---

## 📑 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
  - [fromGregorian()](#fromgregorianyear-month-day-hour-minute-second)
  - [fromKhmer()](#fromkhmerday-moonphase-monthindex-beyear)
  - [fromDate()](#fromdatedateobject)
  - [toDate()](#todateday-moonphase-monthindex-beyear)
  - [getNewYear()](#getnewyearyear)
  - [format()](#formatkhmerdata-formatstring)
- [Understanding Khmer Calendar](#-understanding-khmer-calendar)
  - [Buddhist Era (BE) Year](#buddhist-era-be-year)
  - [Animal Year](#animal-year)
  - [Era Year (Sak)](#era-year-sak)
  - [When Each Year Type Increases](#when-each-year-type-increases)
- [Format Codes](#-format-codes)
- [Constants](#-constants)
- [Migration Guide](#-migration-guide-from-momentkh-v1)
- [Examples](#-examples)
- [Browser Support](#-browser-support)

---

## ✨ Features

- ✅ **Zero Dependencies** - Pure JavaScript, no external libraries required
- ✅ **TypeScript Support** - Full type definitions included for excellent IDE experience
- ✅ **Bidirectional Conversion** - Convert between Gregorian ↔ Khmer Lunar dates
- ✅ **Accurate Calculations** - Based on traditional Khmer astronomical algorithms
- ✅ **Khmer New Year** - Precise calculation of Moha Songkran timing
- ✅ **Flexible Formatting** - Customizable output with format tokens
- ✅ **Universal** - Works in Node.js, Browsers (ES5+), AMD, and ES Modules
- ✅ **Lightweight** - Single file (~36KB), no build step required
- ✅ **Well-Tested** - Comprehensive test suite with 1500+ test cases (100% pass rate)

---

## 📦 Installation

### NPM (Recommended)

```bash
npm install @thyrith/momentkh
```

### Direct Download

Download `momentkh.js` from the repository and include it in your project.

```bash
cp momentkh.js /path/to/your/project/
```

### TypeScript

Type definitions are included automatically when you install via NPM. For direct downloads, you can also use `momentkh.ts` or the compiled `.d.ts` files from the `dist/` folder.

---

## 🚀 Quick Start

### Browser (HTML)

```html
<script src="momentkh.js"></script>
<script>
  // Convert today to Khmer
  const today = new Date();
  const khmer = momentkh.fromDate(today);
  console.log(momentkh.format(khmer));
  // Output: ថ្ងៃចន្ទ ១០កើត ខែចេត្រ ឆ្នាំរោង ឆស័ក ពុទ្ធសករាជ ២៥៦៧
</script>
```

### Node.js (CommonJS)

```javascript
const momentkh = require("./momentkh");

// Convert specific date
const khmer = momentkh.fromGregorian(2024, 4, 14, 10, 30);
console.log(momentkh.format(khmer));

// Get Khmer New Year
const newYear = momentkh.getNewYear(2024);
console.log(newYear); // { year: 2024, month: 4, day: 13, hour: 22, minute: 24 }
```

### ES Modules

```javascript
import momentkh from "./momentkh.js";

const khmer = momentkh.fromDate(new Date());
console.log(momentkh.format(khmer));
```

### TypeScript

Full TypeScript support with complete type definitions:

```typescript
import momentkh, { KhmerConversionResult, NewYearInfo, GregorianDate } from "./momentkh";

// Convert with full type safety
const khmer: KhmerConversionResult = momentkh.fromGregorian(2024, 4, 14, 10, 30);
console.log(momentkh.format(khmer));

// Get New Year with typed result
const newYear: NewYearInfo = momentkh.getNewYear(2024);
console.log(`${newYear.year}-${newYear.month}-${newYear.day} ${newYear.hour}:${newYear.minute}`);

// Reverse conversion with types
const gregorianDate: GregorianDate = momentkh.fromKhmer(6, 0, 4, 2568);
console.log(`${gregorianDate.year}-${gregorianDate.month}-${gregorianDate.day}`);

// Access constants with full autocomplete
const monthName = momentkh.constants.LunarMonthNames[4]; // "ចេត្រ"
```

**Available Types:**
- `KhmerConversionResult` - Full conversion result object
- `GregorianDate` - Gregorian date object
- `KhmerDateInfo` - Khmer date information
- `NewYearInfo` - New Year timing information
- `Constants` - Calendar constants interface

---

## 📖 API Reference

### `fromGregorian(year, month, day, [hour], [minute], [second])`

Converts a Gregorian (Western) date to a Khmer Lunar date.

**Parameters:**
| Parameter | Type | Required | Range | Description |
|-----------|------|----------|-------|-------------|
| `year` | Number | Yes | Any | Gregorian year (e.g., 2024) |
| `month` | Number | Yes | 1-12 | **1-based** month (1=January, 12=December) |
| `day` | Number | Yes | 1-31 | Day of month |
| `hour` | Number | No | 0-23 | Hour (default: 0) |
| `minute` | Number | No | 0-59 | Minute (default: 0) |
| `second` | Number | No | 0-59 | Second (default: 0) |

**Returns:** Object

```javascript
{
  gregorian: {
    year: 2024,          // Number: Gregorian year
    month: 4,            // Number: Gregorian month (1-12)
    day: 14,             // Number: Day of month
    hour: 10,            // Number: Hour (0-23)
    minute: 30,          // Number: Minute (0-59)
    second: 0,           // Number: Second (0-59)
    dayOfWeek: 0         // Number: 0=Sunday, 1=Monday, ..., 6=Saturday
  },
  khmer: {
    day: 6,              // Number: Lunar day (1-15)
    moonPhase: 0,        // Number: 0=កើត (waxing), 1=រោច (waning)
    monthIndex: 4,       // Number: Month index (0-13, see table below)
    monthName: 'ចេត្រ',  // String: Khmer month name
    beYear: 2568,        // Number: Buddhist Era year
    jsYear: 1386,        // Number: Jolak Sakaraj (Chula Sakaraj) year
    animalYear: 'រោង',   // String: Animal year name
    eraYear: 'ឆស័ក',     // String: Era/Sak name
    dayOfWeek: 'អាទិត្យ' // String: Khmer weekday name
  },
  _khmerDateObj: KhmerDate // Internal: KhmerDate object (for advanced use)
}
```

**Example:**

```javascript
const result = momentkh.fromGregorian(2024, 4, 14);
console.log(result.khmer.beYear); // 2568
console.log(result.khmer.monthName); // 'ចេត្រ'
console.log(result.khmer.animalYear); // 'រោង'
```

---

### `fromKhmer(day, moonPhase, monthIndex, beYear)`

Converts a Khmer Lunar date to a Gregorian date.

**Parameters:**
| Parameter | Type | Required | Range | Description |
|-----------|------|----------|-------|-------------|
| `day` | Number | Yes | 1-15 | Lunar day number within the phase |
| `moonPhase` | Number | Yes | 0 or 1 | 0 = កើត (waxing), 1 = រោច (waning) |
| `monthIndex` | Number | Yes | 0-13 | Khmer month index (see table below) |
| `beYear` | Number | Yes | Any | Buddhist Era year (e.g., 2568) |

**Lunar Month Indices:**
| Index | Khmer Name | Notes |
|-------|------------|-------|
| 0 | មិគសិរ (Migasir) | |
| 1 | បុស្ស (Boss) | |
| 2 | មាឃ (Meak) | |
| 3 | ផល្គុន (Phalkun) | |
| 4 | ចេត្រ (Cheit) | |
| 5 | ពិសាខ (Pisakh) | Contains Visakha Bochea (15កើត) |
| 6 | ជេស្ឋ (Jesth) | Can have leap day (30 days instead of 29) |
| 7 | អាសាឍ (Asadh) | |
| 8 | ស្រាពណ៍ (Srap) | |
| 9 | ភទ្របទ (Phatrabot) | |
| 10 | អស្សុជ (Assoch) | |
| 11 | កក្ដិក (Kadeuk) | |
| 12 | បឋមាសាឍ (Pathamasadh) | Only exists in leap month years |
| 13 | ទុតិយាសាឍ (Tutiyasadh) | Only exists in leap month years |

**Returns:** Object

```javascript
{
  year: 2024,   // Number: Gregorian year
  month: 4,     // Number: Gregorian month (1-12)
  day: 14       // Number: Day of month
}
```

**Example:**

```javascript
// Convert 6កើត ខែចេត្រ ព.ស.២៥៦៨ to Gregorian
const gregorian = momentkh.fromKhmer(6, 0, 4, 2568);
console.log(gregorian); // { year: 2024, month: 4, day: 14 }
```

**Important Notes:**

- `day` represents the day number within the moon phase (always 1-15)
- `moonPhase` 0 = កើត (waxing, days 1-15), 1 = រោច (waning, days 1-14 or 1-15)
- A full lunar month is typically 29-30 days total
- Example: "៨រោច" means day=8, moonPhase=1

---

### `fromDate(dateObject)`

Convenience method to convert a JavaScript `Date` object to Khmer date.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateObject` | Date | Yes | JavaScript Date object |

**Returns:** Same object structure as `fromGregorian()`

**Example:**

```javascript
const now = new Date();
const khmer = momentkh.fromDate(now);
console.log(momentkh.format(khmer));
```

---

### `toDate(day, moonPhase, monthIndex, beYear)`

Converts a Khmer Lunar date directly to a JavaScript `Date` object.

**Parameters:** Same as `fromKhmer()`

**Returns:** JavaScript `Date` object

**Example:**

```javascript
// Convert 1កើត ខែបុស្ស ព.ស.២៤៤៣ to Date object
const date = momentkh.toDate(1, 0, 1, 2443);
console.log(date); // JavaScript Date for 1900-01-01
```

---

### `getNewYear(year)`

Calculates the exact date and time of **Moha Songkran** (មហាសង្រ្កាន្ត) - the Khmer New Year - for a given Gregorian year.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `year` | Number | Yes | Gregorian year (e.g., 2024) |

**Returns:** Object

```javascript
{
  year: 2024,    // Number: Gregorian year
  month: 4,      // Number: Gregorian month (1-12)
  day: 13,       // Number: Day of month
  hour: 22,      // Number: Hour (0-23)
  minute: 24     // Number: Minute (0-59)
}
```

**Example:**

```javascript
const ny2024 = momentkh.getNewYear(2024);
console.log(
  `Khmer New Year 2024: ${ny2024.day}/${ny2024.month}/${ny2024.year} at ${
    ny2024.hour
  }:${String(ny2024.minute).padStart(2, "0")}`
);
// Output: Khmer New Year 2024: 13/4/2024 at 22:24

// Loop through multiple years
for (let year = 2020; year <= 2025; year++) {
  const ny = momentkh.getNewYear(year);
  console.log(
    `${year}: ${ny.day}/${ny.month} ${ny.hour}:${String(ny.minute).padStart(
      2,
      "0"
    )}`
  );
}
```

---

### `format(khmerData, [formatString])`

Formats a Khmer date object into a string with optional custom formatting.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `khmerData` | Object | Yes | Result from `fromGregorian()` or `fromDate()` |
| `formatString` | String | No | Custom format (see tokens below). If omitted, uses default format |

**Default Format:**

```
ថ្ងៃ{weekday} {day}{moonPhase} ខែ{month} ឆ្នាំ{animalYear} {eraYear} ពុទ្ធសករាជ {beYear}
```

**Returns:** String (formatted Khmer date)

**Example:**

```javascript
const khmer = momentkh.fromGregorian(2024, 4, 14);

// Default format
console.log(momentkh.format(khmer));
// ថ្ងៃអាទិត្យ ៦កើត ខែចេត្រ ឆ្នាំរោង ឆស័ក ពុទ្ធសករាជ ២៥៦៨

// Custom formats
console.log(momentkh.format(khmer, "dN ថ្ងៃW ខែm"));
// ៦កើត ថ្ងៃអាទិត្យ ខែចេត្រ

console.log(momentkh.format(khmer, "c/M/D"));
// ២០២៤/មេសា/១៤

console.log(momentkh.format(khmer, "ថ្ងៃw dN m ឆ្នាំa e ព.ស.b"));
// ថ្ងៃអា ៦កើត ចេត្រ ឆ្នាំរោង ឆស័ក ព.ស.២៥៦៨
```

---

## 🧮 Understanding Khmer Calendar

The Khmer calendar is a **lunisolar calendar** that tracks both the moon phases and the solar year. It uses **three different year numbering systems** that change at different times:

### Buddhist Era (BE) Year

**Full Name:** ពុទ្ធសករាជ (Putthsak, Buddhist Era)
**Offset from Gregorian:** +543 or +544
**When it increases:** Right after midnight (00:01) on the **15th waxing day of Pisakh month** (១៥កើត ខែពិសាខ)

**Example Timeline:**

```
2024-05-22 23:59 → 14កើត Pisakh, BE 2567
2024-05-23 00:00 → 15កើត Pisakh, BE 2567 (OLD year)
2024-05-23 00:01 → 15កើត Pisakh, BE 2568 (NEW year starts!)
2024-05-23 23:59 → 15កើត Pisakh, BE 2568
2024-05-24 00:00 → 1រោច Pisakh, BE 2568
```

**Important:**

- The 15th waxing day of Pisakh is **Visakha Bochea** (ពិសាខបូជា), celebrating Buddha's birth, enlightenment, and death
- At midnight (00:00) of this sacred day, it's still the old BE year
- At 00:01 onwards, the new BE year begins
- The year changes ON the sacred day itself, not the day after

**Code Example:**

```javascript
// Check BE year transition
const before = momentkh.fromGregorian(2024, 5, 23, 0, 0); // Midnight
const after = momentkh.fromGregorian(2024, 5, 23, 0, 1); // 00:01

console.log(before.khmer.beYear); // 2567 (old year at midnight)
console.log(after.khmer.beYear); // 2568 (new year at 00:01)
```

---

### Animal Year

**Full Name:** ឆ្នាំ + Animal name (Year of the [Animal])
**Cycle:** 12 years
**When it increases:** At the exact moment of **Moha Songkran** (មហាសង្រ្កាន្ត) - Khmer New Year

**The 12 Animals (in order):**
| Index | Khmer | Pronunciation | Animal |
|-------|-------|---------------|--------|
| 0 | ជូត | Chhūt | Rat |
| 1 | ឆ្លូវ | Chhlūv | Ox |
| 2 | ខាល | Khāl | Tiger |
| 3 | ថោះ | Thaŏh | Rabbit |
| 4 | រោង | Rōng | Dragon |
| 5 | ម្សាញ់ | Msanh | Snake |
| 6 | មមីរ | Momi | Horse |
| 7 | មមែ | Momè | Goat |
| 8 | វក | Vŏk | Monkey |
| 9 | រកា | Rŏka | Rooster |
| 10 | ច | Châ | Dog |
| 11 | កុរ | Kŏr | Pig |

**Example Timeline:**

```
2024-04-13 22:23 → Cheit month, BE 2567, Animal Year: វក (Monkey)
2024-04-13 22:24 → Cheit month, BE 2567, Animal Year: រកា (Rooster) ← NEW YEAR!
2024-04-13 22:25 → Cheit month, BE 2567, Animal Year: រកា (Rooster)
```

**Code Example:**

```javascript
const ny = momentkh.getNewYear(2024);
console.log(ny); // { year: 2024, month: 4, day: 13, hour: 22, minute: 24 }

// Just before New Year
const before = momentkh.fromGregorian(2024, 4, 13, 22, 23);
console.log(before.khmer.animalYear); // 'វក' (Monkey)

// Right at New Year
const at = momentkh.fromGregorian(2024, 4, 13, 22, 24);
console.log(at.khmer.animalYear); // 'រកា' (Rooster) - Changed!
```

---

### Era Year (Sak)

**Full Name:** ស័ក (Sak, Era)
**Cycle:** 10 years
**When it increases:** At **midnight (00:00) of the last day** of Khmer New Year celebration (Lerng Sak - ថ្ងៃឡើងស័ក)

**The 10 Eras (in order):**
| Index | Khmer | Romanization |
|-------|-------|--------------|
| 0 | សំរឹទ្ធិស័ក | Samrech Sak |
| 1 | ឯកស័ក | Aek Sak |
| 2 | ទោស័ក | To Sak |
| 3 | ត្រីស័ក | Trei Sak |
| 4 | ចត្វាស័ក | Chattva Sak |
| 5 | បញ្ចស័ក | Pañcha Sak |
| 6 | ឆស័ក | Chha Sak |
| 7 | សប្តស័ក | Sapta Sak |
| 8 | អដ្ឋស័ក | Attha Sak |
| 9 | នព្វស័ក | Nappa Sak |

**New Year Celebration Days:**

- **Day 1:** Moha Songkran (មហាសង្រ្កាន្ត) - New Year's Day
- **Day 2:** Virak Wanabat (វីរៈវ័នបត) - Second day
- **Day 3 or 4:** Lerng Sak (ថ្ងៃឡើងស័ក) - Last day & Era change day

**Example:**

```javascript
// 2024 New Year is on April 13, 22:24
// Lerng Sak (Era change) is typically 3-4 days later at midnight

const newYearDay = momentkh.fromGregorian(2024, 4, 13, 23, 0);
console.log(newYearDay.khmer.eraYear); // 'ឆស័ក' (still old era)

const lerngSakDay = momentkh.fromGregorian(2024, 4, 17, 0, 0); // Midnight of Lerng Sak
console.log(lerngSakDay.khmer.eraYear); // 'សប្តស័ក' (new era!)
```

---

### When Each Year Type Increases

**Summary Table:**

| Year Type       | Changes At            | Example Date/Time    |
| --------------- | --------------------- | -------------------- |
| **BE Year**     | 00:00 on ១រោច ខែពិសាខ | May 23, 2024 00:00   |
| **Animal Year** | ម៉ោង និង នាទីទេវតាចុះ | April 13, 2024 22:17 |
| **Era Year**    | 00:00 នៅថ្ងៃឡើងស័ក    | April 16, 2024 00:00 |

**Visual Timeline for 2024:**

```
April 13, 22:23 → BE 2567, Monkey (វក), Old Era (ឆស័ក)
April 13, 22:24 → BE 2567, Rooster (រកា), Old Era (ឆស័ក) ← Animal Year changes
April 17, 00:00 → BE 2567, Rooster (រកា), New Era (សប្តស័ក) ← Era changes
May 23, 00:00   → BE 2567, Rooster (រកា), New Era (សប្តស័ក)
May 23, 00:01   → BE 2568, Rooster (រកា), New Era (សប្តស័ក) ← BE Year changes
```

---

## 🎨 Format Codes

Complete list of format tokens for the `format()` function:

| Token               | Output            | Description                 | Example               |
| ------------------- | ----------------- | --------------------------- | --------------------- |
| **Date Components** |
| `W`                 | ថ្ងៃនៃសប្តាហ៍ពេញ  | Weekday name (full)         | អាទិត្យ, ចន្ទ, អង្គារ |
| `w`                 | ថ្ងៃនៃសប្តាហ៍ខ្លី | Weekday name (short)        | អា, ច, អ              |
| `d`                 | ថ្ងៃទី            | Lunar day number            | ១, ៥, ១៥              |
| `D`                 | ថ្ងៃទី (២ខ្ទង់)   | Lunar day (zero-padded)     | ០១, ០៥, ១៥            |
| **Moon Phase**      |
| `n`                 | កើត/រោច (ខ្លី)    | Moon phase (short)          | ក, រ                  |
| `N`                 | កើត/រោច (ពេញ)     | Moon phase (full)           | កើត, រោច              |
| `o`                 | និមិត្តសញ្ញា      | Moon day symbol             | ᧡, ᧢, ᧣ ... ᧿         |
| **Month Names**     |
| `m`                 | ខែចន្ទគតិ         | Lunar month name            | មិគសិរ, បុស្ស, ចេត្រ  |
| `M`                 | ខែសុរិយគតិ        | Solar month name            | មករា, កុម្ភៈ, មេសា    |
| **Year Components** |
| `a`                 | ឆ្នាំសត្វ         | Animal year                 | ជូត, ឆ្លូវ, រោង       |
| `e`                 | ស័ក               | Era year                    | ឯកស័ក, ទោស័ក          |
| `b`                 | ព.ស.              | Buddhist Era year           | ២៥៦៨                  |
| `c`                 | គ.ស.              | Common Era (Gregorian) year | ២០២៤                  |
| `j`                 | ច.ស.              | Jolak Sakaraj year          | ១៣៨៦                  |

**Format Examples:**

```javascript
const khmer = momentkh.fromGregorian(2024, 4, 14);

console.log(momentkh.format(khmer, "W, dN ខែm ព.ស.b"));
// អាទិត្យ, ៦កើត ខែចេត្រ ព.ស.២៥៦៨

console.log(momentkh.format(khmer, "c/M/D ថ្ងៃw"));
// ២០២៤/មេសា/១៤ ថ្ងៃអា

console.log(momentkh.format(khmer, "ឆ្នាំa e ខែm ថ្ងៃទីd មានព្រះចន្ទN"));
// ឆ្នាំរោង ឆស័ក ខែចេត្រ ថ្ងៃទី៦ មានព្រះចន្ទកើត

console.log(momentkh.format(khmer, "ថ្ងៃទី o"));
// ថ្ងៃទី ᧦ (moon symbol for day 6 waxing)
```

---

## 📚 Constants

Access Khmer calendar constants through `momentkh.constants`:

```javascript
// Lunar month names array (indices 0-13)
momentkh.constants.LunarMonthNames;
// ['មិគសិរ', 'បុស្ស', 'មាឃ', 'ផល្គុន', 'ចេត្រ', 'ពិសាខ', 'ជេស្ឋ', 'អាសាឍ',
//  'ស្រាពណ៍', 'ភទ្របទ', 'អស្សុជ', 'កក្ដិក', 'បឋមាសាឍ', 'ទុតិយាសាឍ']

// Solar month names array (indices 0-11)
momentkh.constants.SolarMonthNames;
// ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
//  'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ']

// Animal year names array (indices 0-11)
momentkh.constants.AnimalYearNames;
// ['ជូត', 'ឆ្លូវ', 'ខាល', 'ថោះ', 'រោង', 'ម្សាញ់',
//  'មមីរ', 'មមែ', 'វក', 'រកា', 'ច', 'កុរ']

// Era year names array (indices 0-9)
momentkh.constants.EraYearNames;
// ['សំរឹទ្ធិស័ក', 'ឯកស័ក', 'ទោស័ក', 'ត្រីស័ក', 'ចត្វាស័ក',
//  'បញ្ចស័ក', 'ឆស័ក', 'សប្តស័ក', 'អដ្ឋស័ក', 'នព្វស័ក']

// Weekday names array (indices 0-6, Sunday-Saturday)
momentkh.constants.WeekdayNames;
// ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍']

// Moon phase names array (indices 0-1)
momentkh.constants.MoonStatusNames;
// ['កើត', 'រោច']
```

**Usage Example:**

```javascript
// Get month name by index
const monthName = momentkh.constants.LunarMonthNames[4];
console.log(monthName); // 'ចេត្រ'

// Loop through all animal years
momentkh.constants.AnimalYearNames.forEach((animal, index) => {
  console.log(`${index}: ${animal}`);
});
```

---

## 🔄 Migration Guide from MomentKH v1

If you're using the original `momentkh` library (v1) that extends moment.js, here's how to migrate:

### Installation Changes

**Before (v1):**

```bash
npm install moment --save
npm install @thyrith/momentkh --save
```

**After (v2):**

```bash
# Just download momentkh.js - no npm dependencies!
```

### Import Changes

**Before (v1):**

```javascript
const moment = require("moment");
require("@thyrith/momentkh")(moment);
```

**After (v2):**

```javascript
const momentkh = require("./momentkh");
```

### API Migration

#### Converting Today's Date

**Before (v1):**

```javascript
const moment = require("moment");
require("@thyrith/momentkh")(moment);

const today = moment();
const khmerDate = today.toKhDate();
console.log(khmerDate);
```

**After (v2):**

```javascript
const momentkh = require("./momentkh");

const today = new Date();
const khmer = momentkh.fromDate(today);
const khmerDate = momentkh.format(khmer);
console.log(khmerDate);
```

#### Converting Specific Date

**Before (v1):**

```javascript
const m = moment("2024-04-14", "YYYY-MM-DD");
console.log(m.toKhDate());
```

**After (v2):**

```javascript
const khmer = momentkh.fromGregorian(2024, 4, 14);
console.log(momentkh.format(khmer));
```

#### Getting Khmer Day/Month/Year

**Before (v1):**

```javascript
const m = moment();
console.log(m.khDay()); // Day index (0-29)
console.log(m.khMonth()); // Month index (0-13)
console.log(m.khYear()); // BE year
```

**After (v2):**

```javascript
const khmer = momentkh.fromDate(new Date());
console.log(khmer._khmerDateObj.getDayNumber()); // Day number (0-29)
console.log(khmer.khmer.monthIndex); // Month index (0-13)
console.log(khmer.khmer.beYear); // BE year

// Or access individual components
console.log(khmer.khmer.day); // Day in phase (1-15)
console.log(khmer.khmer.moonPhase); // 0=កើត, 1=រោច
```

#### Custom Formatting

**Before (v1):**

```javascript
const m = moment("1992-03-04", "YYYY-MM-DD");
console.log(m.toLunarDate("dN ថ្ងៃW ខែm ព.ស. b"));
// ៦កើត ថ្ងៃព្រហស្បតិ៍ ខែមិគសិរ ព.ស. ២៥៦២
```

**After (v2):**

```javascript
const khmer = momentkh.fromGregorian(1992, 3, 4);
console.log(momentkh.format(khmer, "dN ថ្ងៃW ខែm ព.ស. b"));
// ៦កើត ថ្ងៃព្រហស្បតិ៍ ខែមិគសិរ ព.ស. ២៥៣៥
```

#### Getting Khmer New Year

**Before (v1):**

```javascript
const nyMoment = moment.getKhNewYearMoment(2024);
console.log(nyMoment.format("YYYY-MM-DD HH:mm"));
```

**After (v2):**

```javascript
const ny = momentkh.getNewYear(2024);
console.log(`${ny.year}-${ny.month}-${ny.day} ${ny.hour}:${ny.minute}`);
```

### Feature Comparison

| Feature               | MomentKH v1                | MomentKH v3           |
| --------------------- | -------------------------- | --------------------- |
| **Dependencies**      | Requires moment.js (~50KB) | Zero dependencies     |
| **File Size**         | Multiple files             | Single file (~35KB)   |
| **Setup**             | Initialize with moment     | Direct import/require |
| **API Style**         | Extends moment.js          | Standalone functions  |
| **Khmer → Gregorian** | ❌ Not supported           | ✅ Fully supported    |
| **Browser Support**   | Modern browsers            | ES5+ (IE11+)          |
| **TypeScript**        | No types                   | ✅ Full TypeScript support |

### Quick Reference Table

| Task               | MomentKH v1                       | MomentKH v3                                                  |
| ------------------ | --------------------------------- | ------------------------------------------------------------ |
| Convert to Khmer   | `moment().toKhDate()`             | `momentkh.format(momentkh.fromDate(new Date()))`             |
| Get BE year        | `moment().khYear()`               | `momentkh.fromDate(new Date()).khmer.beYear`                 |
| Get month          | `moment().khMonth()`              | `momentkh.fromDate(new Date()).khmer.monthIndex`             |
| Get day number     | `moment().khDay()`                | `momentkh.fromDate(new Date())._khmerDateObj.getDayNumber()` |
| Custom format      | `moment().toLunarDate('format')`  | `momentkh.format(khmer, 'format')`                           |
| New Year           | `moment.getKhNewYearMoment(year)` | `momentkh.getNewYear(year)`                                  |
| Reverse conversion | ❌ Not available                  | `momentkh.fromKhmer(day, phase, month, year)`                |

---

## 💡 Examples

### Example 1: Display Today's Date in Khmer

```javascript
const today = momentkh.fromDate(new Date());
console.log(momentkh.format(today));
// ថ្ងៃសុក្រ ១០កើត ខែចេត្រ ឆ្នាំរោង ឆស័ក ពុទ្ធសករាជ ២៥៦៨
```

### Example 2: Convert Specific Date

```javascript
// Convert April 14, 2024
const khmer = momentkh.fromGregorian(2024, 4, 14);

console.log(
  "Gregorian:",
  `${khmer.gregorian.day}/${khmer.gregorian.month}/${khmer.gregorian.year}`
);
console.log("BE Year:", khmer.khmer.beYear);
console.log("Animal Year:", khmer.khmer.animalYear);
console.log("Era:", khmer.khmer.eraYear);
console.log("Month:", khmer.khmer.monthName);
console.log(
  "Day:",
  khmer.khmer.day + (khmer.khmer.moonPhase === 0 ? "កើត" : "រោច")
);

// Output:
// Gregorian: 14/4/2024
// BE Year: 2568
// Animal Year: រោង
// Era: ឆស័ក
// Month: ចេត្រ
// Day: 6កើត
```

### Example 3: Round-Trip Conversion

```javascript
// Convert Gregorian to Khmer
const gregorianDate = { year: 2024, month: 4, day: 14 };
const khmer = momentkh.fromGregorian(
  gregorianDate.year,
  gregorianDate.month,
  gregorianDate.day
);

console.log(
  "Original:",
  `${gregorianDate.year}-${gregorianDate.month}-${gregorianDate.day}`
);
console.log("Khmer:", momentkh.format(khmer));

// Convert back to Gregorian
const backToGregorian = momentkh.fromKhmer(
  khmer.khmer.day,
  khmer.khmer.moonPhase,
  khmer.khmer.monthIndex,
  khmer.khmer.beYear
);

console.log(
  "Converted back:",
  `${backToGregorian.year}-${backToGregorian.month}-${backToGregorian.day}`
);
console.log(
  "Match:",
  gregorianDate.year === backToGregorian.year &&
    gregorianDate.month === backToGregorian.month &&
    gregorianDate.day === backToGregorian.day
    ? "✓"
    : "✗"
);
```

### Example 4: Find All New Years in Range

```javascript
console.log("Khmer New Years 2020-2025:\n");

for (let year = 2020; year <= 2025; year++) {
  const ny = momentkh.getNewYear(year);
  const khmer = momentkh.fromGregorian(
    ny.year,
    ny.month,
    ny.day,
    ny.hour,
    ny.minute
  );

  console.log(`${year} (ឆ្នាំ${khmer.khmer.animalYear}):`);
  console.log(`  Date: ${ny.day}/${ny.month}/${ny.year}`);
  console.log(`  Time: ${ny.hour}:${String(ny.minute).padStart(2, "0")}`);
  console.log(`  Khmer: ${momentkh.format(khmer, "dN ខែm")}\n`);
}
```

### Example 5: Calendar Display for a Month

```javascript
function displayKhmerMonth(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();

  console.log(`\nKhmer Calendar for ${year}/${month}:\n`);
  console.log("Gregorian\tKhmer Date");
  console.log("-".repeat(50));

  for (let day = 1; day <= daysInMonth; day++) {
    const khmer = momentkh.fromGregorian(year, month, day);
    const formatted = momentkh.format(khmer, "dN m");
    console.log(`${year}/${month}/${day}\t\t${formatted}`);
  }
}

// Display April 2024
displayKhmerMonth(2024, 4);
```

### Example 6: Check BE Year Transition

```javascript
// Find the exact moment BE year changes
const year = 2024;

// Search in May for Visakha Bochea
for (let day = 20; day <= 25; day++) {
  const midnight = momentkh.fromGregorian(year, 5, day, 0, 0);
  const morning = momentkh.fromGregorian(year, 5, day, 0, 1);

  if (
    midnight.khmer.day === 15 &&
    midnight.khmer.moonPhase === 0 &&
    midnight.khmer.monthIndex === 5
  ) {
    console.log(`Found Visakha Bochea: ${year}-05-${day}`);
    console.log(`At 00:00 - BE ${midnight.khmer.beYear}`);
    console.log(`At 00:01 - BE ${morning.khmer.beYear}`);
    console.log(
      `Year changed: ${
        midnight.khmer.beYear !== morning.khmer.beYear ? "YES" : "NO"
      }`
    );
  }
}
```

---

## 🌐 Browser Support

| Browser | Version      | Status                        |
| ------- | ------------ | ----------------------------- |
| Chrome  | All versions | ✅ Supported                  |
| Firefox | All versions | ✅ Supported                  |
| Safari  | All versions | ✅ Supported                  |
| Edge    | All versions | ✅ Supported                  |
| IE      | 11+          | ✅ Supported (ES5 compatible) |
| Node.js | 8.0+         | ✅ Supported                  |

**ES5 Compatibility:** The library is written in ES5-compatible JavaScript and works in older browsers including IE11.

---

## 📝 License

MIT License - Same as original momentkh

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

---

## 🙏 Credits & References

- **Original momentkh library** by [Thyrith Sor](https://github.com/ThyrithSor)
- **Algorithm based on:**
  - Traditional Khmer astronomical calculations
  - "Pratitin Soryakkatik-Chankatik 1900-1999" by Mr. Roath Kim Soeun
  - Khmer calendar C++ reference implementation
- **Resources:**
  - [CAM-CC: Khmer Calendar](http://www.cam-cc.org)
  - [Dahlina: Khmer New Year Calculation](http://www.dahlina.com/education/khmer_new_year_time.html)

---

## 🐛 Bug Reports & Contributing

Found a bug or have a suggestion? Please:

1. Check existing issues on GitHub
2. Run the test suite: `node test_conversion_roundtrip.js`
3. Create a detailed bug report with:
   - Input date
   - Expected output
   - Actual output
   - Steps to reproduce

**Running Tests:**

```bash
# Run round-trip conversion test (1000 random dates)
node test_conversion_roundtrip.js

# Run comparison test (compare with momentkh v1)
node test_comparision2.js

# Run specific date tests
node test_specific_dates.js
```

---

## 📞 Support

- **Documentation:** See examples folder (`newYearMoment.js`, `index.html`)
- **Issues:** [GitHub Issues](https://github.com/ThyrithSor/momentkh/issues)
- **Comparison:** Check behavior against original momentkh for compatibility

---

**Version:** 3.0.0
**Last Updated:** December 2024
**Status:** Production Ready ✅
