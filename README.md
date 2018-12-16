[![NPM version](https://img.shields.io/npm/v/@thyrith/momentkh.svg)](https://www.npmjs.com/package/@thyrith/momentkh)
[![GitHub issues](https://img.shields.io/github/issues/ThyrithSor/momentkh.svg)](https://github.com/ThyrithSor/momentkh/issues)
[![GitHub forks](https://img.shields.io/github/forks/ThyrithSor/momentkh.svg)]()
[![GitHub stars](https://img.shields.io/github/stars/ThyrithSor/momentkh.svg)]()
[![GitHub license](https://img.shields.io/github/license/ThyrithSor/momentkh.svg)]()

# momentkh
Khmer Lunar Calendar

## Install
```
$ npm install @thyrith/momentkh
```

## How to use
This library is built depends on [moment.js](https://momentjs.com) popular library.
We added some functionality to make it easier to work with Khmer date format.

```javascript
const moment = require('momentkh');

let today = moment();

console.log(today);
// Display date today as moment js object
// For example: moment("2018-12-15T14:49:38.586")

let khmerDate = today.toLunarDate();

console.log(khmerDate);
// Display khmer date
// For example: ថ្ងៃសៅរ៍ ៨កើត ខែមិគសិរ ឆ្នាំច សំរឹទ្ធស័ក ពុទ្ធសករាជ ២៥៦២
```

## Added Functionality
#### Attributes of moment
| Name  | Parameter | Description | Example |
|---------|-----|-----------|----------------|
|readLunarDate| String or Object |Return moment.js object. Just same as calling: ``require('moment')('13/04/2018', 'dd/mm/yyyy');`` for Gregorian date </br> |``require('momentkh').readLunarDate('១៥កើត ពិសាខ ព.ស. ២៥៥៥');`` |

##### *Alias*
| Name  | Original |
|---------|----------------|
|khDate, khdate|readLunarDate|

#### Attributes of moment instance
| Name  | Parameter | Description | Example |
|---------|-------|---------|----------------|
|toLunarDate| *empty* or String or Array |display format as Khmer lunar date | ``require('momentkh')().toLunarDate()`` |

##### *Alias*
| Name  | Original |
|---------|----------------|
|toKhDate, tokhdate|toLunarDate|

## Format
By default, it will return the format as shown in example above.
However, you can also customize your format.

```javascript
// Use moment.js as usual. Documentaion: momentjs.com
let myBirthday = moment('4/3/1992', 'd/m/yyy');

myBirthday.toLunarDate('dN ថ្ងៃW ខែm ព.ស. b');
// ៦កើត ថ្ងៃព្រហស្បតិ៍ ខែមិគសិរ ព.ស. ២៥៦២'
```

| Format  | Description | Example |
|---------|----------------|----------------|
| W | ថ្ងៃនៃសប្ដាហ៍| អង្គារ |
| w | ថ្ងៃនៃសប្ដាហ៍កាត់ | អ |
| d | ថ្ងៃទី ចាប់ពីលេខ ១ ដល់ ១៥      | ១      |
| D | ថ្ងៃទី ចាប់ពីលេខ 0១ ដល់ ១៥ | ០១ |
| n | កើត ឬ រោច | ក |
| N | កើត ឬ រោច | កើត |
| o | របៀបសរសេរខ្លីអំពីថ្ងៃទី | ᧡ (មានន័យថា ១កើត)|
| m | ខែ | មិគសិរ ​|
| a | ឆ្នាំសត្វ | រកា |
| e | ស័ក | ឯកស័ក |
| b | ឆ្នាំពុទ្ធសករាជ | ២៥៥៦ |
| c | ឆ្នាំគ្រិស្តសករាជ| ២០១៩ |
| j | ឆ្នាំចុល្លសករាជ | ១៤៦៣ |

