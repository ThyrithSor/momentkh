# MomentKH2 - Standalone Khmer Calendar Library

A simplified, standalone library for Khmer (Cambodian) calendar conversion with **zero dependencies**. No need for moment.js or any other library!

## Features

- ✅ Convert Gregorian dates to Khmer lunar calendar
- ✅ Convert Khmer lunar dates to Gregorian calendar
- ✅ Calculate Khmer New Year date and time
- ✅ Customizable date formatting
- ✅ **Zero dependencies** - standalone single file
- ✅ Works everywhere: Node.js (CommonJS/ES modules), Browser, AMD

## Installation

### Option 1: Direct Download
Download `momentkh2.js` and include it in your project.

### Option 2: Copy to Your Project
```bash
# Copy the file to your project
cp momentkh2.js /path/to/your/project/
```

## Usage

### Browser (HTML Script Tag)

```html
<script src="momentkh2.js"></script>
<script>
    // Convert today's date to Khmer
    const today = new Date();
    const khmer = momentkh2.fromDate(today);
    console.log(momentkh2.format(khmer));
    // Output: ថ្ងៃអាទិត្យ ៨កើត ខែមិគសិរ ឆ្នាំច សំរឹទ្ធស័ក ពុទ្ធសករាជ ២៥៦៨
</script>
```

### Node.js (CommonJS)

```javascript
const momentkh2 = require('./momentkh2');

// Convert Gregorian to Khmer
const khmer = momentkh2.fromGregorian(2024, 4, 14);
console.log(momentkh2.format(khmer));

// Get Khmer New Year
const newYear = momentkh2.getNewYear(2024);
console.log(newYear); // { year: 2024, month: 4, day: 14, hour: 8, minute: 7 }
```

### ES Module (import)

```javascript
import momentkh2 from './momentkh2.js';

const khmer = momentkh2.fromDate(new Date());
console.log(momentkh2.format(khmer));
```

## API Reference

### `fromGregorian(year, month, day, hour = 0, minute = 0, second = 0)`

Convert a Gregorian date to Khmer lunar date.

```javascript
const khmer = momentkh2.fromGregorian(2024, 1, 1);
// Returns object with gregorian and khmer properties
```

**Returns:**
```javascript
{
    gregorian: {
        year: 2024,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        dayOfWeek: 1 // 0=Sun, 1=Mon, ...
    },
    khmer: {
        day: 19,
        moonPhase: 1, // 0=កើត, 1=រោច
        monthIndex: 2, // Index in LunarMonthNames array
        monthName: 'មាឃ',
        beYear: 2567,
        jsYear: 1385,
        animalYear: 'ច',
        eraYear: 'បញ្ចស័ក',
        dayOfWeek: 'ចន្ទ'
    }
}
```

### `fromKhmer(day, moonPhase, monthIndex, beYear)`

Convert a Khmer lunar date to Gregorian date.

```javascript
// 1កើត ខែបុស្ស ព.ស.២៤៤៣
const gregorian = momentkh2.fromKhmer(1, 0, 1, 2443);
// Returns: { year: 1900, month: 1, day: 1 }
```

**Parameters:**
- `day`: 1-15 (day number in the lunar phase)
- `moonPhase`: 0 (កើត) or 1 (រោច)
- `monthIndex`: 0-13 (see Lunar Months table below)
- `beYear`: Buddhist Era year (e.g., 2443)

### `getNewYear(ceYear)`

Get the date and time of Khmer New Year for a given Common Era year.

```javascript
const newYear = momentkh2.getNewYear(2024);
// Returns: { year: 2024, month: 4, day: 14, hour: 8, minute: 7 }
```

### `format(khmerData, formatString)`

Format a Khmer date with optional custom format string.

```javascript
const khmer = momentkh2.fromGregorian(2024, 4, 14);

// Default format
console.log(momentkh2.format(khmer));
// ថ្ងៃអាទិត្យ ៦កើត ខែចេត្រ ឆ្នាំរោង ចត្វាស័ក ពុទ្ធសករាជ ២៥៦៨

// Custom format
console.log(momentkh2.format(khmer, 'dN ថ្ងៃW ខែm ព.ស. b'));
// ៦កើត ថ្ងៃអាទិត្យ ខែចេត្រ ព.ស. ២៥៦៨
```

### `fromDate(dateObject)`

Convert a JavaScript Date object to Khmer date.

```javascript
const khmer = momentkh2.fromDate(new Date());
```

### `toDate(day, moonPhase, monthIndex, beYear)`

Convert a Khmer date to JavaScript Date object.

```javascript
const date = momentkh2.toDate(1, 0, 1, 2443);
// Returns: Date object for 1900-01-01
```

## Format Codes

| Code | Description | Example |
|------|-------------|---------|
| `W` | Day of week (full) | អាទិត្យ |
| `w` | Day of week (short) | អា |
| `d` | Day number | ១ |
| `D` | Day number (2 digits) | ០១ |
| `n` | Moon phase (short) | ក |
| `N` | Moon phase (full) | កើត |
| `o` | Moon day symbol | ᧡ |
| `m` | Lunar month name | មិគសិរ |
| `M` | Solar month name | មករា |
| `a` | Animal year | ជូត |
| `e` | Era year | ឯកស័ក |
| `b` | Buddhist Era year | ២៥៦៨ |
| `c` | Common Era year | ២០២៤ |
| `j` | Jolak Sakaraj year | ១៣៨៦ |

## Lunar Months

| Index | Khmer Name | Has Leap Variant |
|-------|------------|------------------|
| 0 | មិគសិរ | No |
| 1 | បុស្ស | No |
| 2 | មាឃ | No |
| 3 | ផល្គុន | No |
| 4 | ចេត្រ | No |
| 5 | ពិសាខ | No |
| 6 | ជេស្ឋ | Yes (leap day) |
| 7 | អាសាឍ | No |
| 8 | ស្រាពណ៍ | No |
| 9 | ភទ្របទ | No |
| 10 | អស្សុជ | No |
| 11 | កក្ដិក | No |
| 12 | បឋមាសាឍ | Yes (leap month only) |
| 13 | ទុតិយាសាឍ | Yes (leap month only) |

## Constants

Access calendar constants via `momentkh2.constants`:

```javascript
momentkh2.constants.LunarMonthNames   // Array of lunar month names
momentkh2.constants.SolarMonthNames   // Array of solar month names
momentkh2.constants.AnimalYearNames   // Array of animal year names
momentkh2.constants.EraYearNames      // Array of era year names
momentkh2.constants.WeekdayNames      // Array of weekday names
momentkh2.constants.MoonStatusNames   // ['កើត', 'រោច']
```

## Examples

### Example 1: Display Today in Khmer

```javascript
const today = momentkh2.fromDate(new Date());
console.log(momentkh2.format(today));
```

### Example 2: Find Khmer New Year

```javascript
for (let year = 2020; year <= 2025; year++) {
    const newYear = momentkh2.getNewYear(year);
    console.log(`${year}: ${newYear.day}/${newYear.month} at ${newYear.hour}:${String(newYear.minute).padStart(2, '0')}`);
}
```

### Example 3: Convert Date Range

```javascript
// Convert first week of January 2024
for (let day = 1; day <= 7; day++) {
    const khmer = momentkh2.fromGregorian(2024, 1, day);
    console.log(momentkh2.format(khmer, 'c/M/D → dN ខែm'));
}
```

### Example 4: Bidirectional Conversion

```javascript
// Gregorian to Khmer
const khmer = momentkh2.fromGregorian(2024, 4, 14);
console.log('Khmer:', momentkh2.format(khmer));

// Khmer to Gregorian
const gregorian = momentkh2.fromKhmer(
    khmer.khmer.day,
    khmer.khmer.moonPhase,
    khmer.khmer.monthIndex,
    khmer.khmer.beYear
);
console.log('Back to Gregorian:', `${gregorian.year}-${gregorian.month}-${gregorian.day}`);
```

## Differences from Original MomentKH

| Feature | MomentKH (v1) | MomentKH2 |
|---------|---------------|-----------|
| Dependencies | Requires moment.js | **Zero dependencies** |
| Files | Multiple files | **Single file** |
| API Style | Extends moment.js | **Standalone API** |
| Size | ~50KB + moment.js | **~25KB standalone** |
| Setup | Requires initialization | **Import and use** |

## Migration from MomentKH v1

```javascript
// OLD (momentkh v1)
const moment = require('moment');
require('@thyrith/momentkh')(moment);
const khmer = moment().toKhDate();

// NEW (momentkh2)
const momentkh2 = require('./momentkh2');
const khmer = momentkh2.fromDate(new Date());
const formatted = momentkh2.format(khmer);
```

## Browser Support

- Chrome/Edge: All versions
- Firefox: All versions
- Safari: All versions
- IE11: Supported (ES5 compatible)
- Node.js: 8.0+

## Algorithm References

Based on:
- **Khmer Calendar C++ Implementation** (`khmer_calendar.cpp`)
- **"Pratitin Soryakkatik-Chankatik 1900-1999"** by Mr. Roath Kim Soeun
- Traditional Khmer astronomical calculations

## License

MIT License - Same as original momentkh

## Credits

- Original momentkh library by [Thyrith Sor](https://github.com/ThyrithSor)
- Algorithm references from [cam-cc.org](http://www.cam-cc.org) and [dahlina.com](http://www.dahlina.com/education/khmer_new_year_time.html)

## Support

For issues or questions:
- Check the examples: `example_momentkh2.js`, `example_momentkh2.html`, `example_momentkh2.mjs`
- Compare with original library behavior
- Review the C++ reference implementation

---

**Note:** This is a standalone reimplementation of the Khmer calendar conversion algorithm. While it maintains compatibility with the original momentkh library's calculations, the API is different to remove the moment.js dependency.
