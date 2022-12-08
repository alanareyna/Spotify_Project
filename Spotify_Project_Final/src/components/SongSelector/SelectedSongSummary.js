
import { Grid, Typography } from '@mui/material';

import { msToMins, formatDate } from '../../utils/Date&Time';

const SelectedSongSummary = (props) => {

    const { song } = props;

    return (
        <Grid container columns={1}>
            <Grid item xs={1}>
                <Typography>
                    {`${song.title} by ${song.artist}, released ${formatDate(song.releaseDate)}`}
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <Typography>
                    {`Length: ${msToMins(song.duration_ms)}`}
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <Typography>
                    {`Popularity: ${song.popularity}`}
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <Typography>
                    {`Dancability: ${song.danceability}`}
                </Typography>
            </Grid>
            
            <Grid item xs={1}>
                <Typography>
                    {`Valence: ${song.valence}`}
                </Typography>
            </Grid>

            <Grid item xs={1}>
                <Typography>
                    {`Genre tags: ${song.genres.length === 0 ? 'No associated genre tags' : song.genres.join(', ')}`}
                </Typography>
            </Grid>

        </Grid>
    )

}

/*
                                                title : 'Hallelujah',
                                                artist : 'Jeff Buckley',
        releaseDate : new Date('1994-08-23'),
        id : '3pRaLNL3b8x5uBOcsgvdqM',
                                                popularity : 70,
        explicit : false,
        "danceability": 0.324,
        "energy": 0.136,
        "key": 0,
        "loudness": -10.33,
        "mode": 1,
        "speechiness": 0.0318,
        "acousticness": 0.931,
        "instrumentalness": 0.00117,
        "liveness": 0.176,
        "valence": 0.0831,
        "tempo": 97.256,
        "duration_ms": 413827,
        "time_signature": 3
*/

export default SelectedSongSummary;
