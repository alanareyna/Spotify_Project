
import react, { useState, useMemo, useEffect } from 'react';

import { Typography, Grid, Slider } from '@mui/material';

import { BarChart, ScatterChart } from 'react-charts-d3';

import useTimeout from '../hooks/useTimeout'; 
import useInterval from '../hooks/useInterval';

import MessageWithEmbed from '../components/MessageWithEmbed';
import TitleWithEmojis from '../components/TitleWithEmoji';

import format from 'd3-format';

const config = {
    columns : 4
};

const sliderMarks = [
    { value : 1, label : '1' },
    { value : 5, label : '5' },
    { value : 10, label : '10' }
];

const clocks = [ '🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚' ];

const roundYearToDecade = (year) => Math.floor(year / 10) * 10;

const TripThroughTime = (props) => {

    const songs = props.songs;

    const [ oldestSong, setOldestSong ] = useState(() => {
        return songs.sort((el1, el2) => {
            return el1.releaseDate.getFullYear()- el2.releaseDate.getFullYear();
        }).at(0);
    });
    
    const [ newestSong, setNewestSong ] = useState(() => {
        return songs.sort((el1, el2) => {
            return el1.releaseDate.getFullYear() - el2.releaseDate.getFullYear();
        }).at(-1);
    });

    const [ barData, setBarData ] = useState(() => {
        const data = [
            {
                key : 'Song Counts',
                values : [ ]
            }
        ];

        // Find the oldest and newest valid decade
        const oldestDecade = roundYearToDecade(oldestSong.releaseDate.getFullYear());
        const newestDecade = roundYearToDecade(newestSong.releaseDate.getFullYear());

        // Gather the corresponding counts of the decades
        const buckets = { };
        for (let i = oldestDecade; i <= newestDecade; i+= 10) {
            buckets[i.toString()] = 0;
        }

        for (let song of songs) {
            let year = roundYearToDecade(song.releaseDate.getFullYear());
            buckets[year]++;
        }

        //
        for (const year of Object.keys(buckets)) {
            data[0]['values'].push({ x : year, y : buckets[year] });
        }

        return data;       
    });

    const [ lineData, setLineData ] = useState(() => {
        const data = [
            {
                key : 'Song Counts',
                values : songs.map((song) => {
                    return {
                        x : song.releaseDate.getFullYear(),
                        y : 0
                    };
                })
            }
        ];

        return data;
    })

    const [ animate, setAnimate ] = useState(true);

    // Turn off animations after the first animate.
    useTimeout(() => {
        setAnimate(false);
    }, 500)

    return (
        <Grid   container
                columns={config.columns}>
            <Grid   item 
                    xs={config.columns}
                    key={0}>
                <TitleWithEmojis    emojis={clocks}
                                    msg='A Trip Through Time'/>
            </Grid>

            <Grid   item
                    xs={config.columns}
                    key={1}>
                <BarChart   data={barData}
                            animate={animate}
                            delay={25}
                            height={350}
                            axisConfig={{
                                showXAxis : true,
                                showYAxis : true,
                                xLabel : 'Decade',
                                yLabel : '# of Songs'
                            }}
                            marign={{
                                top : 25,
                                bottom : 30,
                                left : 75,
                                right : 75
                            }}/>
            </Grid>

            <Grid   item xs={1}> </Grid>
            <Grid   item xs={2}>
                <Slider defaultValue={10}
                        min={1}
                        max={10}
                        marks={[
                            {value : 1, label : '1'},
                            {value : 5, label : '5'},
                            {value : 10, label : '10'}
                        ]}/>
            </Grid>
            <Grid   item xs={1}> </Grid>

            <Grid   item
                    xs={config.columns}
                    key={25972}>
                <ScatterChart   data={lineData}
                                height={50}
                                xScaleType='linear'
                                tickFormat='d'
                                axisConfig={{
                                    showXAxis: true,
                                    showXAxisLabel: true,
                                    xLabel: 'X Axis',
                                    xLabelPosition: 'right',
                                    showYAxis: false,
                                    showYAxisLabel: false,
                                    yLabel: '',
                                    yLabelPosition: 'top', }}
                                showLegend={false}/>
            </Grid>

            <Grid   item
                    xs={config.columns}
                    key={2}
                    sx={{
                        display : 'flex',
                        justifyContent : 'center'
                    }}>
                <MessageWithEmbed   song={oldestSong}
                                    leadingMsg={'The oldest song in the playlist is'}/>
            </Grid>
            <Grid   item
                    xs={config.columns}
                    key={3}
                    sx={{
                        display : 'flex',
                        justifyContent : 'center'
                    }}>
                <MessageWithEmbed   song={newestSong}
                                    leadingMsg={'The newest song in the playlist is'}
                                    textSide={'right'}/>
            </Grid>

        </Grid>
    )
    
}

export default TripThroughTime;
