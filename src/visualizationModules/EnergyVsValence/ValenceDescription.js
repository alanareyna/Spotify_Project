
import { Grid, Typography } from "@mui/material"

import { AnimationOnScroll } from "react-animation-on-scroll";

const config = {
    desc : `Spotify defines valence as: ` +
    `"A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."`
};

const ValenceDesciption = (props) => {
    return (
        <Grid container columns={3} alignItems='center'>
            <Grid item xs={2}>
                <AnimationOnScroll animateIn='animate__fadeIn'>
                    <Typography>
                        {config.desc}
                    </Typography>
                </AnimationOnScroll>
            </Grid>
            <Grid item xs={1}>
                <AnimationOnScroll animateIn='animate__fadeIn'>
                    <Typography variant='h3' align='center'>{'How does Spotify define Valence? 🎭'}</Typography>
                </AnimationOnScroll>
            </Grid>
        </Grid>
    )
}

export default ValenceDesciption;
