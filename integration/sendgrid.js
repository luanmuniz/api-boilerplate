'use strict';

const sendgrid = require('sendgrid');

class SendgridLib {

	constructor() {
		let sendgridConfig = config.sendgrid;
		let sendgridInstance = sendgrid(sendgridConfig.apiKey);

		return Object.assign({},
			sendgridInstance,
			this
		);
	}

	async sendEmail({ from = this.context.config.sendgrid.defaultFrom, to, subject, body }) {
		let email = new this.sendgridInstance.Email({
			to: to,
			from: from,
			subject: subject
		});

		email.setFilters(this.context.config.sendgrid.filters || {});
		email.setHtml(body);
		return await sendgrid.send(email);
	}

};

module.exports = SendgridLib;