'use strict';

var Log = {

	requests(ctx, next) {
		return;
	},

	async addResponseTimeHeader(ctx, next) {
		const start = new Date();
		await next();
		const ms = new Date() - start;
		ctx.set('X-Response-Time', `${ms}ms`);
	}

};

module.exports = Object.create(Log);
