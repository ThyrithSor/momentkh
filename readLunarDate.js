const moment = require('moment')
require('./momentkh')(moment)

function getLocaleConfig () {
  return require('./locale/km')
}

let config = getLocaleConfig()

const mapper = {
	W: ["អាទិត្យ", "ច័ន្ទ|ចន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"],
	w: ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"],
	d: ["១?[០-៩]"],
	D: ["[០១][០-៩]"],
	n: ["ក", "រ"],
	N: ["កើត", "រោច"],
	o: ["᧡", "᧢", "᧣", "᧤", "᧥", "᧦", "᧧", "᧨", "᧩", "᧪", "᧫", "᧬", "᧭", "᧮", "᧯", "᧱", "᧲", "᧳", "᧴", "᧵", "᧶", "᧷", "᧸", "᧹", "᧺", "᧻", "᧼", "᧽", "᧾", "᧿"],
	m: ["មិគសិរ", "បុស្ស", "មាឃ", "ផល្គុន", "ចេត្រ|ចែត្រ", "ពិសាខ", "ជេស្ឋ", "អាសាធ|អាសាឍ", "ស្រាពណ៍", "ភទ្របទ", "អស្សុជ", "កក្តិក|កក្ដិក", "បឋមសាធ|បឋមសាឍ|បឋមាសាធ|បឋមាសាឍ", "ទុតិយសាធ|ទុតិយសាឍ|ទុតិយាសាធ|ទុតិយាសាឍ"],
	a: ["ជូត", "ឆ្លូវ", "ខាល", "ថោះ", "រោង", "ម្សាញ់", "មមីរ", "មមែ", "វក", "រកា", "ច", "កុរ"],
	e: ["ឯក", "ទោ", "ត្រី", "ចត្វា", "បញ្ច", "ឆ", "សប្ដ", "សប្ត", "អដ្ឋ", "នព្វ", "សំរឹទ្ធិ"],
	b: ["[០-៩]+"],
	c: ["[០-៩]+"],
	j: ["[០-៩]+"],
}

const MOON = mapper['N']
const DAY = mapper['W']
const MONTH = mapper['m']
const ANIMAL_YEAR = mapper['a']
const ERA = mapper['e']

function getRegExp(mapping) {
	return mapping.join('|')
}

function escapeRegex (string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

// Escape text inside bracket []
function escapeFormat(format) {
	const escapeStorage = []
	const result = format.replace(new RegExp('\\\[[^\\\]]+\\\]', 'g'), function(match) {
		const cacheKey = `@@@@@@@@@@@@@${escapeStorage.length}@@@@@@@@@@@@`
		escapeStorage.push(match.substring(1, match.length - 1))
		return cacheKey
	})
	return {
		storage: escapeStorage,
		format: escapeRegex(result),
	}
}

function readLunarDate (dateString, format) {
	
	const escaped = escapeFormat(format)
	const storage = escaped.storage
	let regexp = escaped.format.replace(
		new RegExp(Object.keys(mapper).join('|'), 'g'),
		function (match) {
			return '(' + `?<${match}>` + getRegExp(mapper[match]) + ')'
		}
	)
	regexp = regexp.replace(
		new RegExp("@@@@@@@@@@@@@([0-9]+)@@@@@@@@@@@@", 'g'),
		function (match) {
			return storage[match.replace(/@/g, '')]
		}
	)
	regexp = `^${regexp}$`

	console.log(regexp)

	const matched = config.postformat(dateString).match(new RegExp(regexp))

	if (matched === null) {
		console.error("Date doesn't match the format.")
		return
	}

	console.log(matched.groups)
	let today = moment()
	// console.log(dateString)
	// console.log(format)
}

// readLunarDate("ថ្ងៃអាទិត្យ ១៤កើត ខែមិគសិរ ឆ្នាំជូត ទោស័ក ពុទ្ធសករាជ ២៥៦៤")
readLunarDate("14កើត មិគសិរ ឆ្នាំជូត year ២៥៦៤", "dN m [ឆ្នាំ]a [year] b")
