const momentkh = require('@thyrith/momentkh');

const khmer = momentkh.fromGregorian(2026,5,1,23,59,59);
console.log(momentkh.format(khmer));