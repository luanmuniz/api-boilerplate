'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const userConfig = require('./config/config.json')[NODE_ENV];
const defaultConfig = require('./config/configDefault.json');
const config = Object.assign({}, defaultConfig, userConfig);

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
global.crypto = require('./helpers/crypto');
global.password = require('./helpers/password');
global.validation = require('./helpers/validation');
global.errorLib = require('./helpers/error');
global.log = require('./helpers/log').init(config.log);
global.email = require('./helpers/email').init(config.email.provider);

// Log all the incoming requests
server.use(global.log.requests);

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
	.use(bodyParser({ onerror(err, ctx) { ctx.throw(global.errorLib.list.system.bodyParsing, 422); } }))

server
	.use(global.log.addResponseTimeHeader)
	.use(async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			ctx.body = { message: err.message };
			ctx.status = err.status || 500;
		}
	});

server.on('error', (err, ctx) => global.log.error('server error', err, ctx));

server.listen(config.port || 3000);
