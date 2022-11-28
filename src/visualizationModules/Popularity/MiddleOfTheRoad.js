

import react, { useState, useEffect } from 'react';

import { Grid, Typography } from '@mui/material';

import MessageWithEmbed from '../../components/MessageWithEmbed';

import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const MiddleOfTheRoad = (props) => {

    const { songs } = props;

    const getMedianPopularitySong = () => songs.sort((el1, el2) => el1.popularity - el2.popularity).at(Math.floor(songs.length / 2));

    const [ mostPopularSong, setMostPopularSong ] = useState(() => getMedianPopularitySong());

    const msg = `The most average popularity song in the playlist is ${mostPopularSong.title} by ${mostPopularSong.artist}. Spotify gives it a popularity value of ${mostPopularSong.popularity}.`;

    return (
        <Grid container columns={2}>
            <Grid item xs={2} key={1}>
                <AnimationOnScroll animateIn='animate__fadeInRightBig'>
                    <MessageWithEmbed   song={mostPopularSong}
                                        message={msg}
                                        textSide={'right'}/>
                </AnimationOnScroll>
            </Grid>
        </Grid>
    );

}

export default MiddleOfTheRoad;

