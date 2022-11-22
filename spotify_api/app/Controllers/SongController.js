const dbConnection = require('../../database/mySQLconnect');

/******************************************************************************
 * Song Controller
 * This controller is in charge of handling adding songs from a playlist
 * and getting information about a song
 *****************************************************************************/

class SongController {
    // ADD SONG
    async addSong(ctx) {
        console.log("Add song controller is called...");
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO Song
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,)
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.id, ctx.params.album, ctx.params.dancebility, ctx.params.duration_ms, 
                        ctx.params.energy, ctx.params.key, ctx.params.loudness, ctx.params.mode, ctx.params.tempo,
                        ctx.params.time_signature, ctx.params.valence, ctx.params.explicit]
                }, (err, res) => {
                    if(err){
                        console.log("Connection error in SongController::addSong");
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

    // add get song info given a song
    async getSongInfo(ctx) {
        console.log("getSongInfo from song controller is called");
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * 
                FROM Song
                WHERE id = ? 
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.id]
                }, (err, res) => {
                    if(err){
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

    // add get all songs? maybe for the profile splash page?
    async getAllSongs(ctx) {
        console.log("getAllSongs from song controller is called");
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * 
                FROM Song
            `;

            dbConnection.query(
                {
                    sql: query,
                }, (err, res) => {
                    if(err){
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

    // add delete song (only delete if there are no occurrences in any other playlist) ?? toughy 
}

module.exports = SongController;
