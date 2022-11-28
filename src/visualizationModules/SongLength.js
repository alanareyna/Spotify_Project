
import react, { Fragment, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import MessageWithEmbed from '../components/MessageWithEmbed';
import TitleWithEmojis from '../components/TitleWithEmoji';

import { BarChart } from 'react-charts-d3';
import { configure } from '@testing-library/react';

const config  = {
    columns : 2,
    emojisMarathon : [ '🏃‍♂️', '🏃‍♀️' ]
};

const emojis = [ '🍕', '🍔' ];

const roundLength = (length) => Math.floor(length / 30000) * 30000;

const msToMins = (ms) => {

    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const SongLength = (props) => {

    const songs = props.songs;

    const getShortestSong = (songs) => {
        return songs.sort((el1, el2) => el1.duration_ms - el2.duration_ms)[0];
    }

    const getLongestSong = (songs) => {
        return songs.sort((el1, el2) => el1.duration_ms - el2.duration_ms).at(-1);
    }

    const [ shortestSong, setShortestSong ] = useState(getShortestSong(songs));
    const [ longestSong, setLongestSong ] = useState(getLongestSong(songs));

    const [ chartData, setChartData ] = useState(() => {

        const data = [ { key : 'Song Counts by Length', values : [ ] } ];

        // Find the oldest and newest valid decade
        const shortest = roundLength(shortestSong.duration_ms);
        const longest = roundLength(longestSong.duration_ms);


        // Gather the corresponding counts of the decades
        const buckets = { };
        for (let i = 0; i <= longest; i+= 30000) {
            buckets[i.toString()] = 0;
        }

        for (let song of songs) {
            let len = roundLength(song.duration_ms);

            buckets[len]++;
        }


        
        const correctedData = [{
            key : 'Song Counts By Length',
            values : [ ] 
        }]
        
        for (const duration of Object.keys(buckets)) {  
            let m = msToMins(parseInt(duration));
            
            data[0]['values'].push({
                x : m, 
                y : buckets[duration]
            });
        }
        
        

        return data; 
    });

    const message = `The shortest song in the playlist is ${shortestSong.title} by ${shortestSong.artist}.`

    return (
        <Grid container columns={config.columns}>
            <Grid item xs={config.columns} key={0}>
                <BarChart   data={chartData}
                            animate={false}
                            delay={25}
                            height={350}
                            axisConfig={{
                                showXAxis : true,
                                showYAxis : true,
                                xLabel : 'Song Length',
                                yLabel : '# of Songs'
                            }}
                            marign={{
                                top : 25,
                                bottom : 30,
                                left : 75,
                                right : 75
                            }}
                            colorScale={{
                                from : '#1db954',
                                to : '#1ed760'
                            }}/>
            </Grid>

            <Grid item xs={config.columns} key={1}>
                <TitleWithEmojis  emojis={emojis}
                                msg={'Bite Sized'}/>
            </Grid>
            <Grid item xs={config.columns} key={2}>
                <MessageWithEmbed   song={shortestSong}
                                    message={`The shortest song in the playlist is ${shortestSong.title} by ${shortestSong.artist} at only ${msToMins(shortestSong.duration_ms)} long.`}/>
            </Grid>
            <Grid item xs={config.columns} key={3}>
                <TitleWithEmojis    emojis={config.emojisMarathon}
                                    msg={'Marathon'}/>
            </Grid>
            <Grid item xs={config.columns} key={4}>
                <MessageWithEmbed   song={longestSong}
                                    message={`The longest song in the playlist is ${longestSong.title} by ${longestSong.artist} at ${msToMins(longestSong.duration_ms)} long.`}
                                    textSide='right'/>
            </Grid>
        </Grid>
    )
}

export default SongLength;
