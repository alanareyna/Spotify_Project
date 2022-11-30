

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


// login router
const LoginController = new (require('../app/Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:username', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));

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

// Routes-related routes.

// const RoutesController = new (require('../app/Controllers/RoutesController.js'))();
// const routesRouter = require('koa-router')({
//     prefix: '/routes'
// });

// routesRouter.use(VerifyJWT);
// routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes);
// routesRouter.get('/:cycleID/all-routes-summary', Authorize('admin'), RoutesController.allRoutesSummary);
// routesRouter.get('/:routeID', Authorize('admin'), RoutesController.routeWithRouteID);
// routesRouter.post('/insert-route', Authorize('admin'), RoutesController.insertNewRoute);

// Accounts-related routes.

// const AccountsController = new (require('../app/Controllers/AccountsController.js'))();
// const accountsRouter = require('koa-router')({
//     prefix: '/accounts'
// });

// accountsRouter.use(VerifyJWT);
// accountsRouter.get('/:routeID/route-accounts', Authorize('admin'), AccountsController.accountsForRoute);
// accountsRouter.get('/:cycleID/:routeID/route-accounts-summary', Authorize('admin'), AccountsController.accountsSummaryForRoute);

//         return axiosAgent.get(`accounts/${routeID}/route-accounts-summary`);

// CycleID-related routes.

// const CycleIDController = new (require('../app/Controllers/CycleIDs.js'))();
// const cycleIDRouter = require('koa-router')({
//     prefix: '/cycles'
// });

// cycleIDRouter.use(VerifyJWT);
// cycleIDRouter.get('/:numCycleIDs/cycleIDs', Authorize('admin'), CycleIDController.cycleIDInfoForNCycles);

// Transactions-related routes

// const TransactionsController = new (require('../app/Controllers/TransactionsController.js'))();
// const transactionsRouter = require('koa-router')({
//     prefix: '/transactions'
// });

// transactionsRouter.use(VerifyJWT);
// transactionsRouter.get('/:cycleID/for-cycle-with-id', Authorize('admin'), TransactionsController.transactionsForCycleID);
// transactionsRouter.get('/:routeID/:cycleID/route-in-cycle', Authorize('admin'), TransactionsController.transactionsForRouteInCycle);
// transactionsRouter.get('/:accountID/:cycleID/account-in-cycle', Authorize('admin'), TransactionsController.transactionsForAccountInCycle);
// transactionsRouter.get('/:numCycles/summary-for-cycles', Authorize('admin'), TransactionsController.transactionsForSummaryInCycles);

// Markets-related routes

// const MarketsController = new (require('../app/Controllers/MarketsController.js'))();
// const marketsRouter = require('koa-router')({
//     prefix: '/markets'
// });

// marketsRouter.use(VerifyJWT);
// marketsRouter.get('/all-markets', Authorize('admin'), MarketsController.allMarkets);
// marketsRouter.get('/all-markets-summary', Authorize('admin'),
//     MarketsController.allMarketsSummary);

// Employees-related routes

// const EmployeeController = new (require('../app/Controllers/EmployeeController.js'))();
// const employeesRouter = require('koa-router')({
//     prefix: '/employees'
// });

// employeesRouter.use(VerifyJWT);
// employeesRouter.get('/all-employees', Authorize('admin'), EmployeeController.allEmployees);


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    playlistRouter.routes(),
    songRouter.routes()
    //routesRouter.routes(),
    //accountsRouter.routes(),
    //cycleIDRouter.routes(),
    //transactionsRouter.routes(),
    //marketsRouter.routes(),
    //employeesRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
