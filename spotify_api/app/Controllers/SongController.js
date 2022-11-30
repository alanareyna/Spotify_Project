
const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

class SongController {

    async allSongs(ctx) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM Song';
            dbConnection.query({
                sql : query
            }, (error, tuples) => {
                if (error) {
                    console.log('Error in SongController::allSongs');
                    console.log(error);
                    return reject(`Query error: ${error}`);
                }

                console.log(tuples);
                ctx.body = {
                    status : 'OK',
                    songs : tuples
                }

                return resolve();
            })
        }).catch((err) => {
            console.log(`PlaylistController::allSongs error:`, err);
            ctx.status = 200;
            ctx.body = {
                status : 'Failed',
                error : err
            }
        }) 
    }

    async songsByPlaylist(ctx) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT * FROM Song where id in (
                    SELECT song from playlist_song where playlist = ?
                );
            `;
            dbConnection.query({
                sql : query,
                values : [ ctx.params.playlist ]
            }, (error, tuples) => {
                if (error) {
                    console.log('Error in SongController::songsByPlaylist');
                    console.log(error);
                    return reject(`Query error: ${error}`);
                }

                console.log(tuples);
                ctx.body = {
                    status : 'OK',
                    songs : tuples
                }

                return resolve();
            })
        }).catch((err) => {
            console.log(`SongController::songsByPlaylist error:`, err);
            ctx.status = 200;
            ctx.body = {
                status : 'Failed',
                error : err
            }
        })         
    }

}

module.exports = SongController;

