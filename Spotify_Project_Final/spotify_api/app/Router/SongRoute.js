/*
|--------------------------------------------------------------------------
| Song router
|--------------------------------------------------------------------------
|
| Song router is used to define routes that belong to the Song
| controller. 
|
*/

// import middleware 
// const VerifyJWT = require('../Middleware/VerifyJWT.js');

const SongController = new(require('../Controllers/SongController.js'))();
const songRouter = require('koa-router')({
    prefix : '/song'
});
// songRouter.use(VerifyJWT);
songRouter.get('/all', SongController.allSongs, (err) => {
    console.log(`SongController::allSongs error: ${err}`);
})

songRouter.get('/:playlist', SongController.songsByPlaylist, (err) => {
    console.log(`SongController::songsByPlaylist error: ${err}`)
});

songRouter.get('/withgenre/:playlist', SongController.songsByPlaylistWithGenres, (err) => {
    console.log(`SongController::songsByPlaylistWithGenres error: ${err}.`)
})

module.exports = songRouter;