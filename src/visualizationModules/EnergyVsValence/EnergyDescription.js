
import { Grid, Typography } from "@mui/material"

import { AnimationOnScroll } from "react-animation-on-scroll";

const config = {
    desc : `Spotify defines energy as: ` +
    `"Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy."`
};

const EnergyDesciption = (props) => {
    return (
        <Grid container columns={3} alignItems='center'>
            <Grid item xs={1}>
                <AnimationOnScroll animateIn='animate__fadeIn'>
                    <Typography variant='h3' align='center'>{'How does Spotify define Energy? ⚡'}</Typography>
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

export default EnergyDesciption;
