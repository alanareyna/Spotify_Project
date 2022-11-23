
import react, { useState } from 'react';

import { Fragment, Grid, Typography } from '@mui/material';

import MessageWithEmbed from '../../components/MessageWithEmbed';

import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const emojis = [ '💎', '💍' ];

const HiddenGem = (props) => {

    const { songs } = props;

    const getLeastPopularSong = () => songs.sort((el1, el2) => el1.popularity - el2.popularity)[0];

    const [ leastPopularSong, setLeastPopularSong ] = useState(() => getLeastPopularSong());

    const messageBank = [
        "We're sure it's a good one, the others just haven't caught on yet.",
        "Everyone knows the best song is one nobody else knows about.",
        "When everyone starts listening to this one, remind them you were here first."
    ];

    const [ flavorText, setFlavorText ] = useState(() => {
        const index = Math.floor(Math.random()*messageBank.length);
        return messageBank[index];
    });

    const msg = `The least popular song in the playlist is ${leastPopularSong.title} by ${leastPopularSong.artist}. Spotify gives it a popularity value of ${leastPopularSong.popularity}. ${flavorText}`;

    return (
        <Grid   container
                columns={2}>
            <Grid   item
                    xs={2}
                    key={1}>
                <AnimationOnScroll animateIn='animate__fadeInLeftBig'>
                    <MessageWithEmbed song={leastPopularSong} message={msg}/>
                </AnimationOnScroll>
            </Grid>
        </Grid>
    );

}

export default HiddenGem;
