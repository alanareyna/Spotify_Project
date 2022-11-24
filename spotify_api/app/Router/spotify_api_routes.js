// const Authorize = require('../Middleware/Authorize.js');
const VerifyJWT = require('../Middleware/VerifyJWT.js');

/**
 * This is our default router which links to our home page
 */
 const home = require("koa-router")({
     prefix: '/home'
 });
 
 home.get('/', (ctx) => {
     ctx.status = 200;
     ctx.body = "Home page routed!";
 });

 /**
  * This is our login router which links to our login page
  */
// loginRouter(VerifyJWT);
const loginRouter = require("koa-router")({
    prefix: '/login'
});

// initialize the userController
// We will use the userController for the login and profile page
const userController = new (require('../Controllers/UserController.js'))();

// use user controller to authorize a user's input to see if there is a user that exists with
// that data
loginRouter.get('/', userController.authorizeUser, (err) => 
    console.log("loginRouter error: ", err));
 // add a user at the register page
 loginRouter.post('/register', userController.createUser, (err) => console.log("loginRouter error: ", err));

/**
 * This is our user router: this one will be the route for our profile page 
 */

 const userRouter = require('koa-router')({
     prefix: '/:username'
 });
 
 // userRouter(VerifyJWT);
 // get user information for the profile page
 userRouter.get('/', userController.getUserInfo, (err) => console.log("userRouter error: ", err));

/**
 * This is our playlist router
 */
const playlistController = new (require('../Controllers/PlaylistController.js'))();
const playlistRouter = require('koa-router')({
    prefix: '/playlist'
});

// playlistRouter(VerifyJWT);
// add a playlist from the add playlist button from the drop down menu 
playlistRouter.post('/addPlaylist', playlistController.addPlaylist, (err) => console.log("playlistRouter error:", err));
// get playlist information from the drop down menu 
playlistRouter.get('/:name', playlistController.getPlaylist, (err) => console.log("playlistRouter error: ", err));
// delete playlist from the playlist drop down menu
playlistRouter.delete('/deletePlaylist', playlistController.deletePlaylist, (err) => console.log("playlistRouter error: ", err));
// route to the visualization page based on the playlist 
playlistRouter.get('/:name/visualizationPage', playlistController.getPlaylist, (err) => console.log("playlistRouter error:", err));

/**
 * This is our Album router
 */
const albumController = new (require('../Controllers/AlbumController.js'))();
const albumRouter = require('koa-router')({
    prefix: '/album'
});

// albumRouter(VerifyJWT);
albumRouter.get('/:name', albumController.getAlbum, (err) => console.log("albumRouter error:", err));
albumRouter.post('/', albumController.addAlbum, (err) => console.log("albumRouter error: ", err));

/**
 * This is our Artist router 
 */
const artistController = new (require('../Controllers/ArtistController.js'))();
const artistRouter = require('koa-router')({
    prefix: '/artist'
});

// artistRouter(VerifyJWT);
artistRouter.get('/:name', artistController.getArtist, (err) => console.log("artistRouter error: ", err));
artistRouter.post('/', artistController.addArtist, (err) => console.log("artistRouter error: ", err));

/**
 * This is our Genres router
 */
const genresController = new (require('../Controllers/GenresController.js'))();
const genresRouter = require('koa-router')({
    prefix: '/genre'
});

// genresRouter(VerifyJWT);
genresRouter.get('/', genresController.getGenre, (err) => console.log("genreRouter error: ", err));

/**
 * This is our song router
 */
const songController = new (require('../Controllers/SongController.js'))();
const songRouter = require('koa-router')({
    prefix: '/song'
});

// songRouter(VerifyJWT);
songRouter.post('/', songController.addSong, (err) => console.log("songRouter error: ", err));
songRouter.get('/', songController.getSongInfo, (err) => console.log("songRouter error: ", err));
songRouter.get('/', songController.getAllSongs, (err) => console.log("songRouter error: ", err));

/**
 * This is our profile page router which links to our profile page
 */
 const profileRouter = require("koa-router")({
    prefix: '/profile/:username'
});
profileRouter.use(VerifyJWT);

home.use(
    '',
    loginRouter.routes(),
    userRouter.routes(),
    playlistRouter.routes(),
    albumRouter.routes(),
    artistRouter.routes(),
    songRouter.routes(),
    genresRouter.routes()
);

module.exports = function (app) {
    app.use(home.routes());
    app.use(home.allowedMethods());
};
