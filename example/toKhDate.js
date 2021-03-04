const moment = require('moment')
require('../momentkh')(moment)

let today = moment('1996-09-24T00:00:00.000');

console.log(today.toKhDate())
