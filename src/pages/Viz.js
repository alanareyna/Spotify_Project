
import './App.css';
import ProfilePage from './pages/Profile.js';

// React
import { Fragment, useRef, useState } from 'react'
import { Stack, Box, Typography, Grid, createTheme } from '@mui/material';

import "animate.css/animate.min.css";
import ScrollToTop from 'react-scroll-to-top';
import Sidebar from './components/Sidebar/SideBar.js';

import TopBarMenu from './components/TopBarMenu';

import SummaryHeader from './components/SummaryHeader/SummaryHeader';

import TripThroughTime from './visualizationModules/Time/TripThroughTime';

import SongsByLength from './visualizationModules/Length/SongsByLength';

import SongsByPopularity from './visualizationModules/Popularity/SongsByPopularity';

import SongsByGenre from './visualizationModules/Genre/SongsByGenre';

import EnergyVsValence from './visualizationModules/EnergyVsValence/EnergyVsValence';

import AllSongs from './visualizationModules/AllSongs.js';
import SongSelector from './components/SongSelector/SongSelector';

import UsersAndSubs from './visualizationModules/User/UsersAndSubs';
import UsersVsComp from './visualizationModules/User/UsersVsComp';

import PageEnd from './visualizationModules/PageEnd.js';

const Viz = (props) => {

    const songs = { props };

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

    const [Playlist,SetPlaylist] = useState('');

    return (
        <Fragment>
            <Sidebar/>
            <Stack spacing={2}>
                <TopBarMenu buttons={topButtons}/>
                <SummaryHeader  playlistName={'My Playlist'}
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
    );

}

export default Viz;
