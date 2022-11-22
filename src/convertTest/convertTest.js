
const fs = require('fs');
const toConvert = require('./toConvert.json');

// Take the objects and 'flatten' them

const createSongObject = (trackObj) => {
    const song = { };

    // Get all the attributes from the track object that we can.
    const attrs = [ 'id', 'explicit', 'popularity', 'duration_ms', 'name'];
    for (let attr of attrs) {
        song[attr] = trackObj[attr];
    }

    song['artist'] = trackObj.artists[0].name;

    // Get the corresponding features object.
    const featureObj = toConvert['audio_features'].filter((obj) => {
        return obj.id === trackObj.id;
    })[0];


    

    const features = [ 'danceability', 'energy', 'valence', 'tempo' ];
    for (let feature of features) {
        song[feature] = featureObj[feature];
    }

    return song;
}


const songs = toConvert.tracks.map((trackObj) => {
    return createSongObject(trackObj);
});

const statements = songs.map(s => {
    // This will change with the spec.
    const attrs = [ 'id', 'explicit', 'popularity', 'duration_ms', 'name', 'danceability', 'energy', 'valence', 'tempo' ];

    return `INSERT INTO Songs (${attrs.join(', ')})${'\n'}VALUES (${
        attrs.map(attr => {
            return `'${s[attr]}'`
        }).join(', ')
    });`
})

statements.forEach(element => {
    console.log(element)
});
