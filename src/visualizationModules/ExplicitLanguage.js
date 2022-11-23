
import react, { useState, useEffect } from 'react';

import { Grid, Typography } from '@mui/material';

import MessageWithEmbed from '../components/MessageWithEmbed';
import TitleWithEmojis from '../components/TitleWithEmoji';

import useInterval from '../hooks/useInterval';

import { PieChart } from 'react-charts-d3';

import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const emojis = [ '😈', '🤬' ];

const ExplicitLanguage = (props) => {

    const { songs } = props;

    const getExplicitSongCount = (songs) => {
        return songs.reduce((accumulator, currentValue) => {
            return accumulator += currentValue.explicit;
        }, 0);
    }

    const [ playlistChartData, setPlaylistChartData ] = useState(() => {
        const totalSongCount = songs.length;
        const explicitSongCount = getExplicitSongCount(songs);
        return [
            { label : 'Clean', value : totalSongCount - explicitSongCount },
            { label : 'Explicit', value : explicitSongCount }
        ];
    });

    const [ explicitRatio, setExplicitRatio ] = useState(getExplicitSongCount(songs) / songs.length);

    const [ top100ChartData, setTop100ChartData ] = useState(() => {
        const explicitSongCount = 34;
        return [
            { label : 'Clean', value : 100 - 34 },
            { label : 'Explicit', value : explicitSongCount }
        ];
    });

    const msg = `About ${100 * explicitRatio}% of the songs on this playlist are explcit. Compare that to the playlist of the 100 most streamed songs on spotify, which clocks in at 34%.`;

    return (
        <Grid container columns={3}>
            <Grid item  xs={3}
                        key={0}>
                <TitleWithEmojis    emojis={emojis}
                                    msg='Explicit Language'/>
            </Grid>
            <Grid item  xs={1}
                        key={1}>
                <AnimationOnScroll animateIn='animate__fadeInLeftBig'>
                    <PieChart   data={playlistChartData}
                                colorScale = {{ from : '#084081', to : '#7F0000' }}
                                valueFormatter= {value => value} />
                </AnimationOnScroll>
            </Grid>

            <Grid item  xs={1}
                        key={3}
                        display='flex'
                        alignItems='center'>
                <AnimationOnScroll animateIn='animate__fadeInUp'>
                    <Typography variant='h5'
                                align='center'
                                >
                        {msg}
                    </Typography>
                </AnimationOnScroll>
            </Grid>

            <Grid item  xs={1}
                        key={4}>
                <AnimationOnScroll animateIn='animate__fadeInRightBig'>
                    <PieChart   data={top100ChartData}
                                colorScale = {{ from : '#084081', to : '#7F0000' }}
                                valueFormatter={value => value}
                                />
                </AnimationOnScroll>      
            </Grid>
        </Grid>
    );

}

export default ExplicitLanguage;
