/*
|--------------------------------------------------------------------------
| Playlist router
|--------------------------------------------------------------------------
|
| Playlist router is used to define routes that belong to the Playlist
| controller. 
|
*/

// import middleware 
// const VerifyJWT = require('../Middleware/VerifyJWT.js');
// const Authorize = require('../Middleware/Authorize.js');

const PlaylistController = new(require('../Controllers/PlaylistController.js'))();
const playlistRouter = require('koa-router')({
    prefix: '/playlist'
});
//playlistRouter.use(VerifyJWT);
playlistRouter.get('/all', PlaylistController.allPlaylists, (err) => console.log(`PlaylistController::allPlaylists error: `, err));
playlistRouter.get('/:username', PlaylistController.playlistsByUser, (err) => {
    console.log(`PlaylistController::playlistsByUser error: ${err}`);
});

playlistRouter.put('/updatePlaylistName/:id', PlaylistController.updatePlaylistName, (err) => {
    console.log(`PlaylistController::updatePlaylistName error: ${err}`);
});

playlistRouter.get('/explicitSongs/:playlist_id', PlaylistController.explicitSongs, (err) => {
    console.log(`PlaylistController::explicitSongs error: ${err}`)
});

playlistRouter.post('/addPlaylist', PlaylistController.addPlaylist, (err) => {
    console.log(`PlaylistController::explicitSongs error: ${err}`)
});

module.exports = playlistRouter;