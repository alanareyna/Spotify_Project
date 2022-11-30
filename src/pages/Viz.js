
import '../App.css';
//import ProfilePage from './pages/Profile.js';

// React
import { Fragment, useRef, useState, useEffect } from 'react'
import { Stack, Box, Typography, Grid, createTheme } from '@mui/material';
import API from "../API_Interface/API_Interface.js";
import "animate.css/animate.min.css";
import ScrollToTop from 'react-scroll-to-top';
import Sidebar from '../components/Sidebar/SideBar.js';

import TopBarMenu from '../components/TopBarMenu';

import SummaryHeader from '../components/SummaryHeader/SummaryHeader';

import TripThroughTime from '../visualizationModules/Time/TripThroughTime';

import SongsByLength from '../visualizationModules/Length/SongsByLength';

import SongsByPopularity from '../visualizationModules/Popularity/SongsByPopularity';

import SongsByGenre from '../visualizationModules/Genre/SongsByGenre';

import EnergyVsValence from '../visualizationModules/EnergyVsValence/EnergyVsValence';

import AllSongs from '../visualizationModules/AllSongs.js';
import SongSelector from '../components/SongSelector/SongSelector';

import UsersAndSubs from '../visualizationModules/User/UsersAndSubs';
import UsersVsComp from '../visualizationModules/User/UsersVsComp';

import PageEnd from '../visualizationModules/PageEnd.js';

const Viz = (props) => {

    const { playlist } = props;

    const [ songs, setSongs ] = useState(undefined);

    useEffect(() => {
        // Construct the songs object
        const api = new API();
        async function getPlaylistSongs() {
            api.getSongsFromPlaylist(playlist.id)
                .then( info => {
                    //console.log(`api returns info and it is: ${JSON.stringify(info)}`);
                    const corrected = info.songs.map(song => {
                        return {
                            ...song,
                            title : song.name,
                            releaseDate : new Date(song.release_date),
                            explicit : Boolean(song.explicit),
                            genres : [ 'todo' ]
                        }
                    })
                    console.log(corrected);
                    setSongs(corrected);
                });
        }

        getPlaylistSongs();
        // to do get the genres

    }, [ playlist ]);

    //const songs = { props };

    // These refs are used to populate the top navbar.
    const time = useRef(null);
    const popularity = useRef(null);
    const length = useRef(null);
    const genre = useRef(null);
    const energy = useRef(null);
    const allSongs = useRef(null);

    const topButtons = [
        { title : 'Decade', ref : time },
        { title : 'Popularity', ref : popularity },
        { title : 'Length', ref : length },
        { title : 'Genre', ref : genre },
        { title : 'Energy & Valence', ref : energy },
        { title : 'All Songs', ref : allSongs },
    ];

    const createPage = () => {
        if (songs === undefined) {
            return (
                <Typography variant='h3' align='center'>
                    {'Loading your music...'}
                </Typography>
            );
        } else {
            return (
                <Fragment>
                    <Sidebar/>
                    <Stack spacing={2}>
                        <TopBarMenu buttons={topButtons}/>
                        <SummaryHeader  playlist={playlist}
                                        songs={songs}/>
                        <hr/>

                        <Box ref={time}>
                            <TripThroughTime songs={songs}/>
                        </Box>

                        <hr/>

                        <Box ref={popularity}>
                            <SongsByPopularity songs={songs}/>
                        </Box>

                        <hr/>
                        
                        <Box ref={length}>
                            <SongsByLength songs={songs}/>
                        </Box>

                        <hr/>

                        <Box ref={genre}>
                            <SongsByGenre songs={songs}/>
                        </Box>

                        <hr/>

                        <Box ref={energy}>
                            <EnergyVsValence songs={songs}/>
                        </Box>

                        <hr/>

                        <Box ref={allSongs}>
                            <AllSongs songs={songs}/>
                        </Box>
                        <SongSelector songs={songs}/>

                        <hr/>

                        <Grid container columns={4}>
                            <Grid item xs={2}>
                                <Box>
                                    <UsersAndSubs/>
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <Box>
                                    <UsersVsComp/>
                                </Box>
                            </Grid>
                        </Grid>

                        <hr/>

                        <PageEnd/>

                        
                        <ScrollToTop smooth/>
                    </Stack>
                </Fragment>                
            )
        }
    }

    
    return (        
        <Fragment>
            {createPage()}
        </Fragment>
    );

}

export default Viz;