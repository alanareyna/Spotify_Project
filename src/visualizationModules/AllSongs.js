
import react, { useState } from 'react'; 

import { Box, Stack, InputLabel, MenuItem, Grid, Typography, Select, FormControl, Menu } from '@mui/material';
import SpotifyEmbed from '../components/SpotifyEmbed';

import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import TitleWithEmojis from '../components/TitleWithEmoji';

const config = {
    columns : 4
};

const AllSongs = (props) => {

    const { songs, embedColSpan } = props;

    const [ sortCriteria, setSortCriteria ] = useState('title');

    const sorts = {
        'title' : (el1, el2) => {
            return el1.title.localeCompare(el2.title);
        }
    }

    const handleChange = (event) => {
        setSortCriteria(event.target.value);
    }

    return (
        <Stack spacing={1}>
            <AnimationOnScroll animateIn='animate__pulse' initiallyVisible>
                <Typography     variant='h1'
                                align='center'>
                    {'All Songs'}
                </Typography>
            </AnimationOnScroll>

            <Box    display='flex'
                    justifyContent='center'
                    alignItems='center'>
                <FormControl style={{ minWidth : 250 }}>
                    <InputLabel>{'Sort By'}</InputLabel>
                    <Select label="Sort By"
                            defaultValue={sortCriteria}
                            onChange={handleChange}>
                        <MenuItem value='title'>{'Title'}</MenuItem>
                        <MenuItem value='danceability'>{'Dancability'}</MenuItem>
                        <MenuItem value='energy'>{'Energy'}</MenuItem>
                        <MenuItem value='duration_ms'>{'Length'}</MenuItem>
                        <MenuItem value='popularity'>{'Popularity'}</MenuItem>
                        <MenuItem value='releaseDate'>{'Release Date'}</MenuItem>
                        <MenuItem value='valence'>{'Valence'}</MenuItem>

                    </Select>

                </FormControl>
            </Box>


            <Grid   container
                    columns={config.columns}
                    display='flex'
                    justifyContent='center'
                    >
            {
                //index % 2 === 0 ? 'animate__fadeInLeftBig' : 'animate__fadeInRightBig'
                songs.sort(sorts[sortCriteria] === undefined ? (el1, el2) => {
                    return el1[sortCriteria] - el2[sortCriteria];
                } : sorts[sortCriteria]).map((song, index) => {
                    return (
                        <Grid item xs={1} key={index} justifyContent='center' display='flex' mb={2}>
                            <AnimationOnScroll animateIn='animate__fadeIn'>
                                <SpotifyEmbed song={song} theme={1} width={'100%'}/>
                            </AnimationOnScroll>
                        </Grid>
                    )
                })
            }
            </Grid>
        </Stack>
    )

}

export default AllSongs;
