/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/

// import the other routes
loginRouter = require('./LoginRoute');
playlistRouter = require('./PlaylistRoute');
songRouter = require('./SongRoute');

const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'Default Router: This is our Spotify Journey app!\n';
});

/**
 * Register all of the controllers into the default controller.
 */
 router.use(
    '',
    loginRouter.routes(),
    playlistRouter.routes(),
    songRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};