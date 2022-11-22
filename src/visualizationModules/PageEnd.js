
import { useState } from 'react';
import { Box, Stack, Grid, Typography } from '@mui/material';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const StarFlair = (props) => {

    const { perRow } = props;
    const fillRate = .5;

    const [ stars, setStars ] = useState(() => {
        const vals = Array(perRow*3).fill('');
        return vals.map(val => {
            return {
                star : Math.random() < fillRate ? (Math.random() < 0.1 ? '🚀': '⭐') : '',
                anim : Math.random() < .5 ? 'animate__fadeInLeft' : 'animate__fadeInRight'
            };
        });
    });

    return (
        <Grid container columns={perRow}>
        {
            stars.map(val => {
                return (
                    <Grid item xs={1}>
                            <AnimationOnScroll animateIn={val.anim}>
                                <Typography variant='h2' align='center'>
                                    {val.star}
                                </Typography>
                            </AnimationOnScroll>
                    </Grid>
                )
            })
        }
        </Grid>
    )

}

const PageEnd = (props) => {

    return (
        <Stack spacing={5}>
            <Typography></Typography>
            <Typography></Typography>
            <AnimationOnScroll animateIn='animate__pulse' initiallyVisible={true}>
                <Typography variant="h3" align="center">
                    {`You've reached the end of your journey!`}
                </Typography>
            </AnimationOnScroll>
            <Typography variant="h4" align="center" style={{ mb : 5 }}>
                {'Click the ⬆️ button to return to the top of the page'}
            </Typography>
            <Typography></Typography>
            <Typography></Typography>
        </Stack>
    )

}

export default PageEnd;
