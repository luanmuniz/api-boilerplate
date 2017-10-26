'use strict';

const fs = require('fs');
const marked = require('marked');

class Email {

	constructor(provider) {
		let ProviderModule = require(`../integration/${provider}`);
		let providerLib = new ProviderModule(config[provider]);

		return Object.assign({}, Email, providerLib)
	}

	renderEmail(template = 'default', variableObj) {
		const markdownFile = fs.readFileSync(`${__dirname}/../config/email-templates/${template}.md`, { encoding: 'utf8' });
		let fileRendered = marked(markdownFile);

		Object.keys(variableObj).forEach((variableName) => {
			let variableRegex = new RegExp(`{{${variableName}}}`, 'g');

			fileRendered = fileRendered.replace(variableRegex, variableObj[variableName]);
		});

		return variableName;
	}

};

module.exports = Email;
