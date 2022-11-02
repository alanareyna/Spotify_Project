
import react, { useState, useEffect } from 'react';

import { Grid, Typography } from '@mui/material';

import MessageWithEmbed from '../components/MessageWithEmbed';

const HottestTrack = (props) => {

    const { songs } = props;

    const getMostPopularSong = () => songs.sort((el1, el2) => el1.popularity - el2.popularity).at(-1);

    const [ mostPopularSong, setMostPopularSong ] = useState(() => getMostPopularSong());

    const msg = `The most popular song in the playlist is ${mostPopularSong.title} by ${mostPopularSong.artist}. Spotify gives it a popularity value of ${mostPopularSong.popularity}.`;

    return (
        <Grid container columns={2}>
            <Grid item xs={2} key={0}>
                <Typography variant='h3'
                            align='center'>
                    {'Hottest Track 🔥'}
                </Typography>
            </Grid>
            <Grid item xs={2} key={1}>
                <MessageWithEmbed   song={mostPopularSong}
                                    message={msg}
                                    textSide={'right'}/>
            </Grid>
        </Grid>
    );

}

export default HottestTrack;
