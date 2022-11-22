const dbConnection = require('../../database/mySQLconnect');

/******************************************************************************
 * Artist Controller
 * This controller is in charge of handling adding new artists, getting 
 *  Artist information, and deleting Artists? 
 *****************************************************************************/

class ArtistController {
    // ADD ARTIST 
    async addArtist(ctx) {
        console.log("Calling Artist controller: addArtist");
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO Artist
                VALUES (?, ?, ?, ?)
            `;

            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.id, ctx.params.name, ctx.params.popularity, ctx.params.type]
                }, (err, res) => {
                    if (err){
                        return reject(err);
                    }
                    return resolve(res);
                });
        }).catch(err => console.log("Database connection error.", err));
    }

    // get info about an artist
    async getArtist(ctx) {
        console.log("Get artist from artist controller is called");
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * 
                FROM Artist
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

    // DELETE ARTIST ONLY IF THE ARTIST DOES NOT APPEAR IN ANY CURRENT PLAYLISTS

}
module.exports = ArtistController;