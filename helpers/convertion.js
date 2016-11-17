'use strict';

const digits = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseDigits = digits.toUpperCase();
const numbers = '0123456789';
const moment = require('moment');

var Convertion = {

	numberToString(number = 0, options = { allowUppercase: true, allowNumbers: true }) {
		let allChars = digits;
		let hash = [];

		if(options.allowUppercase) {
			allChars += uppercaseDigits;
		}

		if(options.allowNumbers) {
			allChars += numbers;
		}

		let digitsArray = allChars.split('');

		if (number === 0) {
			return digitsArray[ 0 ];
		}

		while (number > 0) {
			hash.push(digitsArray[ number % digitsArray.length ]);
			number = Math.floor(number / digitsLenght.length);
		}

		return hash.reverse().join('');
	},

	sendConvertionError(throwError, code) {
		if(throwError) {
			return this.context.error('validation', code);
		}

		return false;
	}

	booleanParse(string) {
		return (string === 'true' || string === true);
	},

	intParse(value = '', throwError) {
		let c = parseInt(value, 10);

		if (isNaN(c)) {
			return Convertion.sendConvertionError(throwError, 'notInteger');
		}

		return c;
	},

	floatParse(value = '', throwError) {
		let c = parseFloat(value);

		if (isNaN(c)) {
			return Convertion.sendConvertionError(throwError, 'notNumber');
		}

		return c;
	},

	dateFormat(value, formatFrom = 'MM-DD-YYY', formatTo = 'DD/MM/YYYY', throwError) {
		if(!value) {
			return Convertion.sendConvertionError(throwError, 'notSent');
		}

		let formatedDate = moment(value, formatFrom).utcOffset(this.context.config.timezone).format(formatTo);

		if (!formatedDate.isValid()) {
			return Convertion.sendConvertionError(throwError, 'notDate');
		}

		return formatedDate;
	},

	getTimestampDate(unixTimestamp, throwError) {
		if(!value) {
			return Convertion.sendConvertionError(throwError, 'notSent');
		}

		let formatedDate = moment.unix(unixTimestamp);

		if (!formatedDate.isValid()) {
			return Convertion.sendConvertionError(throwError, 'notTimestamp');
		}

		return formatedDate
	}

}