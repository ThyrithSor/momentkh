# 🇰🇭 MomentKH - Complete Khmer Calendar Library

**MomentKH** is a lightweight, zero-dependency JavaScript/TypeScript library for accurate Khmer (Cambodian) Lunar Calendar conversions. It provides a modern, standalone implementation with full TypeScript support.

[🎮 **Live Demo Playground**](https://thyrithsor.github.io/momentkh/)

[![Version](https://img.shields.io/badge/version-3.0.3-blue.svg)](https://github.com/ThyrithSor/momentkh)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-success.svg)](https://github.com/ThyrithSor/momentkh)

---

## ⚡ TLDR - Quick Start

```javascript
// Import
const momentkh = require("@thyrith/momentkh");

// Convert date to Khmer format (default)
const khmer = momentkh.fromDate(new Date());
console.log(momentkh.format(khmer));
// Output: ថ្ងៃពុធ ១២រោច ខែមិគសិរ ឆ្នាំម្សាញ់ សប្តស័ក ពុទ្ធសករាជ ២៥៦៩

// Convert from gregorian data (ថ្ងៃសុរិយគតិ) to Khmer format
const date = momentkh.fromGregorian(2025, 12, 10); // ថ្ងៃទី១០ ខែធ្នូ ឆ្នាំ២០២៥
// or 
// const khmer = momentkh.fromGregorian(2025, 12, 10, 0, 0, 0); // (year, month, day, hour = 0, minute = 0, second = 0)
console.log(momentkh.format(date));
// Output: ថ្ងៃពុធ ៥រោច ខែមិគសិរ ឆ្នាំម្សាញ់ សប្តស័ក ពុទ្ធសករាជ ២៥៦៩

// Convert date to Khmer format (custom)
console.log(momentkh.format(date, "ប្រាសាទតាក្របីត្រូវបានចោរសៀមបាញ់បំផ្លាញទាំងស្រុង នៅថ្ងៃW ទីdsr ខែM ឆ្នាំcr ត្រូវនឹង ថ្ងៃទីDN ខែm ឆ្នាំa e ពុទ្ធសករាជ b។"));
// Output: ប្រាសាទតាក្របីត្រូវបានចោរសៀមបាញ់បំផ្លាញទាំងស្រុង នៅថ្ងៃពុធ ទី10 ខែធ្នូ ឆ្នាំ2025 ត្រូវនឹង ថ្ងៃទី០៥រោច ខែមិគសិរ ឆ្នាំម្សាញ់ សប្តស័ក ពុទ្ធសករាជ ២៥៦៩។

// Convert Khmer date to Gregorian
const gregorian = momentkh.fromKhmer(15, momentkh.MoonPhase.Waxing, momentkh.MonthIndex.Pisakh, 2568); // 15កើត ខែពិសាខ ព.ស.២៥៦៨
console.log(gregorian);
// Output: { year: 2025, month: 5, day: 11 }

// Get Khmer New Year
const newYear = momentkh.getNewYear(2025);
console.log(newYear);
// Output: { year: 2025, month: 4, day: 14, hour: 4, minute: 48 }
```

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
- [Using Enums (NEW in v3.0)](#-using-enums-new-in-v30)
- [Understanding Khmer Calendar](#-understanding-khmer-calendar)
  - [Buddhist Era (BE) Year](#buddhist-era-be-year)
  - [Animal Year](#animal-year)
  - [Sak](#sak-year-sak)
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
- ✅ **Type-Safe Enums** - NEW in v3.0! Use enums for moonPhase, monthIndex, animalYear, sak, and dayOfWeek
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

### TypeScript

Type definitions are included automatically when you install via NPM. For direct downloads, you can also use `momentkh.ts` or the compiled `.d.ts` files from the `dist/` folder.

---

## 🚀 Quick Start

### Browser (HTML)

```html
<!-- Include the browser-compatible UMD bundle -->
<script src="https://cdn.jsdelivr.net/gh/ThyrithSor/momentkh@3.0.3/momentkh.js"></script>
<script>
  // Convert today to Khmer
  const today = new Date();
  const khmer = momentkh.fromDate(today);
  console.log(momentkh.format(khmer));
  // Output: ថ្ងៃពុធ ១២រោច ខែមិគសិរ ឆ្នាំម្សាញ់ សប្តស័ក ពុទ្ធសករាជ ២៥៦៩
</script>
```

> **Note:** Use `momentkh.js` (UMD bundle) for browsers. The `dist/momentkh.js` is CommonJS format for Node.js.

### Node.js (CommonJS)

```javascript
// Use the CommonJS module from dist/
const momentkh = require("@thyrith/momentkh");

// Convert specific date
const khmer = momentkh.fromGregorian(2024, 4, 14, 10, 30);
console.log(momentkh.format(khmer));

// Get Khmer New Year
const newYear = momentkh.getNewYear(2024);
console.log(newYear); // { year: 2024, month: 4, day: 13, hour: 22, minute: 17 }
```

### ES Modules

```javascript
import momentkh from "@thyrith/momentkh";

const khmer = momentkh.fromDate(new Date());
console.log(momentkh.format(khmer));
```

### TypeScript

Full TypeScript support with complete type definitions and enums:

```typescript
import momentkh, {
  KhmerConversionResult,
  NewYearInfo,
  GregorianDate,
  MoonPhase,
  MonthIndex,
  AnimalYear,
  Sak,
  DayOfWeek,
} from "@thyrith/momentkh";

// Convert with full type safety
const khmer: KhmerConversionResult = momentkh.fromGregorian(
  2024,
  4,
  14,
  10,
  30
);
console.log(momentkh.format(khmer));

// Access enum values (NEW in v3.0!)
console.log(khmer.khmer.moonPhase === MoonPhase.Waxing); // Type-safe comparison
console.log(khmer.khmer.monthIndex === MonthIndex.Cheit); // Enum comparison
console.log(khmer.khmer.dayOfWeek === DayOfWeek.Sunday); // Autocomplete support!

// Reverse conversion with enums (type-safe!)
const gregorianDate: GregorianDate = momentkh.fromKhmer(
  15,
  MoonPhase.Waxing, // Use enum instead of 0
  MonthIndex.Pisakh, // Use enum instead of 5
  2568
);
console.log(
  `${gregorianDate.year}-${gregorianDate.month}-${gregorianDate.day}`
);

// Still supports numbers for backward compatibility
const gregorianDate2: GregorianDate = momentkh.fromKhmer(15, 0, 5, 2568);

// Get New Year with typed result
const newYear: NewYearInfo = momentkh.getNewYear(2024);
console.log(
  `${newYear.year}-${newYear.month}-${newYear.day} ${newYear.hour}:${newYear.minute}`
);

// Access constants with full autocomplete
const monthName = momentkh.constants.LunarMonthNames[4]; // "ចេត្រ"
```

**Available Types:**

- `KhmerConversionResult` - Full conversion result object
- `GregorianDate` - Gregorian date object
- `KhmerDateInfo` - Khmer date information (now with enum fields!)
- `NewYearInfo` - New Year timing information
- `Constants` - Calendar constants interface

**Available Enums (NEW in v3.0):**

- 🌙 `MoonPhase` - Waxing (កើត) and Waning (រោច)
- 📅 `MonthIndex` - All 14 Khmer lunar months
- 🐉 `AnimalYear` - All 12 animal years
- ⭐ `Sak` - All 10 Saks
- 📆 `DayOfWeek` - Sunday through Saturday

---

## 📖 API Reference

### `fromGregorian(year, month, day, [hour], [minute], [second])`

Converts a Gregorian (Western) date to a Khmer Lunar date.

**Parameters:**
| Parameter | Type | Required | Range | Description |
|-----------|------|----------|-------|-------------|
| `year` | Number | ✅ Yes | Any | 📅 Gregorian year (e.g., 2024) |
| `month` | Number | ✅ Yes | 1-12 | 📅 **1-based** month (1=January, 12=December) |
| `day` | Number | ✅ Yes | 1-31 | 📅 Day of month |
| `hour` | Number | ⚪ No | 0-23 | ⏰ Hour (default: 0) |
| `minute` | Number | ⚪ No | 0-59 | ⏰ Minute (default: 0) |
| `second` | Number | ⚪ No | 0-59 | ⏰ Second (default: 0) |

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
    day: 6,                      // Number: Lunar day (1-15)
    moonPhase: 0,                // MoonPhase enum: 0=Waxing (កើត), 1=Waning (រោច)
    moonPhaseName: 'កើត',        // String: Moon phase name (NEW in v3.0)
    monthIndex: 4,               // MonthIndex enum: 0-13 (see table below)
    monthName: 'ចេត្រ',          // String: Khmer month name
    beYear: 2568,                // Number: Buddhist Era year
    jsYear: 1386,                // Number: Jolak Sakaraj (Chula Sakaraj) year
    animalYear: 4,               // AnimalYear enum: 0-11 (NEW in v3.0)
    animalYearName: 'រោង',       // String: Animal year name
    sak: 6,                  // Sak enum: 0-9 (NEW in v3.0)
    sakName: 'ឆស័ក',         // String: Sak name
    dayOfWeek: 0,                // DayOfWeek enum: 0=Sunday, 6=Saturday (NEW in v3.0)
    dayOfWeekName: 'អាទិត្យ'     // String: Khmer weekday name
  },
  _khmerDateObj: KhmerDate // Internal: KhmerDate object (for advanced use)
}
```

**✨ NEW in v3.0:** The `khmer` object now includes both enum values AND string names for easier usage:

- 🔢 Use enum values (e.g., `moonPhase`, `monthIndex`) for type-safe comparisons
- 📝 Use string names (e.g., `moonPhaseName`, `monthName`) for display purposes

**Example:**

```javascript
const result = momentkh.fromGregorian(2024, 4, 14);
console.log(result.khmer.beYear); // 2567
console.log(result.khmer.monthName); // 'ចេត្រ'
console.log(result.khmer.animalYear); // 4 (រោង)
```

---

### `fromKhmer(day, moonPhase, monthIndex, beYear)`

Converts a Khmer Lunar date to a Gregorian date.

**Parameters:**
| Parameter | Type | Required | Range | Description |
|-----------|------|----------|-------|-------------|
| `day` | Number | ✅ Yes | 1-15 | 📅 Lunar day number within the phase |
| `moonPhase` | Number \| MoonPhase | ✅ Yes | 0 or 1 | 🌙 0 = កើត (waxing), 1 = រោច (waning). ✨ NEW: Can use `MoonPhase.Waxing` or `MoonPhase.Waning` |
| `monthIndex` | Number \| MonthIndex | ✅ Yes | 0-13 | 📅 Khmer month index (see table below). ✨ NEW: Can use `MonthIndex` enum |
| `beYear` | Number | ✅ Yes | Any | 🙏 Buddhist Era year (e.g., 2568) |

**Lunar Month Indices:**
| Index | Khmer Name | Notes |
|-------|------------|-------|
| 0 | មិគសិរ (Migasir) | |
| 1 | បុស្ស (Boss) | |
| 2 | មាឃ (Meak) | |
| 3 | ផល្គុន (Phalkun) | |
| 4 | ចេត្រ (Cheit) | |
| 5 | ពិសាខ (Pisakh) | 🙏 Contains Visakha Bochea (15កើត) |
| 6 | ជេស្ឋ (Jesth) | ➕ Can have leap day (30 days instead of 29) |
| 7 | អាសាឍ (Asadh) | |
| 8 | ស្រាពណ៍ (Srap) | |
| 9 | ភទ្របទ (Phatrabot) | |
| 10 | អស្សុជ (Assoch) | |
| 11 | កត្ដិក (Kadeuk) | |
| 12 | បឋមាសាឍ (Pathamasadh) | 🌟 Only exists in leap month years |
| 13 | ទុតិយាសាឍ (Tutiyasadh) | 🌟 Only exists in leap month years |

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
// Using numbers (backward compatible)
const gregorian1 = momentkh.fromKhmer(6, 0, 4, 2568);
console.log(gregorian1); // { year: 2025, month: 4, day: 3 }

// Using enums (NEW in v3.0 - type-safe!)
const { MoonPhase, MonthIndex } = momentkh;
const gregorian2 = momentkh.fromKhmer(
  6,
  MoonPhase.Waxing,
  MonthIndex.Cheit,
  2568
);
console.log(gregorian2); // { year: 2024, month: 4, day: 14 }

// Mixed: numbers and enums work together
const gregorian3 = momentkh.fromKhmer(15, MoonPhase.Waxing, 5, 2568);
console.log(gregorian3); // Works perfectly!
```

**Important Notes:**

- 📌 `day` represents the day number within the moon phase (always 1-15)
- 🌙 `moonPhase` 0 = កើត (waxing, days 1-15), 1 = រោច (waning, days 1-14 or 1-15)
- ✨ **NEW:** Use `MoonPhase.Waxing` or `MoonPhase.Waning` for better code readability
- 📅 A full lunar month is typically 29-30 days total
- 💡 Example: "៨រោច" means day=8, moonPhase=1 (or MoonPhase.Waning)

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
// Output: Khmer New Year 2024: 13/4/2024 at 22:17

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
ថ្ងៃ{weekday} {day}{moonPhase} ខែ{month} ឆ្នាំ{animalYear} {sak} ពុទ្ធសករាជ {beYear}
```

**Escaping Characters:**
To escape characters in the format string (so they are not interpreted as format codes), wrap them in square brackets `[]`.

Example: `[Week] w` -> "Week អា"

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

// Escaping characters (use brackets [])
console.log(momentkh.format(khmer, "[Day:] d [Month:] m"));
// Day: ៦ Month: ចេត្រ
```

---

## 🔢 Using Enums (NEW in v3.0)

MomentKH 3.0 introduces TypeScript enums for better type safety and code readability. Use enums instead of magic numbers for clearer, more maintainable code.

### Available Enums

#### 🌙 MoonPhase

Represents the moon phase in the lunar calendar.

```javascript
const { MoonPhase } = momentkh;

MoonPhase.Waxing; // 0 - 🌒 កើត (waxing moon, days 1-15)
MoonPhase.Waning; // 1 - 🌘 រោច (waning moon, days 1-15)
```

#### 📅 MonthIndex

All 14 Khmer lunar months (including leap months).

```javascript
const { MonthIndex } = momentkh;

MonthIndex.Migasir; // 0  - មិគសិរ
MonthIndex.Boss; // 1  - បុស្ស
MonthIndex.Meak; // 2  - មាឃ
MonthIndex.Phalkun; // 3  - ផល្គុន
MonthIndex.Cheit; // 4  - ចេត្រ
MonthIndex.Pisakh; // 5  - ពិសាខ
MonthIndex.Jesth; // 6  - ជេស្ឋ
MonthIndex.Asadh; // 7  - អាសាឍ
MonthIndex.Srap; // 8  - ស្រាពណ៍
MonthIndex.Phatrabot; // 9  - ភទ្របទ
MonthIndex.Assoch; // 10 - អស្សុជ
MonthIndex.Kadeuk; // 11 - កត្ដិក
MonthIndex.Pathamasadh; // 12 - បឋមាសាឍ (leap month only)
MonthIndex.Tutiyasadh; // 13 - ទុតិយាសាឍ (leap month only)
```

#### 🐉 AnimalYear

The 12 animal years in the zodiac cycle.

```javascript
const { AnimalYear } = momentkh;

AnimalYear.Chhut; // 0  - 🐀 ជូត (Rat)
AnimalYear.Chlov; // 1  - 🐂 ឆ្លូវ (Ox)
AnimalYear.Khal; // 2  - 🐅 ខាល (Tiger)
AnimalYear.Thos; // 3  - 🐇 ថោះ (Rabbit)
AnimalYear.Rong; // 4  - 🐉 រោង (Dragon)
AnimalYear.Masagn; // 5  - 🐍 ម្សាញ់ (Snake)
AnimalYear.Momee; // 6  - 🐎 មមី (Horse)
AnimalYear.Momae; // 7  - 🐐 មមែ (Goat)
AnimalYear.Vok; // 8  - 🐒 វក (Monkey)
AnimalYear.Roka; // 9  - 🐓 រកា (Rooster)
AnimalYear.Cho; // 10 - 🐕 ច (Dog)
AnimalYear.Kor; // 11 - 🐖 កុរ (Pig)
```

#### ⭐ Sak

The 10 Saks (ស័ក) cycle.

```javascript
const { Sak } = momentkh;

Sak.SamridhiSak; // 0 - 🔟 សំរឹទ្ធិស័ក
Sak.AekSak; // 1 - 1️⃣ ឯកស័ក
Sak.ToSak; // 2 - 2️⃣ ទោស័ក
Sak.TreiSak; // 3 - 3️⃣ ត្រីស័ក
Sak.ChattvaSak; // 4 - 4️⃣ ចត្វាស័ក
Sak.PanchaSak; // 5 - 5️⃣ បញ្ចស័ក
Sak.ChhaSak; // 6 - 6️⃣ ឆស័ក
Sak.SappaSak; // 7 - 7️⃣ សប្តស័ក
Sak.AtthaSak; // 8 - 8️⃣ អដ្ឋស័ក
Sak.NappaSak; // 9 - 9️⃣ នព្វស័ក
```

#### 📆 DayOfWeek

Days of the week.

```javascript
const { DayOfWeek } = momentkh;

DayOfWeek.Sunday; // 0 - ☀️ អាទិត្យ
DayOfWeek.Monday; // 1 - 🌙 ចន្ទ
DayOfWeek.Tuesday; // 2 - 🔥 អង្គារ
DayOfWeek.Wednesday; // 3 - 🪐 ពុធ
DayOfWeek.Thursday; // 4 - ⚡ ព្រហស្បតិ៍
DayOfWeek.Friday; // 5 - 💎 សុក្រ
DayOfWeek.Saturday; // 6 - 💀 សៅរ៍
```

### Usage Examples

#### Example 1: Type-Safe Comparisons

```javascript
const { MoonPhase, MonthIndex, DayOfWeek } = momentkh;
const khmer = momentkh.fromGregorian(2024, 12, 16);

// Check moon phase
if (khmer.khmer.moonPhase === MoonPhase.Waxing) {
  console.log("Waxing moon (កើត)");
} else {
  console.log("Waning moon (រោច)");
}

// Check specific month
if (khmer.khmer.monthIndex === MonthIndex.Migasir) {
  console.log("It is Migasir month!");
}

// Check day of week
if (khmer.khmer.dayOfWeek === DayOfWeek.Monday) {
  console.log("It is Monday!");
}
```

#### Example 2: Converting with Enums

```javascript
const { MoonPhase, MonthIndex } = momentkh;

// Convert Khmer to Gregorian using enums (much clearer!)
const date1 = momentkh.fromKhmer(
  15, // day
  MoonPhase.Waxing, // instead of 0
  MonthIndex.Pisakh, // instead of 5
  2568
);

// Still works with numbers for backward compatibility
const date2 = momentkh.fromKhmer(15, 0, 5, 2568);

// Both give the same result
console.log(date1); // { year: 2025, month: 5, day: 11 }
console.log(date2); // { year: 2025, month: 5, day: 11 }
```

#### Example 3: Switch Statements with Enums

```javascript
const { MonthIndex, AnimalYear } = momentkh;
const khmer = momentkh.fromGregorian(2024, 12, 16);

// Switch on month
switch (khmer.khmer.monthIndex) {
  case MonthIndex.Migasir:
  case MonthIndex.Boss:
  case MonthIndex.Meak:
    console.log("Winter months");
    break;
  case MonthIndex.Phalkun:
  case MonthIndex.Cheit:
  case MonthIndex.Pisakh:
    console.log("Spring months");
    break;
  // ... more cases
}

// Switch on animal year
switch (khmer.khmer.animalYear) {
  case AnimalYear.Rong:
    console.log("Year of the Dragon!");
    break;
  case AnimalYear.Masagn:
    console.log("Year of the Snake!");
    break;
  // ... more cases
}
```

#### Example 4: TypeScript Benefits

```typescript
import momentkh, { MoonPhase, MonthIndex, KhmerConversionResult } from './momentkh';

// Full autocomplete and type checking!
const result: KhmerConversionResult = momentkh.fromGregorian(2024, 12, 16);

// TypeScript knows these are enums
const phase: MoonPhase = result.khmer.moonPhase;
const month: MonthIndex = result.khmer.monthIndex;

// Type error if you try to use invalid value
// const date = momentkh.fromKhmer(15, 3, 5, 2568); // Error! 3 is not a valid MoonPhase

// Autocomplete shows all enum options
const date = momentkh.fromKhmer(
  15,
  MoonPhase.  // ← IDE shows: Waxing, Waning
  MonthIndex. // ← IDE shows: Migasir, Boss, Meak, etc.
  2568
);
```

### Benefits of Using Enums

1. 📖 **Readability**: `MonthIndex.Pisakh` is clearer than `5`
2. 🛡️ **Type Safety**: TypeScript catches invalid values at compile time
3. ⚡ **Autocomplete**: IDEs show all available options
4. 🔧 **Maintainability**: Easier to understand code months later
5. ♻️ **Refactoring**: Safer to change enum values (single source of truth)
6. 📚 **Documentation**: Enums serve as inline documentation

### 🔄 Backward Compatibility

✅ All functions accept both enums and numbers:

```javascript
// All of these work:
momentkh.fromKhmer(15, MoonPhase.Waxing, MonthIndex.Pisakh, 2568); // ✨ New enum way
momentkh.fromKhmer(15, 0, MonthIndex.Pisakh, 2568); // 🔀 Mixed
momentkh.fromKhmer(15, MoonPhase.Waxing, 5, 2568); // 🔀 Mixed
momentkh.fromKhmer(15, 0, 5, 2568); // 👍 Old way still works!
```

🎯 **Existing code using numbers continues to work without changes!**

---

## 🧮 Understanding Khmer Calendar

The Khmer calendar is a **lunisolar calendar** that tracks both the moon phases and the solar year. It uses **three different year numbering systems** that change at different times:

### Buddhist Era (BE) Year

**Full Name:** ពុទ្ធសករាជ (Putthsak, Buddhist Era)
**Offset from Gregorian:** +543 or +544
**When it increases:** At midnight (00:00) on the **1st waning day of Pisakh month** (១រោច ខែពិសាខ)

**Example Timeline:**

```
2024-05-22 23:59 → 15កើត Pisakh, BE 2567
2024-05-23 00:00 → 1រោច Pisakh, BE 2568 (NEW year starts!)
2024-05-23 23:59 → 1រោច Pisakh, BE 2568
2024-05-24 00:00 → 2រោច Pisakh, BE 2568
```

**Important:**

- 🙏 The 15th waxing day of Pisakh is **Visakha Bochea** (ពិសាខបូជា), celebrating Buddha's birth, enlightenment, and death
- ⏰ At midnight (00:00) when this sacred day begins, the new BE year starts
- 📍 The year changes exactly at the start of the 15th waxing day of Pisakh

**Code Example:**

```javascript
// Check BE year transition
const before = momentkh.fromGregorian(2024, 5, 22, 23, 59); // 23:59 on May 22
const at = momentkh.fromGregorian(2024, 5, 23, 0, 0); // Midnight on May 23

console.log(before.khmer.beYear); // 2567 (old year)
console.log(at.khmer.beYear); // 2568 (new year starts at midnight!)
```

---

### Animal Year

**Full Name:** ឆ្នាំ + Animal name (Year of the [Animal])
**Cycle:** 12 years
**When it increases:** At the exact moment of **Moha Songkran** (មហាសង្រ្កាន្ត) - Khmer New Year

**The 12 Animals (in order):**
| Index | Khmer | Pronunciation | Animal | Emoji |
|-------|-------|---------------|--------|-------|
| 0 | ជូត | Chhūt | Rat | 🐀 |
| 1 | ឆ្លូវ | Chhlūv | Ox | 🐂 |
| 2 | ខាល | Khāl | Tiger | 🐅 |
| 3 | ថោះ | Thaŏh | Rabbit | 🐇 |
| 4 | រោង | Rōng | Dragon | 🐉 |
| 5 | ម្សាញ់ | Msanh | Snake | 🐍 |
| 6 | មមី | Momi | Horse | 🐎 |
| 7 | មមែ | Momè | Goat | 🐐 |
| 8 | វក | Vŏk | Monkey | 🐒 |
| 9 | រកា | Rŏka | Rooster | 🐓 |
| 10 | ច | Châ | Dog | 🐕 |
| 11 | កុរ | Kŏr | Pig | 🐖 |

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

### Sak

**Full Name:** ស័ក (Sak, Era)
**Cycle:** 10 years
**When it increases:** At **midnight (00:00) of the last day** of Khmer New Year celebration (Lerng Sak - ថ្ងៃឡើងស័ក)

**The 10 Saks (in order):**
| Index | Khmer | Romanization |
|-------|-------|--------------|
| 0 | សំរឹទ្ធិស័ក | Samridhi Sak |
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

- 🎉 **Day 1:** Moha Songkran (មហាសង្រ្កាន្ត) - New Year's Day
- 🎊 **Day 2:** Virak Wanabat (វីរៈវ័នបត) - Second day
- ⭐ **Day 3 or 4:** Lerng Sak (ថ្ងៃឡើងស័ក) - Last day & Sak change day

**Example:**

```javascript
// 2024 New Year is on April 13, 22:24
// Lerng Sak (Sak change) is typically 3-4 days later at midnight

const newYearDay = momentkh.fromGregorian(2024, 4, 13, 23, 0);
console.log(newYearDay.khmer.sak); // 'ឆស័ក' (still old sak)

const lerngSakDay = momentkh.fromGregorian(2024, 4, 17, 0, 0); // Midnight of Lerng Sak
console.log(lerngSakDay.khmer.sak); // 'សប្តស័ក' (new sak!)
```

---

### When Each Year Type Increases

**Summary Table:**

| Year Type       | Changes At               | Example Date/Time    |
| --------------- | ------------------------ | -------------------- |
| **BE Year**     | 00:00 នៅថ្ងៃ១រោច ខែពិសាខ | May 23, 2024 00:00   |
| **Animal Year** | ម៉ោង និង នាទីទេវតាចុះ    | April 13, 2024 22:17 |
| **Sak**         | 00:00 នៅថ្ងៃឡើងស័ក       | April 16, 2024 00:00 |

**Visual Timeline for 2024:**

```
April 13, 22:16 → BE 2567, Monkey (វក), Old Sak (ឆស័ក)
April 13, 22:17 → BE 2567, Rooster (រកា), Old Sak (ឆស័ក) ← Animal Year changes
April 17, 00:00 → BE 2567, Rooster (រកា), New Sak (សប្តស័ក) ← Sak changes
May 22, 23:59   → BE 2567, Rooster (រកា), New Sak (សប្តស័ក)
May 23, 00:00   → BE 2568, Rooster (រកា), New Sak (សប្តស័ក) ← BE Year changes
```

---

## 🎨 Format Codes

Complete list of format tokens for the `format()` function:

| Token                      | Output            | Description                         | Example               |
| -------------------------- | ----------------- | ----------------------------------- | --------------------- |
| **📅 Weekday**             |
| `W`                        | ថ្ងៃនៃសប្តាហ៍ពេញ  | Weekday name (full)                 | អាទិត្យ, ចន្ទ, អង្គារ |
| `w`                        | ថ្ងៃនៃសប្តាហ៍ខ្លី | Weekday name (abbreviated)                | អា, ច, អ              |
| **🌙 Lunar Day**           |
| `d`                        | ថ្ងៃទី            | Lunar day number                    | ១, ៥, ១៥              |
| `D`                        | ថ្ងៃទី (២ខ្ទង់)   | Lunar day (zero-padded)             | ០១, ០៥, ១៥            |
| `dr`                       | Day               | Lunar day (Latin)                   | 1, 5, 15              |
| `Dr`                       | Day (0)           | Lunar day (padded Latin)            | 01, 05, 15            |
| **📆 Gregorian Day**       |
| `ds`                       | ថ្ងៃទី            | Gregorian day number                | ១, ៥, ១៤, ៣១          |
| `Ds`                       | ថ្ងៃទី (២ខ្ទង់)   | Gregorian day (zero-padded)         | ០១, ០៥, ១៤, ៣១        |
| `dsr`                      | Day               | Gregorian day (Latin)               | 1, 5, 14, 31          |
| `Dsr`                      | Day (0)           | Gregorian day (padded Latin)        | 01, 05, 14, 31        |
| **🌙 Moon Phase**          |
| `n`                        | កើត/រោច (ខ្លី)    | Moon phase (abbreviated)                  | ក, រ                  |
| `N`                        | កើត/រោច (ពេញ)     | Moon phase (full)                   | កើត, រោច              |
| `o`                        | និមិត្តសញ្ញា      | Moon day symbol                     | ᧡, ᧢, ᧣ ... ᧿         |
| **📆 Month Names**         |
| `m`                        | ខែចន្ទគតិ (ពេញ)      | Lunar month name                    | មិគសិរ, បុស្ស, ចេត្រ  |
| `ms`                       | ខែ (ខ្លី)       | Lunar month name (abbreviated)      | មិ, បុ                |
| `M`                        | ខែសុរិយគតិ (ពេញ)     | Solar (Gregorian) month name        | មករា, កុម្ភៈ, មេសា    |
| `Ms`                       | ខែ (ខ្លី)       | Solar month name (abbreviated)      | មក, កម                |
| **⏰ Year Components**     |
| `a`                        | ឆ្នាំសត្វ         | Animal year                         | ជូត, ឆ្លូវ, រោង       |
| `as`                       | ឆ្នាំ (រូប)       | Animal year emoji                   | 🐀, 🐂, 🐉            |
| `e`                        | ស័ក               | Sak                                 | ឯកស័ក, ទោស័ក          |
| `b`                        | ព.ស. លេខខ្មែរ             | Buddhist Era year                   | ២៥៦៨                  |
| `br`                       | ព.ស. លេខឡាតាំង            | Buddhist Era year (Latin)           | 2568                  |
| `c`                        | គ.ស. លេខខ្មែរ             | Common Era (Gregorian) year         | ២០២៤                  |
| `cr`                       | គ.ស. លេខឡាតាំង            | Common Era year (Latin)             | 2024                  |
| `j`                        | ច.ស. លេខខ្មែរ           | Jolak Sakaraj year                  | ១៣៨៦                  |
| `jr`                       | ច.ស.  លេខឡាតាំង           | Jolak Sakaraj year (Latin)          | 1386                  |

**Format Examples:**

```javascript
const khmer = momentkh.fromGregorian(2025, 5, 3);

console.log(momentkh.format(khmer, "W, dN ខែm ព.ស.b"));
// សៅរ៍, ៧កើត ខែពិសាខ ព.ស.២៥៦៨

console.log(momentkh.format(khmer, "c/M/Ds ថ្ងៃw"));
// ២០២៥/ឧសភា/០៣ ថ្ងៃស

console.log(momentkh.format(khmer, "ឆ្នាំa e ខែm ថ្ងៃទីDN"));
// ឆ្នាំម្សាញ់ សប្តស័ក ខែពិសាខ ថ្ងៃទី០៧កើត

console.log(momentkh.format(khmer, "ថ្ងៃទី o"));
// ថ្ងៃទី ᧧

// Using new Gregorian day format codes
console.log(momentkh.format(khmer, "ថ្ងៃទីds ខែM ឆ្នាំc"));
// ថ្ងៃទី៣ ខែឧសភា ឆ្នាំ២០២៥

console.log(momentkh.format(khmer, "dsr/M/cr"));
// 3/ឧសភា/2025

console.log(momentkh.format(khmer, "Dsr-M-cr"));
// 03-ឧសភា-2025
```

---

## 📚 Constants

Access Khmer calendar constants through `momentkh.constants`:

**✨ NEW in v3.0:** For type-safe access, use the enums instead! See [🔢 Using Enums](#-using-enums-new-in-v30) section.

```javascript
// Lunar month names array (indices 0-13)
momentkh.constants.LunarMonthNames;
// ['មិគសិរ', 'បុស្ស', 'មាឃ', 'ផល្គុន', 'ចេត្រ', 'ពិសាខ', 'ជេស្ឋ', 'អាសាឍ',
//  'ស្រាពណ៍', 'ភទ្របទ', 'អស្សុជ', 'កត្ដិក', 'បឋមាសាឍ', 'ទុតិយាសាឍ']

// Solar month names array (indices 0-11)
momentkh.constants.SolarMonthNames;
// ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
//  'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ']

// Animal year names array (indices 0-11)
momentkh.constants.AnimalYearNames;
// ['ជូត', 'ឆ្លូវ', 'ខាល', 'ថោះ', 'រោង', 'ម្សាញ់',
//  'មមី', 'មមែ', 'វក', 'រកា', 'ច', 'កុរ']

// Animal year emojis array (indices 0-11)
momentkh.constants.AnimalYearEmojis;
// ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍',
//  '🐎', '🐐', '🐒', '🐓', '🐕', '🐖']

// Sak names array (indices 0-9)
momentkh.constants.SakNames;
// ['សំរឹទ្ធិស័ក', 'ឯកស័ក', 'ទោស័ក', 'ត្រីស័ក', 'ចត្វាស័ក',
//  'បញ្ចស័ក', 'ឆស័ក', 'សប្តស័ក', 'អដ្ឋស័ក', 'នព្វស័ក']

// Weekday names array (indices 0-6, Sunday-Saturday)
momentkh.constants.WeekdayNames;
// ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍']

// Moon phase names array (indices 0-1)
momentkh.constants.MoonPhaseNames;
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
npm install @thyrith/momentkh
```

### Import Changes

**Before (v1):**

```javascript
const moment = require("moment");
require("@thyrith/momentkh")(moment);
```

**After (v2):**

```javascript
const momentkh = require("@thyrith/momentkh");
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
const momentkh = require("@thyrith/momentkh");

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

| Feature               | MomentKH v1                | MomentKH v3                |
| --------------------- | -------------------------- | -------------------------- |
| **Dependencies**      | Requires moment.js (~50KB) | Zero dependencies          |
| **File Size**         | Multiple files             | Single file (~35KB)        |
| **Setup**             | Initialize with moment     | Direct import/require      |
| **API Style**         | Extends moment.js          | Standalone functions       |
| **Khmer → Gregorian** | ❌ Not supported           | ✅ Fully supported         |
| **Browser Support**   | Modern browsers            | ES5+ (IE11+)               |
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
console.log("Sak:", khmer.khmer.sak);
console.log("Month:", khmer.khmer.monthName);
console.log(
  "Day:",
  khmer.khmer.day + (khmer.khmer.moonPhase === 0 ? "កើត" : "រោច")
);

// Output:
// Gregorian: 14/4/2024
// BE Year: 2568
// Animal Year: រោង
// Sak: ឆស័ក
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

// Search in May for Visakha Bochea (15កើត Pisakh)
for (let day = 20; day <= 25; day++) {
  const midnight = momentkh.fromGregorian(year, 5, day, 0, 0);

  if (
    midnight.khmer.day === 15 &&
    midnight.khmer.moonPhase === 0 &&
    midnight.khmer.monthIndex === 5
  ) {
    const beforeMidnight = momentkh.fromGregorian(year, 5, day - 1, 23, 59);

    console.log(`Found Visakha Bochea: ${year}-05-${day}`);
    console.log(`At ${day - 1} 23:59 - BE ${beforeMidnight.khmer.beYear}`);
    console.log(`At ${day} 00:00 - BE ${midnight.khmer.beYear}`);
    console.log(
      `Year changed: ${
        beforeMidnight.khmer.beYear !== midnight.khmer.beYear ? "YES" : "NO"
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

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

---

## 🙏 Credits & References

- **Original momentkh library** by [Thyrith Sor](https://github.com/ThyrithSor)
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

- **Issues:** [GitHub Issues](https://github.com/ThyrithSor/momentkh/issues)
- **Comparison:** Check behavior against original momentkh for compatibility
- **Contact:** [E-mail](mailto:me@thyrith.com)

---

**Version:** 3.0.3
**Last Updated:** December 2025
