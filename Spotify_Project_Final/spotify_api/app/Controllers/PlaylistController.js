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
                // setAccessToken(ctx, tuples[0]);
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
                // setAccessToken(ctx, ctx.params.username);
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

    async updatePlaylistName(ctx) {
        return new Promise((resolve, reject) => {
            const playlist = ctx.request.body;
            let query = `
            UPDATE Playlist
            SET name = ?
            WHERE id = ?
            `;
            dbConnection.query(
                {
                    sql: query,
                    values: [playlist.name, ctx.params.id]
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

    async explicitSongs(ctx) {
        return new Promise((resolve, reject) => {
            let query = `
            SELECT * FROM
            explicit_playlist_songs
            WHERE playlist_id = ?
            `;
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.playlist_id]
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

    async addPlaylist(ctx) {
        return new Promise((resolve, reject) => {
            const newPlaylist = ctx.request.body;
            let query = `
                INSERT INTO Playlist 
                VALUES (?, ?, ?)
            `;
            dbConnection.query (
                {
                    sql: query,
                    values: [newPlaylist.id, newPlaylist.username, newPlaylist.name]
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
}

module.exports = PlaylistController;
