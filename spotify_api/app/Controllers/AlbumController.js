const dbConnection = require('../../database/mySQLconnect');

/******************************************************************************
 * Album Controller
 * This controller is in charge of handling adding new albums, getting 
 * current album information, and deleting albums
 *****************************************************************************/

class AlbumController {

    // ADD ALBUM
    async addAlbum(ctx) {
        console.log("Add album from album controller is called");
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO Album
                VALUES (?, ?, ?, ?, ?, ?, ?, )
            `;

            dbConnection.query({
                sql: query,
                values: [ctx.params.id, ctx.params.album_type, ctx.params.total_tracks, ctx.params.name,
                    ctx.params.release_date, ctx.params.release_date_precision, ctx.params.type]
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

    // GET ALBUM INFO BASED ON AN ID? or change to name? 
    // *** CHECK IF THERE ARE MULTIPLE ALBUMS WITH THE SAME NAME *** 
    async getAlbum(ctx) {
        console.log("Get album from album controller is called");
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * 
                FROM Album
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

    // holding off on implementing delete... we only want to delete the entire album if there are no other songs in the database
    // from that album ... 

}

module.exports = AlbumController;