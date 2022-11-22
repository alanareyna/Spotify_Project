const Koa = require('koa');
const api = new Koa();
const bodyParser = require('koa-bodyparser');
const http = require('http');

require('dotenv').config();
api.use(bodyParser());

api.use(async (ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401) {
            console.log('index.js: sending 401 to the client.');
            ctx.status = 401;
            ctx.body = 'JWT Token expired. If this was an app in production, you do not want to tell the public why their request was rejected!';
        } else {
            console.log('index.js: one of the modules in the chain fired an exception.');
            console.log(`The error message is ${err}`);
        }
    });
});

require('./app/Router/spotify_api_routes');

const httpsServer = require('./config/ssl/ssl.js')(api.callback());
httpsServer.listen(process.env.APP_PORT, () => console.log(`Listening on HTTPS port ${process.env.APP_PORT}`));
