// USER CONTROLLER CONTROLS DATA ABOUT THE USER...? USER PROFILE PAGE
// GET INFO LIKE 

const dbConnection = require('../../database/mySQLconnect');

/******************************************************************************
 * User Controller
 * This controller is in charge of authorizing User information, updating user
 * information, adding users, and deleting a user. 
 *****************************************************************************/

class UserController {

    async authorizeUser(ctx) {
        return new Promise((resolve, reject) => {

	    // Right up here, you could inspect the provided uers_id to
	    // make sure that it is, at the surface, a legitimate ID.
	    // For example, if user ids are suppose to be email addresses,
	    // you can at least make sure that user's input is consistent
	    // with the format of email addresses. 
	    
            let query = "SELECT * FROM User WHERE username = ?";
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.username]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    if (tuples.length === 1) {  // Did we have a matching user record?
                        setAccessToken(ctx, tuples[0]);
                        console.log('from userRecord. About to return ', tuples[0]);
                        ctx.body = {
                            status: "OK",
                            user: tuples[0],
                        };
                    } else {
                        console.log('Not able to identify the user.');
			return reject('No such user.');
                    }
                    return resolve();
                }
            )
        }).catch(err => {
            console.log('authorize in LoginController threw an exception. Reason...', err);
	    ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });

    }

    async createUser(ctx) {
        return new Promise((resolve, reject) => {
            const user = ctx.request.body;
            const query = `
                INSERT INTO User
                (username, password, firstName, lastName) VALUES
                (?, ?, ?, ?)
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [user.username, user.password, user.firstName, user.lastName]
                }, (err, res) => {
                    if (err) {
                        ctx.status = 400;
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 201;
                    resolve();
                });
        });
    }

    async getUserInfo(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT username, firstName, lastName
                FROM User
                WHERE username = ?
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.username]
                }, (err, res) => {
                    if (err){
                        ctx.status = 400;
                        reject(err);
                    }
                    ctx.status = 201;
                    resolve(res);
                });
        });
    }
}

module.exports = UserController;
