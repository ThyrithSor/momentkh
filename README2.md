# 🇰🇭 MomentKH2 - Standalone Khmer Calendar Library

**MomentKH2** is a lightweight, zero-dependency JavaScript library for accurate Khmer Lunar Calendar conversions. It serves as a modern, standalone successor to the original `momentkh` library, offering improved performance and simplified usage without requiring `moment.js`.

---

## 🚀 Features

- **Zero Dependencies**: Pure JavaScript implementation.
- **Accurate Conversions**: Converts between Gregorian and Khmer Lunar dates.
- **Khmer New Year**: precise calculation of Moha Songkran and Lerng Sak times.
- **Flexible Formatting**: Custom format strings for Khmer date display.
- **Universal Support**: Works in Node.js, Browsers, and ES Modules.

---

## 📦 Installation & Usage

### 1. Browser (Script Tag)
Simply download `momentkh2.js` and include it in your HTML file.

```html
<script src="momentkh2.js"></script>
<script>
  // Global object 'momentkh2' is available
  const today = new Date();
  const khmerDate = momentkh2.fromDate(today);
  console.log(momentkh2.format(khmerDate)); 
  // Output: ថ្ងៃចន្ទ ១០កើត ខែចេត្រ ឆ្នាំរោង ឆស័ក ពុទ្ធសករាជ ២៥៦៧
</script>
```

### 2. Node.js (CommonJS)
```javascript
const momentkh2 = require('./momentkh2');

const result = momentkh2.fromGregorian(2024, 4, 13);
console.log(result.khmer.animalYear); // 'រោង'
```

### 3. ES Modules (Import)
```javascript
import momentkh2 from './momentkh2.js';

const khResult = momentkh2.fromGregorian(2025, 4, 14);
```

---

## 🛠 API Reference

### `fromGregorian(year, month, day, [hour, minute, second])`
Converts a Gregorian date to a Khmer date object.

- **Parameters:**
  - `year` (Number): Gregorian Year (e.g., 2024).
  - `month` (Number): Month (1-12). **Note:** 1-based index (January = 1).
  - `day` (Number): Day (1-31).
  - *(Optional)* `hour`, `minute`, `second` (Number): Time components.
- **Returns:** Object containing `gregorian` and `khmer` details.

```javascript
const date = momentkh2.fromGregorian(2024, 4, 14);
```

### `fromDate(dateObj)`
Convenience wrapper to convert a JavaScript `Date` object to a Khmer date.

- **Parameters:**
  - `dateObj` (Date): Standard JavaScript Date object.
- **Returns:** Same object structure as `fromGregorian`.

```javascript
const kDate = momentkh2.fromDate(new Date());
```

### `fromKhmer(day, moonPhase, monthIndex, beYear)`
Converts a specific Khmer Lunar date back to a Gregorian date.

- **Parameters:**
  - `day` (Number): Day of the moon phase (1-15).
  - `moonPhase` (Number): **0** for Waxing (កើត), **1** for Waning (រោច).
  - `monthIndex` (Number): Index of the Khmer month (0-13). See mapping below.
  - `beYear` (Number): Buddhist Era Year (e.g., 2567).
- **Returns:** Object with `year`, `month`, `day` (Gregorian).

#### ⚠️ Important: Date Mapping vs Index
- **`day`**: Represents the lunar day number within the phase (1 to 15). 
  - *Example*: "5កើត" -> `day: 5`.
- **`moonPhase`**: `0` = Waxing (15 days), `1` = Waning (14-15 days).
- **`monthIndex`**: 0-based index map to Lunar Months:
  - `0`: Migasir (មិគសិរ)
  - `1`: Boss (បុស្ស)
  - `2`: Meak (មាឃ)
  - `3`: Phalkun (ផល្គុន)
  - `4`: Ceit (ចេត្រ)
  - `5`: Pisak (ពិសាខ)
  - `6`: Jesth (ជេស្ឋ)
  - `7`: Asadh (អាសាឍ)
  - `8`: Srap (ស្រាពណ៍)
  - `9`: Phatrabot (ភទ្របទ)
  - `10`: Assoch (អស្សុជ)
  - `11`: Kadeuk (កក្ដិក)
  - `12`: Pathamasadh (បឋមាសាឍ) - *Leap Month*
  - `13`: Tutiyasadh (ទុតិយាសាឍ) - *Leap Month*

### `toDate(day, moonPhase, monthIndex, beYear)`
Converts a Khmer Lunar date directly to a JavaScript `Date` object.
- **Parameters:** Same as `fromKhmer`.
- **Returns:** JavaScript `Date` object.

### `getNewYear(year)`
Calculates the exact time of **Moha Songkran** (Khmer New Year) for a given Gregorian year.

- **Parameters:** `year` (Number).
- **Returns:** Object `{ year, month, day, hour, minute }` representing the moment the New Year begins.
```javascript
const ny = momentkh2.getNewYear(2024);
// { year: 2024, month: 4, day: 13, hour: 22, minute: 24 }
```

### `format(khmerData, formatString)`
Formats the Khmer date object into a custom string.

- **Parameters:**
  - `khmerData` (Object): The result from `fromGregorian` or `fromDate`.
  - `formatString` (String): String with replacement tokens.

#### Formatting Rules

| Token | Meaning | Output Example |
|-------|---------|----------------|
| `W` | Day of Week (Full) | អាទិត្យ |
| `w` | Day of Week (Short) | អា |
| `d` | Day Number (Khmer) | ១, ១៥ |
| `D` | Day Number (0-padded) | ០១, ១៥ |
| `n` | Moon Phase (Short) | ក |
| `N` | Moon Phase (Full) | កើត |
| `o` | Moon Day Symbol | ᧡...᧿ |
| `m` | Lunar Month Name | ចេត្រ |
| `M` | Solar Month Name | មេសា |
| `a` | Animal Year | រោង |
| `e` | Era (Sak) | ឆស័ក |
| `b` | BE Year (Khmer Num) | ២៥៦៧ |
| `c` | Gregorian Year | ២០២៤ |
| `j` | JS Year (Chula Sakaraj) | ១៣៨៦ |

**Example:**
```javascript
const data = momentkh2.fromGregorian(2024, 4, 14);
const str = momentkh2.format(data, "ថ្ងៃW dN ខែm ឆ្នាំa e ព.ស.b");
// "ថ្ងៃអាទិត្យ ៦កើត ខែចេត្រ ឆ្នាំរោង បញ្ចស័ក ព.ស.២៥៦៧"
```

---

## 🧮 Algorithm Details

The library implements the traditional Khmer "Suriya-Candra" (Lunisolar) calendar logic completely from scratch.

### 1. Solar Calculation (Harkun & Kromthupul)
To keep the lunar months aligned with the solar year (and seasons), the calendar calculates the "Avoman" (Remainder) and "Bodithey" to determine:
- **Adhikameas (Leap Month)**: Adding a second *Asadh* month (13 months/year). - Results in months 12 (Pathamasadh) and 13 (Tutiyasadh) instead of just 7 (Asadh).
- **Chantrathimeas (Leap Day)**: Adding an extra day to *Jais* month (30 days instead of 29).

### 2. New Year (Moha Songkran)
Unlike the Western New Year, the Khmer New Year is determined by the position of the Sun entering the sign of Aries (Mesha).
- `momentkh2` calculates the **Sotin** (Sun position) to find the exact minute the New Year begins.
- **Animal Year** updates exactly at this Moha Songkran time.
- **Era (Sak)** updates later, at the midnight of the *Date Lerng Sak* (usually the 3rd or 4th day of the New Year celebration).

### 3. Buddhist Era (BE)
The Buddhist Era year increments on **Visakha Bochea** (Day 15 of Month 6, Pisakh), which usually falls in May, about a month after the New Year.

---

## 👨‍💻 Contributing
Contributions are welcome! Please run the tests before submitting a PR.

```bash
node test_basic.js
```

License: **MIT**
