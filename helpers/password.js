/* globals zimplib */

'use strict';

var helperPassword = {

	init(secretKey) {
		this.secretKey = secretKey;
	},

	queryToCreatePassword(userEmail, rawPassword) {
		return `MD5(CONCAT('${rawPassword}', MD5(CONCAT(SUBSTRING_INDEX(${userEmail}, '@', 1 ), '${this.secretKey}', SUBSTRING_INDEX(${userEmail}, '@', -1 )))))`;
	},

	createHash(email, rawPassword, method = 'md5') {
		var salt = this.getSalt(email, method),
			password;

		if(salt === false) {
			return false;
		}

		if(rawPassword === undefined) {
			return null;
		}

		password = this.context.crypto[method](rawPassword + salt);
		return password;
	},

	getSalt(email, method = 'md5') {
		const validEmail = this.context.validation.validate({ email }, { email: Joi.string().checkDomain() });
		const arrayEmail = validEmail.split('@');

		if(!isValidEmail) {
			return false;
		}

		return this.context.crypto[method](arrayEmail[ 0 ] + this.secretKey + arrayEmail[ 1 ]);
	},

	validateHash(hash, email, rawPassword, method = 'md5') {
		var validHash = this.createHash(email, rawPassword, method);
		return hash === validHash;
	}

};

module.exports = Object.create(helperPassword);
