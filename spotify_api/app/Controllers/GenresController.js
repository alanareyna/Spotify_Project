const dbConnection = require('../../database/mySQLconnect');

/******************************************************************************
 * Genres Controller
 * This controller is in charge of handling getting genre(s) given an artist,
 *  getting the most occuring genre, least occuring genre, getting artists
 * associated with a genre
 *****************************************************************************/

class GenreController {
    // get genre given an Artist
    async getGenre(ctx) {
        console.log("getGenre is called");
        return new Promise((resolve, reject) => {
            const query = `
                SELECT genre
                FROM Genres
                WHERE artist = ?
            `;
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.artist]
                }, (err, res) => {
                    if (err){
                        return reject(err);
                    }
                    return resolve(res);
                });
        }).catch(err => console.log("Database connection error.", err));
    }

    // get most occuring genre 
    // async mostOccuringGenre(ctx) {
    //     console.log("mostOccuringGenre is called");
    //     return new Promise((resolve, reject) => {
    //         const query = `
    //             SELECT * 
    //             FROM Genres
    //             WH
    //         `
    //     })
    // }
}

module.exports = GenreController;