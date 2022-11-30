const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

class PlaylistController {

    async allPlaylists(ctx) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM Playlist';
            dbConnection.query({
                sql : query
            }, (error, tuples) => {
                if (error) {
                    console.log('Error in PlaylistController::allPlaylists');
                    console.log(error);
                    return reject(`Query error: ${error}`);
                }

                console.log(tuples);
                ctx.body = {
                    status : 'OK',
                    playlists : tuples
                }

                return resolve();
            })
        }).catch((err) => {
            console.log(`PlaylistController::allPlaylists error:`, err);
            ctx.status = 200;
            ctx.body = {
                status : 'Failed',
                error : err
            }
        }) 
    }

    async playlistsByUser(ctx) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM Playlist where username = ?';
            dbConnection.query({
                sql : query,
                values : [ ctx.params.username ]
            }, (error, tuples) => {
                if (error) {
                    console.log('Error in PlaylistController::playlistsByUser');
                    console.log(error);
                    return reject(`Query error: ${error}`);
                }

                console.log(tuples);
                ctx.body = {
                    status : 'OK',
                    playlists : tuples
                }

                return resolve();
            })
        }).catch((err) => {
            console.log(`PlaylistController::playlistsByUser error:`, err);
            ctx.status = 200;
            ctx.body = {
                status : 'Failed',
                error : err
            }
        })         
    }

}

module.exports = PlaylistController;
