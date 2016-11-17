'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const userConfig = require('./config/config.json')[NODE_ENV];
const defaultConfig = require('./config/configDefault.json');
const config = Object.assign({}, defaultConfig, userConfig);

const log = require('./helpers/log');
const crypto = require('./helpers/crypto');
const password = require('./helpers/password');
const validation = require('./helpers/validation');
const errorLib = require('./helpers/error');
const EmailClass = require('./helpers/email');

const Koa = require('koa');
const helmet = require('koa-helmet');
const ratelimit = require('koa-ratelimit');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');
const bodyParser = require('koa-bodyparser');
const ipList = require('koa-ip');

const redis = require('redis');

const server = new Koa();

// Set Globals
global.config = config;
global.log = log;
global.crypto = crypto;
global.password = password;
global.validation = validation;
global.errorLib = errorLib;
global.email = new EmailClass(config.email.provider);

// Log all the incoming requests
server.use(log.requests);

// Use limiter and Whitelist or Blacklist for api access
server
	.use(ipList(config.ipList))
	.use(ratelimit({
		db: redis.createClient(config.redis),
		duration: config.rateLimit.durantion,
		max: config.rateLimit.max,
		id: (context) => context[config.rateLimit.context]
	}))


// Security Configuration
server.use(helmet({
	hidePoweredBy: { setTo: config.poweredBy }
}))

// Others
server
	.use(compress())
	.use(responseTime())
	.use(bodyParser({ onerror(err, ctx) { ctx.throw(errorLib.list.system.bodyParsing, 422); } }))

server
	.use(async function (ctx, next) {
		const start = new Date();
		await next();
		const ms = new Date() - start;
		ctx.set('X-Response-Time', `${ms}ms`);
	})
	.use(async (ctx, next) => {
		try {
			await next(); // next is now a function
		} catch (err) {
			ctx.body = { message: err.message };
			ctx.status = err.status || 500;
		}
	});

server.on('error', (err, ctx) => log.error('server error', err, ctx));

server.listen(config.port || 3000);