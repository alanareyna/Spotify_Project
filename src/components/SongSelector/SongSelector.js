

import react, { Fragment, useState } from 'react';

import { Box, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Menu, Stack } from '@mui/material';

import SpotifyEmbed from '../SpotifyEmbed';

import SelectedSongSummary from './SelectedSongSummary';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const Title = () => {

    return (
        <Stack direction='row' justifyContent='center'>
                <Typography variant='h1' align='right'>
                    {'Song Selector'}
                </Typography> 
                <AnimationOnScroll animateIn='animate__tada' initiallyVisible={true}>
                    <Typography variant='h1' align='left'>
                        {'🔍'}
                    </Typography>
                </AnimationOnScroll>
        </Stack>
    )
}

const SelectedSongInformation = (props) => {

    const { song } = props;

    return (
        <Grid container columns={2}>
            <Grid item xs={1} key={2} justifyContent='center' display='flex'>
                <SpotifyEmbed song={song} theme={1} width={'75%'}/>
            </Grid>

            <Grid item xs={1} key={1} justifyContent='center'>
                <SelectedSongSummary song={song}/>
            </Grid>
        </Grid> 
    )   

}

const SongSelector = (props) => {

    const { songs } = props;
    const [ currentSong, setCurrentSong ] = useState(0);

    const getCurrentSong = () => {
        return songs[currentSong];
    }

    const handleChange = (event) => {
        setCurrentSong(event.target.value);
    }

    return (
        <Stack spacing={1}>

            <Title/>

            <Typography align='center'>{'Pick a specific song and view it\'s raw information from Spotify.'}</Typography>
            
            <Box    display='flex'
                    justifyContent='center'
                    alignItems='center'>
                <FormControl style={{ minWidth : 250 }}>
                    <InputLabel>{'Song'}</InputLabel>
                    <Select label='Song'
                            defaultValue={currentSong}
                            onChange={handleChange}>
                    {
                        songs.sort((el1, el2) => {
                            return el1.title.localeCompare(el2.title);
                        }).map((song, idx) => {
                            return <MenuItem value={idx}>{song.title}</MenuItem>
                        })
                    }
                    </Select>
                </FormControl>
            </Box>

            <SelectedSongInformation song={getCurrentSong()}/>

        </Stack>
    )

}

export default SongSelector;
