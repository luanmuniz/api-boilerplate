'use strict';

var Formater = {

	formatCNPJ(cnpj) {
		let formatedCNPJ = '';

		formatedCNPJ += cnpj.substr(0, 2) + '.'; // eslint-disable-line prefer-template no-magic-numbers
		formatedCNPJ += cnpj.substr(2, 3) + '.'; // eslint-disable-line prefer-template no-magic-numbers
		formatedCNPJ += cnpj.substr(5, 3) + '/'; // eslint-disable-line prefer-template no-magic-numbers
		formatedCNPJ += cnpj.substr(8, 4) + '-'; // eslint-disable-line prefer-template no-magic-numbers
		formatedCNPJ += cnpj.substr(12, 2); // eslint-disable-line no-magic-numbers

		return formatedCNPJ;
	},

	formatCPF(cpf) {
		let formatedCPF = '';

		formatedCNPJ += cpf.substr(0, 3) + '.'; // eslint-disable-line prefer-template no-magic-numbers
		formatedCNPJ += cpf.substr(3, 3) + '.'; // eslint-disable-line prefer-template no-magic-numbers
		formatedCNPJ += cpf.substr(6, 3) + '-'; // eslint-disable-line prefer-template no-magic-numbers
		formatedCNPJ += cpf.substr(9, 2); // eslint-disable-line no-magic-numbers

		return formatedCPF;
	},

	orderedUUID(uuid) {
		const uuidArray = uuid.split('-');

		return uuidArray[2] + uuidArray[1] + uuidArray[0] + uuidArray[3] + uuidArray[4];
	}

};

module.exports = Object.create(Formater);
