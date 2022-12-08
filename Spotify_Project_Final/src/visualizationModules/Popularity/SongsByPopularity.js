
import { Stack, Grid, Typography } from '@mui/material';
import react, { useState } from 'react';

import TitleWithEmojis from '../../components/TitleWithEmoji';
import BarChartByPopularity from './BarChartByPopularity';
import PopularityDescription from './PopularityDescription';
import HiddenGem from './HiddenGem';
import MiddleOfTheRoad from './MiddleOfTheRoad';
import HottestTrack from './HottestTrack';
import PopularityQuiz from './PopularityQuiz';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const config = {
    columns : 4,
    emojis : [ '🙂', '😀' ]
}

const SongsByPopularity = (props) => {

    const { songs } = props;

    return (
        <Stack spacing={1}>
            <AnimationOnScroll animateIn='animate__pulse' initiallyVisible={true}>
                <TitleWithEmojis emojis={config.emojis} msg={'Songs By Popularity'}/>
            </AnimationOnScroll>
            <BarChartByPopularity songs={songs}/>
            <PopularityDescription/>            
            <HiddenGem songs={songs}/>
            <MiddleOfTheRoad songs={songs}/>
            <HottestTrack songs={songs}/>
            <PopularityQuiz songs={songs}/>
        </Stack>
    )

}

export default SongsByPopularity;
