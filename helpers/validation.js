'use strict';

const Joi = require('joi');

module.exports = Joi.extend({
	base: Joi.string().trim().lowercase(),
	name: 'string',
	language: { cpf: 'must be a valid CPF number' },
	rules: [{
		name: 'cpf',
		description: 'Valid CPF number',
		validate(params, value, state, options) {
			if (!value) {
				return this.createError('string.cpf', { v: value }, state, options);
			}

			let sumFirst = 0;
			let sumSecond = 0;
			let verFrist = 0;
			let verSecond = 0;

			let cpf = value.replace(/[^\d]+/g, '').toString();
			if( !cpf || cpf.length !== 11
				|| cpf === '00000000000' || cpf === '11111111111'
				|| cpf === '22222222222' || cpf === '33333333333'
				|| cpf === '44444444444' || cpf === '55555555555'
				|| cpf === '66666666666' || cpf === '77777777777'
				|| cpf === '88888888888' || cpf === '99999999999'
			) {
				return this.createError('string.cpf', { v: value }, state, options);
			}

			for (let x = 0; x < 9; x++) {
				sumFirst += parseInt(cpf.charAt(x), 10) * (10 - x);
			}

			for (let y = 0; y < 10; y++) {
				sumSecond += parseInt(cpf.charAt(y), 10) * (11 - y);
			}

			verFrist = 11 - (sumFirst % 11);
			verSecond = 11 - (sumSecond % 11);

			if(verFrist > 9) {
				verFrist = 0;
			}

			if(verSecond > 9) {
				verSecond = 0;
			}

			if (verFrist !== parseInt(cpf.charAt(9), 10) || verSecond !== parseInt(cpf.charAt(10), 10)) {
				return this.createError('string.cpf', { v: value }, state, options);
			}

			return cpf;
		}
	}]

}, {
	base: Joi.string().trim().lowercase().email(),
	name: 'string',
	language: { checkDomain: 'must have a valid domain' },
	rules: [{
		name: 'checkDomain',
		validate(params, value, state, options) {
			return value; // Everything is OK
		}
	}]
}, {
	base: Joi.any(),
	name: 'any',
	language: { cep: 'must have a valid cep' },
	rules: [{
		name: 'cep',
		validate(params, value, state, options) {
			return value; // Everything is OK
		}
	}]
}, {
	base: Joi.number().integer().min(10).max(99),
	name: 'any',
	language: { telefone: 'must have a valid brazilian telephone' },
	rules: [{
		name: 'telefone',
		validate(params, value, state, options) {
			return value; // Everything is OK
		}
	}]
}, {
	base: Joi.number().integer().min(10).max(99),
	name: 'number',
	language: { ddd: 'must have a valid ddd with only 2 numbers' },
	rules: [{
		name: 'ddd',
		validate(params, value, state, options) {
			return value; // Everything is OK
		}
	}]
});
