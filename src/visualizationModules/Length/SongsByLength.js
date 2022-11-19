
import react, { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import ShortestSong from './ShortestSong';
import TitleWithEmojis from '../../components/TitleWithEmoji';
import LongestSong from './LongestSong';
import BarChartByLength from './BarChartByLength';

const getShortestSong = (songs) => {
    return songs.sort((el1, el2) => el1.duration_ms - el2.duration_ms).at(0);
}

const getLongestSong = (songs) => {
    return songs.sort((el1, el2) => el1.duration_ms - el2.duration_ms).at(-1); 
}

const SongsByLength = (props) => {

    const { songs } = props;

    const [ shortestSong, setShortestSong ] = useState(getShortestSong(songs));
    const [ longestSong, setLongestSong ] = useState(getLongestSong(songs));

    return (
        <Grid   container
                columns={1}>

            <Grid   item
                    xs={1}
                    key={10}>
                <TitleWithEmojis    msg={'Songs By Length'}/>
            </Grid>

            <Grid   item
                    xs={1}
                    key={11}>
                <BarChartByLength   songs={songs}
                                    shortest={shortestSong}
                                    longest={longestSong}/>
            </Grid>

            <Grid   item
                    xs={1}
                    key={0}>
                <ShortestSong song={shortestSong}/>
            </Grid>

            <Grid   item
                    xs={1}
                    key={1}>
                <LongestSong song={longestSong}/>
            </Grid>

        </Grid>
    )

}

export default SongsByLength;
