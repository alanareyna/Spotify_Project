
import { useState } from 'react';

import { Grid, Stack, Typography } from '@mui/material';

import EnergyDesciption from './EnergyDescription';
import ValenceDesciption from './ValenceDescription';
import ScatterEnergyVsValence from './ScatterEnergyVsValence';
import MessageWithEmbed from '../../components/MessageWithEmbed';

import { AnimationOnScroll } from 'react-animation-on-scroll';

const Title = () => {
    return (
        <Stack direction='row'>
            <Typography variant='h2'>{'⚡'}</Typography>
            <Typography variant='h2'>{'Energy vs. Valence'}</Typography>
            <Typography></Typography>
        </Stack>
    )
}

const LeastEnergeticSong = (props) => {

    const { songs } = props;

    const getLeastEnergySong = () => {
        return songs.sort((el1, el2) => {
            return el1.energy - el2.energy;
        }).at(0);
    }

    const [ leastEnergy, setLeastEnergy ] = useState(getLeastEnergySong());

    return (
        <AnimationOnScroll animateIn='animate__fadeInLeftBig'>
            <MessageWithEmbed   song={leastEnergy}
                                message={`The least energetic song on the playlist is ${leastEnergy.title} by ${leastEnergy.artist}. It has an energy value of ${leastEnergy.energy}.`}/>
        </AnimationOnScroll>
    )

}

const MostEnergeticSong = (props) => {

    const { songs } = props;

    const getMostEnergySong = () => {
        return songs.sort((el1, el2) => {
            return el1.energy - el2.energy;
        }).at(-1);
    }

    const [ mostEnergy, setMostEnergy ] = useState(getMostEnergySong());

    return (
        <AnimationOnScroll animateIn='animate__fadeInRightBig'>
            <MessageWithEmbed   song={mostEnergy}
                                textSide='right'
                                message={`The most energetic song on the playlist is ${mostEnergy.title} by ${mostEnergy.artist}. It has an energy value of ${mostEnergy.energy}.`}/>
        </AnimationOnScroll>
    )
    
}

const LeastValenceSong = (props) => {
    const { songs } = props;

    const getLeastValenceSong = () => {
        return songs.sort((el1, el2) => {
            return el1.valence - el2.valence;
        }).at(0);
    }

    const [ leastValence, setLeastValence ] = useState(getLeastValenceSong());

    return (
        <AnimationOnScroll animateIn='animate__fadeInLeftBig'>
            <MessageWithEmbed   song={leastValence}
                                message={`The song with the least valence is ${leastValence.title} by ${leastValence.artist}. It has an valence value of ${leastValence.valence}.`}/>
        </AnimationOnScroll>
    )
}


const MostValenceSong = (props) => {

    const { songs } = props;

    const getMostValenceSong = () => {
        return songs.sort((el1, el2) => {
            return el1.valence - el2.valence;
        }).at(-1);
    }

    const [ mostValence, setMostValence ] = useState(getMostValenceSong());

    return (
        <AnimationOnScroll animateIn='animate__fadeInRightBig'>
            <MessageWithEmbed   song={mostValence}
                                textSide='right'
                                message={`The song with the most valence is ${mostValence.title} by ${mostValence.artist}. It has an valence value of ${mostValence.valence}.`}/>
        </AnimationOnScroll>
    )
    
}

const EnergyVsValence = (props) => {

    const { songs } = props;

    return (
        <Stack spacing={1}>
            <AnimationOnScroll animateIn='animate__pulse' initiallyVisible>
                <Typography variant='h1' align='center'>
                    {'Energy vs. Valence'}
                </Typography>
            </AnimationOnScroll>
            <EnergyDesciption/>
            <ValenceDesciption/>
            <Grid container columns={2}>
                <Grid item xs={1}>
                    <ScatterEnergyVsValence songs={songs}/>
                </Grid>
                <Grid item xs={1} alignItems='center'>
                    <Stack spacing={1}>
                        <Typography variant='h3' align='center'>{'What can this chart tell us?'}</Typography>
                        <Typography>{`Typically, songs which are higher energy tend to be generally happier as they are more upbeat. Because of this associtation, we tend to see songs clustered in two portions of the graph; the upper right where songs are happy and energetic, and the bottom left where songs are slower and more somber. Can you see these associations among your own songs?`}</Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container columns={1}>
                <Grid item xs={1}>
                    <LeastEnergeticSong songs={songs}/>
                </Grid>
                <Grid item xs={1}>
                    <MostEnergeticSong songs={songs}/>
                </Grid>
                <Grid item xs={1}>
                    <LeastValenceSong songs={songs}/>
                </Grid>
                <Grid item xs={1}>
                    <MostValenceSong songs={songs}/>
                </Grid>
            </Grid>
        </Stack>
    )

}

export default EnergyVsValence;
