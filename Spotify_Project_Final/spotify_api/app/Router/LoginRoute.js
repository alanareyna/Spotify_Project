/*
|--------------------------------------------------------------------------
| Login router
|--------------------------------------------------------------------------
|
| Login router is used to define routes that belong to the Login
| controller. 
|
*/

const LoginController = new (require('../Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});

// get username to authorize user at login
loginRouter.get('/:username', LoginController.authorizeUser, (err) => console.log("LoginRoute.js: loginRouter error:", err));

// update/change password 
loginRouter.put('/updatePassword/:username', LoginController.updatePasswordByUsername, (err) => console.log("LoginRoute.js: loginRouter error", err));

loginRouter.post('/addUser', LoginController.createNewUser, (err) => console.log("LoginRoute.js: loginRouter error", err));

loginRouter.delete('/deleteUser/:username', LoginController.deleteUser, (err) => console.log("LoginRoute.js: loginRouter error", err));

loginRouter.delete('/deleteUser/noPlaylists/:username', LoginController.deleteUserWithoutPlaylists, (err) => console.log("LoginRoute.js: loginRouter error", err))


module.exports = loginRouter;