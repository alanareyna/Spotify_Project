
import react, { Fragment, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import MessageWithEmbed from '../components/MessageWithEmbed';
import TitleWithEmojis from '../components/TitleWithEmoji';

const emojis = [ '🍕', '🍔' ];

const BiteSized = (props) => {

    const songs = props.songs;

    const getShortestSong = (songs) => {
        return songs.sort((el1, el2) => el1.duration_ms - el2.duration_ms)[0];
    }

    const [ shortestSong, setShortestSong ] = useState(getShortestSong(songs));

    console.log(shortestSong.title)

    const message = `The shortest song in the playlist is ${shortestSong.title} by ${shortestSong.artist}.`

    return (
        <Grid container columns={2}>
            <Grid item xs={2} key={0}>
                <TitleWithEmojis  emojis={emojis}
                                msg={'Bite Sized'}/>
            </Grid>
            <Grid item xs={2} key={1}>
                <MessageWithEmbed   song={shortestSong}
                                    message={message}/>
            </Grid>
        </Grid>
    )
}

export default BiteSized;
