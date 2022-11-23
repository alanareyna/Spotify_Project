
import react, { useState } from 'react';

import { Stack, Grid, Paper, Typography } from '@mui/material';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const config = {
    desc :  `Spotify defines their popularity metric like so:` + 
             `The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. ` + 
             `Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity.`
};

const PopularityDescription = () => {

    return (
        <Grid container columns={3} alignItems='center'>
            <Grid item xs={1}>
                <AnimationOnScroll animateIn='animate__fadeIn'>
                    <Typography variant='h3' align='center'>{'How does Spotify measure popularity?'}</Typography>
                </AnimationOnScroll>
            </Grid>
            <Grid item xs={2}>
                <AnimationOnScroll animateIn='animate__fadeIn'>
                    <Typography>
                        {config.desc}
                    </Typography>
                </AnimationOnScroll>
            </Grid>
        </Grid>
    )

}

export default PopularityDescription;
