'use strict';

const crc32 = require('sse4_crc32');
const nodeCrypto = require('crypto');

class Crypto {

	static md5(string) {
		return nodeCrypto.createHash('md5').update(string).digest('hex');
	}

	static sha256(string) {
		return nodeCrypto.createHash('sha256').update(string).digest('hex');
	}

	static sha512(string) {
		return nodeCrypto.createHash('sha512').update(string).digest('hex');
	}

	static base64(string, encoding = 'utf8') {
		return Buffer.from(string, encoding).toString('base64');
	}

	static crc32(string) {
		return Sse4Crc32.calculate(string);
	}

};

module.exports = Crypto;