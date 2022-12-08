const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

class LoginController {
    /**
     * authorizeUser: Checks if the user on login is a valid user
     * @param ctx 
     * @returns resolve or reject 
     */
    async authorizeUser(ctx) {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM User WHERE username = ?";
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.username]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: ${error}`);
                    }
                    if (tuples.length === 1) {  // Did we have a matching user record?
                        setAccessToken(ctx, tuples[0]);
                        console.log('from loginController. About to return ', tuples[0]);
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

    async updatePasswordByUsername(ctx) {
        return new Promise((resolve, reject) => {
            const user = ctx.request.body;
            let query = `
            UPDATE User
            SET password = ?
            WHERE username = ?
            `;
            dbConnection.query(
                {
                    sql: query,
                    values: [user.password, ctx.params.username]
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 201;
                    resolve();
                });
        });
    }

    async createNewUser(ctx) {
        return new Promise((resolve, reject) => {
            const user = ctx.request.body;
            let query = `
                INSERT INTO User
                VALUES (?, ?, ?, ?)
            `;
            dbConnection.query(

                {
                    sql: query,
                    values: [user.username, user.password, user.firstname, user.lastname]
                }, (err, res) => {
                    if(err) {
                        ctx.status = 400;
                        ctx.body = err.sqlMessage ?? 'Error';
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 201;
                    resolve();
                });
        });
    }

    async deleteUser(ctx) {
        return new Promise((resolve, reject) => {
            let query = `
            DELETE FROM User 
            WHERE username = ?
            `;
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.username]
                }, (err, res) => {
                    if(err) {
                        ctx.status = 400;
                        ctx.body = err.sqlMessage ?? 'Error';
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 201;
                    resolve();
                });
        });
    }

    async deleteUserWithoutPlaylists(ctx) {
        return new Promise((resolve, reject) => {
            let query = `
            CALL delete_noplaylist_users(?)
            `;
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.username]
                }, (err, res) => {
                    if(err) {
                        ctx.status = 400;
                        ctx.body = err.sqlMessage ?? 'Error';
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 201;
                    resolve();
                });
        });
    }

}

module.exports = LoginController;
