/**
 * This is the file that contains all API routes
 */

// import middleware 
const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});


/*
|--------------------------------------------------------------------------
| Login router
|--------------------------------------------------------------------------
|
| Login router is used to define routes that belong to the Login
| controller. 
|
*/
const LoginController = new (require('../app/Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:username', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));

/*
|--------------------------------------------------------------------------
| Playlist router
|--------------------------------------------------------------------------
|
| Playlist router is used to define routes that belong to the Playlist
| controller. 
|
*/
const PlaylistController = new(require('../app/Controllers/PlaylistController'))();
const playlistRouter = require('koa-router')({
    prefix: '/playlist'
});
playlistRouter.use(VerifyJWT);
playlistRouter.get('/all', PlaylistController.allPlaylists, (err) => {
    console.log(`PlaylistController::allPlaylists error: ${err}`);
})
playlistRouter.get('/:username', PlaylistController.playlistsByUser, (err) => {
    console.log(`PlaylistController::playlistsByUser error: ${err}`);
})

/*
|--------------------------------------------------------------------------
| Song router
|--------------------------------------------------------------------------
|
| Song router is used to define routes that belong to the Song
| controller. 
|
*/
const SongController = new(require('../app/Controllers/SongController'))();
const songRouter = require('koa-router')({
    prefix : '/song'
});
songRouter.use(VerifyJWT);
songRouter.get('/all', SongController.allSongs, (err) => {
    console.log(`SongController::allSongs error: ${err}`);
})

songRouter.get('/:playlist', SongController.songsByPlaylist, (err) => {
    console.log(`SongController::songsByPlaylist error: ${err}`)
});

songRouter.get('/withgenre/:playlist', SongController.songsByPlaylistWithGenres, (err) => {
    console.log(`SongController::songsByPlaylistWithGenres error: ${err}.`)
})

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
