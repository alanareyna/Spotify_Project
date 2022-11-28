
import react, { useState, useMemo, useEffect } from 'react';

import { Typography, Grid } from '@mui/material';

import BarChart from '../../d3/components/BarChart/BarChart'

import useTimeout from '../../hooks/useTimeout'; 
import useInterval from '../../hooks/useInterval';

import MessageWithEmbed from '../../components/MessageWithEmbed';
import TitleWithEmojis from '../../components/TitleWithEmoji';

import SpotifyEmbed from '../../components/SpotifyEmbed';

import Top100Song from './Top100Song';
import BarChartSongsByDecade from './BarChartSongsByDecade';
import BarChartSongsByHighestDecade from './BarChartSongsByHighestDecade';

import { AnimationOnScroll } from 'react-animation-on-scroll';
import "animate.css/animate.min.css";

const config = {
    columns : 4,
    top100PerDecade : {
        '1990' : {
            title : 'Scar Tissue',
            artist : 'Red Hot Chili Peppers',
            id : '1G391cbiT3v3Cywg8T7DM1',
            weeks : 16
        },
        '2000' : {
            title : 'I Gotta Feeling',
            artist : 'The Black Eyed Peas',
            id : '2H1047e0oMSj10dgp7p2VG',
            weeks : 14
        }
    }
};

const sliderMarks = [
    { value : 1, label : '1' },
    { value : 5, label : '5' },
    { value : 10, label : '10' }
];

const clocks = [ '🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚' ];

const TripThroughTime = (props) => {

    const songs = props.songs;

    // Bucket size stuff - Used to control
    const [ bucketSize, setBucketSize ] = useState(10);

    const roundYearToIncrement = (year) => Math.floor(year / bucketSize) * bucketSize;

    const [ animate, setAnimate ] = useState(true);

    // Turn off animations after the first animate.
    useTimeout(() => {
        //setAnimate(false);
    }, 500)

    const [ oldestSong, setOldestSong ] = useState(() => {
        return songs.sort((el1, el2) => {
            return el1.releaseDate.getFullYear()- el2.releaseDate.getFullYear();
        }).at(0);
    });
    
    const [ newestSong, setNewestSong ] = useState(() => {
        return songs.sort((el1, el2) => {
            return el2.releaseDate.getFullYear() - el1.releaseDate.getFullYear();
        }).at(0);
    });

    const getDecadeCounts = (songs) => {
        const buckets = { };

        const oldestDecade = roundYearToIncrement(oldestSong.releaseDate.getFullYear());
        const newestDecade = roundYearToIncrement(newestSong.releaseDate.getFullYear());        

        for (let i = oldestDecade; i <= newestDecade; i+= bucketSize) {
            buckets[i.toString()] = 0;
        }

        for (let song of songs) {
            let year = roundYearToIncrement(song.releaseDate.getFullYear());
            buckets[year]++;
        }

        return buckets;
    }

    const getHighestDecade = function() {
        const decadeCountbuckets = getDecadeCounts(songs);

        let a = Object.keys(decadeCountbuckets).map((key) => {
            return { year : key, counts : decadeCountbuckets[key] };
        }).sort((el1, el2) => {
            return el2.counts - el1.counts;
        }).at(0).year;      
        return a;
    }

    const [ highestDecade, setHighestDecade ] = useState(getHighestDecade()) 

    return (
        <Grid   container
                columns={config.columns}>
            <Grid   item 
                    xs={config.columns}
                    key={0}>
                <TitleWithEmojis    emojis={clocks}
                                    msg='A Trip Through Time'/>
            </Grid>

            {/* Display the distribution of songs, broken down by decade. */}
            <Grid   item
                    xs={config.columns}
                    key={1}>
                    <BarChartSongsByDecade songs={songs}/>
            </Grid>

            {/* Take the decade with the most songs and display a more detailed set of information about it.*/}
            <Grid   item
                    xs={config.columns/2}
                    key={222}
                    justifyContent='center'
                    alignItems='center'>
                <Top100Song decade={highestDecade}/>
            </Grid>

            <Grid   item
                    xs={config.columns/2}
                    key={111}>
                <BarChartSongsByHighestDecade songs={songs} decade={highestDecade}/>
            </Grid>

            <Grid   item
                    xs={config.columns}
                    key={2}>
                <AnimationOnScroll animateIn='animate__fadeInLeftBig'>
                    <MessageWithEmbed   song={oldestSong}
                                        message={`The oldest song on the playlist is ${oldestSong.title} by ${oldestSong.artist}, released ${oldestSong.releaseDate.toLocaleString('en-US', {
                                            year : 'numeric',
                                            month : 'long',
                                            day : 'numeric'
                                        })}.`}
                                        textSide={'left'}/>
                </AnimationOnScroll>
            </Grid>
            <Grid   item
                    xs={config.columns}
                    key={3}>
                <AnimationOnScroll animateIn='animate__fadeInRightBig'>
                    <MessageWithEmbed   song={newestSong}
                                        message={`The newest song on the playlist is ${newestSong.title} by ${newestSong.artist}, released ${newestSong.releaseDate.toLocaleString('en-US', {
                                            year : 'numeric',
                                            month : 'long',
                                            day : 'numeric'
                                        })}.`}
                                        textSide={'right'}/>
                </AnimationOnScroll>
            </Grid>

        </Grid>
    )
    
}

export default TripThroughTime;
