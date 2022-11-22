const dbConnection = require('../../database/mySQLconnect');


/******************************************************************************
 * Playlist Controller
 * This controller is in charge of handling adding new playlists, getting 
 * current playlist information, and deleting playlists
 *****************************************************************************/
class PlaylistController {

    // ADD PLAYLIST
    async addPlaylist(ctx) {
        console.log("Calling Playlist controller- add Playlist");
        return new Promise((resolve, reject) => {
            // am I dealing with a foreign key correctly?
            const query = `
                INSERT INTO Playlist 
                (id, username, name, total) VALUES
                (?, ?, ?, ?)
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.id, ctx.params.username, ctx.params.name, ctx.params.total]
                }, (err, res) => {
                    if(err){
                        console.log("Connection error in PlaylistController::addPlaylist", err);
                        ctx.body = [];
                        ctx.status = 200;
                        return reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    return resolve(res);
                });
        }).catch(err => console.log("Database connection error.", err));
    }

    // gets one particular playlist, should I add get ALL playlists associated with a user?? also, how would this work with
    // the authorization?? 
    async getPlaylist(ctx) {
        console.log("Calling Playlist controller, getPlaylist");
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * 
                FROM Playlist
                WHERE name = ? 
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.name]
                }, (err, res) => {
                    if (err){
                        console.log("Connection error in PlaylistController::getPlaylist", err);
                        ctx.body = [];
                        ctx.status = 200;
                        return reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    return resolve(res);
                });
        }).catch(err => console.log("Database connection error.", err));
    }

    
    // DELETE PLAYLIST
    async deletePlaylist(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM Playlist
                WHERE name = ? and id = ?
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.name, ctx.params.id]
                }, (err, res) => {
                    if (err){
                        console.log("Connection error in PlaylistController::deletePlaylist", err);
                        ctx.body = [];
                        ctx.status = 200;
                        return reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    return resolve(res);
                });
        }).catch(err => console.log("Database connection error.", err));
    }


}

module.exports = PlaylistController;