[![NPM version](https://img.shields.io/npm/v/@thyrith/momentkh.svg)](https://www.npmjs.com/package/@thyrith/momentkh)
[![GitHub issues](https://img.shields.io/github/issues/ThyrithSor/momentkh.svg)](https://github.com/ThyrithSor/momentkh/issues)
[![GitHub forks](https://img.shields.io/github/forks/ThyrithSor/momentkh.svg)]()
[![GitHub stars](https://img.shields.io/github/stars/ThyrithSor/momentkh.svg)]()
[![GitHub license](https://img.shields.io/github/license/ThyrithSor/momentkh.svg)]()

# momentkh
momentkh is an add-on feature to moment js library [DEMO](https://thyrithsor.github.io/momentkh).

## Install 🗜
```
$ npm install moment --save
$ npm install @thyrith/momentkh --save
```

## How to use 🛫
This library is built depends on [moment.js](https://momentjs.com) popular library.
We added some functionality to make it easier to work with Khmer date format.

### Nodejs
```javascript
const moment = require('moment');
// Add our features to your preferred moment.js version
require('@thyrith/momentkh')(moment);

// From now on, your moment js is transformed

let today = moment();

console.log(today);
// Display date today as moment js object
// For example: moment("2018-12-15T14:49:38.586")

let khmerDate = today.toLunarDate();

console.log(khmerDate);
// Display khmer date
// For example: ថ្ងៃសៅរ៍ ៨កើត ខែមិគសិរ ឆ្នាំច សំរឹទ្ធស័ក ពុទ្ធសករាជ ២៥៦២
```

### HTML
First, you need to clone this package to the root of your project or your `/public` folder.

\*\*\* *For `momentjs` library, you can import it any method or any version you want.*

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
<script src="momentkh/constant.js"></script>
<script src="momentkh/locale/km.js"></script>
<script src="momentkh/getSoriyatraLerngSak.js"></script>
<script src="momentkh/momentkh.js"></script>
<script>
	var moment = momentkh(moment)
	var today = moment()
	console.log('Today: ', today.toKhDate())
	console.log('New year at: ', moment.getKhNewYearMoment(2021))
</script>
```

## Added Functionality 🎡

#### Attributes of moment instance
| Name  | Parameter | Description | Example |
|---------|-------|---------|----------------|
|toLunarDate| *empty* or String |display format as Khmer lunar date | ``moment().toLunarDate();`` |
|khDay| *empty* |display khmer day index | ``moment().khDay();`` <br/> 0 -> ១កើត<br/> 1 -> ២កើត<br/> 2 -> ៣កើត<br/> ... <br/>15 -> ១រោច <br/>16 -> ២រោច <br/>17 -> ៣រោច<br/> ...|
|khMonth| *empty* |display khmer month index | ``moment.khMonth();`` <br/>0 -> មិគសិរ <br/> 1 -> បុស្ស <br/> 2 -> មាឃ <br/> 3 -> ផល្គុន <br/> 4 -> ចេត្រ <br/> 5 -> ពិសាខ <br/> 6 -> ជេស្ឋ <br/> 7 -> អាសាឍ <br/> 8 -> ស្រាពណ៍ <br/> 9 -> ភទ្របទ <br/> 10 -> អស្សុជ <br/> 11 -> កក្ដិក <br/> 12 -> បឋមាសាឍ <br/> 13 -> ទុតិយាសាឍ<br/>|
|khYear| *empty* |display Buddhist Era year | ``moment().khYear();`` |

##### *Alias*
| Name  | Original |
|---------|----------------|
|toKhDate, tokhdate|toLunarDate|


#### Attributes of moment

| Name  | Parameter | Description | Example |
|---------|-----|-----------|----------------|
|getKhNewYearMoment| Integer | Return moment.js object. Giving the moment of Khmer New Year. (ពេលទេវតាចុះ) | `moment.getKhNewYearMoment(2019);`|
|~~readLunarDate~~*(currently working on this)*| String or Object |Return moment.js object. Just same as calling: ``moment('13/04/2018', 'dd/mm/yyyy');`` for Gregorian date </br> |``moment.readLunarDate('១៥កើត ពិសាខ ព.ស. ២៥៥៥');`` |

##### *Alias*
| Name  | Original |
|---------|----------------|
|khDate, khdate|readLunarDate|

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
| D | ថ្ងៃទី ចាប់ពីលេខ ០១ ដល់ ១៥ | ០១ |
| n | កើត ឬ រោច | ក |
| N | កើត ឬ រោច | កើត |
| o | របៀបសរសេរខ្លីអំពីថ្ងៃទី | ᧡ (មានន័យថា ១កើត)|
| m | ខែចន្ទគតិ | មិគសិរ |
| M | ខែសុរិយគតិ | មករា |
| a | ឆ្នាំសត្វ | រកា |
| e | ស័ក | ឯកស័ក |
| b | ឆ្នាំពុទ្ធសករាជ | ២៥៥៦ |
| c | ឆ្នាំគ្រិស្តសករាជ| ២០១៩ |
| j | ឆ្នាំចុល្លសករាជ | ១៤៦៣ |

# Bug Report 🐞🐜🦗🕷🕸🦂🦟🐛🐌💣
I know there will be a lot of error.

# Testing
There is no test running on this package. If you are available for this work, it would be very awesome.

# Contribute 💡
Welcome pull request 

# References
* [គណនាម៉ោងទេវតាចុះ](http://www.dahlina.com/education/khmer_new_year_time.html?fbclid=IwAR0Eq6US-F0LfplMjKzmiRn7rvPgi31i74Wpv4mNhU034mzdyj-3hYrCA8w)
* [ប្រតិទិនចន្ទគតិ](http://www.cam-cc.org)

# Support me
I'm really happy if this project is useful to you.

If you would like to buy me some breakfast, here is my ABA account number: **000 485 222**. Don't forget to remark `momentkh` so that I can count it as usefulness of my work.
