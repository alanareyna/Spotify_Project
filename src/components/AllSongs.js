
import react, { useState } from 'react'; 

import { Grid, Typography } from '@mui/material';
import SpotifyEmbed from './SpotifyEmbed';

import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import TitleWithEmojis from './TitleWithEmoji';

const config = {
    columns : 4
};

const AllSongs = (props) => {

    const { songs, embedColSpan } = props;

    return (
        <Grid   container
                columns={config.columns}
                display='flex'
                justifyContent='center'
                >

            <Grid item xs={config.columns} key={123098}>
                <Typography variant='h1'
                            align='center'>
                    {'All Songs'}
                </Typography>
            </Grid>

        {
            //index % 2 === 0 ? 'animate__fadeInLeftBig' : 'animate__fadeInRightBig'
            songs.map((song, index) => {
                return (
                    <Grid item xs={1} key={index} justifyContent='center' display='flex' mb={2}>
                        <AnimationOnScroll animateIn='animate__fadeIn'>
                            <SpotifyEmbed song={song} theme={1} width={'100%'}/>
                        </AnimationOnScroll>
                    </Grid>
                )
            })
        }
        </Grid>
    )

}

export default AllSongs;
