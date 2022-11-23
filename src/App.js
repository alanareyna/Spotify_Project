import './App.css';
import ProfilePage from './Profile.js';

// React
import react, { Fragment, useRef, useState } from 'react'
import { Typography, Grid, createTheme } from '@mui/material';

// Other important utilities
import { AnimationOnScroll } from 'react-animation-on-scroll';
import "animate.css/animate.min.css";
import ScrollToTop from 'react-scroll-to-top';

import ExplicitLanguage from './visualizationModules/ExplicitLanguage';
import TopBarMenu from './components/TopBarMenu';
import TripThroughTime from './visualizationModules/Time/TripThroughTime';
import SummaryHeader from './components/SummaryHeader/SummaryHeader';
import SongsByPopularity from './visualizationModules/Popularity/SongsByPopularity';
import TitleWithEmojis from './components/TitleWithEmoji';

import SongsByLength from './visualizationModules/Length/SongsByLength';

import AllSongs from './components/AllSongs';
import ScatterPlotByAttributes from './visualizationModules/ScatterPlotByAttributes';
import SongSelector from './components/SongSelector/SongSelector';
import EnergyVsValence from './visualizationModules/EnergyVsValence/EnergyVsValence';

import SongsByGenre from './visualizationModules/Genre/SongsByGenre';
import Sidebar from "./components/SideBar.js"
const songs = [
    {
        title : 'Blinding Lights',
        artist : 'The Weeknd',
        releaseDate : new Date('2020-03-20'),
        id : '0VjIjW4GlUZAMYd2vXMi3b',
        popularity : 90,
        explicit : false,
        danceability : 0.514,
        energy : 0.73,
        key : 1,
        loudness : -5.934,
        mode : 1,
        speechiness : 0.0598,
        acousticness : 0.00146,
        instrumentalness: 0.0000954,
        liveness : 0.0897,
        valence : 0.334,
        tempo : 171.005,
        duration_ms : 200040,
        time_signature : 4,
        genres : [ "canadian contemporary r&b", "canadian pop", "pop" ]
    },
    {
        title : 'Purple Haze',
        artist : 'Jimi Hendrix',
        releaseDate : new Date('1967-05-12'),
        id : '0wJoRiX5K5BxlqZTolB2LD',
        popularity : 71,
        explicit : false,
        danceability: 0.533,
        energy: 0.905,
        key: 2,
        loudness: -5.27,
        mode: 1,
        speechiness: 0.0754,
        acousticness: 0.00876,
        instrumentalness: 0.578,
        liveness: 0.0698,
        valence: 0.486,
        tempo: 108.9,
        duration_ms: 170813,
        time_signature: 4,
        genres : [
            "acid rock",
            "album rock",
            "blues rock",
            "classic rock",
            "hard rock",
            "proto-metal",
            "psychedelic rock",
            "rock"
        ]
    },
    {
        title : 'Hound Dog',
        artist : 'Elvis Presley',
        releaseDate : new Date('1958-03-21'),
        id : '64Ny7djQ6rNJspquof2KoX',
        popularity : 66,
        explicit : false,
        danceability: 0.494,
        energy: 0.756,
        key: 0,
        loudness: -8.492,
        mode: 1,
        speechiness: 0.0499,
        acousticness: 0.733,
        instrumentalness: 0.00505,
        liveness: 0.76,
        valence: 0.949,
        tempo: 86.895,
        duration_ms: 136027,
        time_signature: 4,
        genres : [
            "rock-and-roll",
            "rockabilly"
        ]
    },
    {
        title : 'Girl in the Fire',
        artist : 'Pendulum',
        releaseDate : new Date('2007-05-19'),
        id : '3RB7hfbKipi3rtGCT5IGqq',
        popularity : 39,
        explicit : false,
        danceability : 0.459,
        energy : 0.87,
        key : 10,
        loudness : -6.086,
        mode : 0,
        speechiness : 0.0389,
        acousticness : 0.00022,
        instrumentalness : 0.792,
        liveness : 0.16,
        valence : 0.716,
        tempo : 174.043,
        duration_ms : 293520,
        time_signature : 4,
        genres : [
            "australian dance",
            "dancefloor dnb",
            "drum and bass"
        ]
    },
    {
        title : 'library of the universe',
        artist : 'cosmic collective',
        releaseDate : new Date('2021-11-19'),
        id : '1CxvQ7PBZAa6TRgTTsSyhl',
        popularity : 48,
        explicit : false,
        danceability : 0.723,
        energy : 0.801,
        key : 4,
        loudness : -8.253,
        mode : 1,
        speechiness : 0.113,
        acousticness : 0.0978,
        instrumentalness : 0.827,
        liveness : 0.386,
        valence : 0.918,
        tempo : 87.95,
        duration_ms : 62216,
        time_signature : 4,
        genres : [ ]
    },
    {
        title : 'November',
        artist : 'Tyler, The Creator',
        releaseDate : new Date('2017-07-21'),
        id : '4XDpeWqPADoWRKcUY3dC84',
        popularity : 63,
        explicit : true,
        danceability : 0.547,
        energy : 0.759,
        key : 1,
        loudness : -7.039,
        mode : 0,
        speechiness : 0.413,
        acousticness : 0.354,
        instrumentalness : 0.0000215,
        liveness : 0.676,
        valence : 0.575,
        tempo : 91.85,
        duration_ms : 225347,
        time_signature : 4,
        genres : [
            "hip hop",
            "rap"
        ]
    },
    {
        title : 'Learn to Fly',
        artist : 'Foo Fighters',
        releaseDate : new Date('1999-11-02'),
        id : '5OQsiBsky2k2kDKy2bX2eT',
        popularity : 77,
        explicit : false,
        "danceability": 0.465,
        "energy": 0.919,
        "key": 4,
        "loudness": -4.025,
        "mode": 1,
        "speechiness": 0.0408,
        "acousticness": 0.0000183,
        "instrumentalness": 0.0000207,
        "liveness": 0.262,
        "valence": 0.537,
        "tempo": 135.997,
        "duration_ms": 235293,
        "time_signature": 4,
        genres : [
            "alternative metal",
            "alternative rock",
            "modern rock",
            "permanent wave",
            "post-grunge",
            "rock"
        ]
    },
    {
        title : 'Bitter Sweet Symphony',
        artist : 'The Verve',
        releaseDate : new Date('1997-09-29'),
        id : '57iDDD9N9tTWe75x6qhStw',
        popularity : 79,
        explicit : false,
        "danceability": 0.356,
        "energy": 0.917,
        "key": 9,
        "loudness": -6.006,
        "mode": 1,
        "speechiness": 0.0479,
        "acousticness": 0.0335,
        "instrumentalness": 0,
        "liveness": 0.406,
        "valence": 0.518,
        "tempo": 171.176,
        "duration_ms": 357267,
        "time_signature": 4,
        genres : [
            "alternative rock",
            "britpop",
            "permanent wave",
            "pop rock",
            "rock",
            "shoegaze"
          ]
    },
    {
        title : 'Gooey',
        artist : 'Glass Animals',
        releaseDate : new Date('2014-06-03'),
        id : '1gk3FhAV07q9Jg77UxnVjX',
        popularity : 70,
        explicit : false,
        "danceability": 0.487,
        "energy": 0.369,
        "key": 11,
        "loudness": -13.424,
        "mode": 0,
        "speechiness": 0.0406,
        "acousticness": 0.736,
        "instrumentalness": 0.0000375,
        "liveness": 0.0925,
        "valence": 0.106,
        "tempo": 183.114,
        "duration_ms": 289307,
        "time_signature": 4,
        genres : [
            "gauze pop",
            "indietronica",
            "shiver pop"
        ]        
    },
    {
        title : 'You Oughta Know',
        artist : 'Alanis Morissette',
        releaseDate : new Date('1995-06-09'),
        id : '0Dw9z44gXhplDh5HCWZIxP',
        popularity : 56,
        explicit : true,
        "danceability": 0.66,
        "energy": 0.831,
        "key": 4,
        "loudness": -8.195,
        "mode": 1,
        "speechiness": 0.0557,
        "acousticness": 0.204,
        "instrumentalness": 0,
        "liveness": 0.736,
        "valence": 0.43,
        "tempo": 105.32,
        "duration_ms": 249200,
        "time_signature": 4,
        genres : [
            "canadian pop",
            "canadian singer-songwriter",
            "pop rock",
            "singer-songwriter"
        ]
    },
    {
        title : 'No Rain',
        artist : 'Blind Melon',
        releaseDate : new Date('1992-01-01'),
        id : '6txWz9UapYHVxEd7dDIHXT',
        popularity : 75,
        explicit : false,
        "danceability": 0.389,
        "energy": 0.476,
        "key": 9,
        "loudness": -9.342,
        "mode": 1,
        "speechiness": 0.0316,
        "acousticness": 0.619,
        "instrumentalness": 0.0000509,
        "liveness": 0.255,
        "valence": 0.566,
        "tempo": 148.117,
        "duration_ms": 217107,
        "time_signature": 4,
        genres : [
            "alternative metal",
            "alternative rock",
            "blues rock",
            "grunge",
            "pop rock",
            "rock"
        ]
    },
    {
        title : 'Here It Goes Again',
        artist : 'OK Go',
        releaseDate : new Date('2005-01-01'),
        id : '1pHP4JeQV9wDx87D6qH9hD',
        popularity : 68,
        explicit : false,
        "danceability": 0.537,
        "energy": 0.882,
        "key": 0,
        "loudness": -2.306,
        "mode": 1,
        "speechiness": 0.0403,
        "acousticness": 0.000342,
        "instrumentalness": 0.0000906,
        "liveness": 0.12,
        "valence": 0.81,
        "tempo": 145.729,
        "duration_ms": 179813,
        "time_signature": 4,
        genres : [
            "alternative rock",
            "chicago indie",
            "indie rock",
            "modern alternative rock",
            "modern rock",
            "permanent wave",
            "pop rock",
            "rock"
        ]
    },
    {
        title : 'Semi-Charmed Life',
        artist : 'Third Eye Blind',
        releaseDate : new Date('1997-04-08'),
        id : '42et6fnHCw1HIPSrdPprMl',
        popularity : 74,
        explicit : false,
        "danceability": 0.64,
        "energy": 0.864,
        "key": 7,
        "loudness": -6.576,
        "mode": 1,
        "speechiness": 0.0314,
        "acousticness": 0.00832,
        "instrumentalness": 0,
        "liveness": 0.123,
        "valence": 0.701,
        "tempo": 102.026,
        "duration_ms": 268360,
        "time_signature": 4,
        genres : [
            "alternative rock",
            "neo mellow",
            "pop rock",
            "post-grunge",
            "rock"
        ]
    },
    {
        title : 'Hallelujah',
        artist : 'Jeff Buckley',
        releaseDate : new Date('1994-08-23'),
        id : '3pRaLNL3b8x5uBOcsgvdqM',
        popularity : 70,
        explicit : false,
        "danceability": 0.324,
        "energy": 0.136,
        "key": 0,
        "loudness": -10.33,
        "mode": 1,
        "speechiness": 0.0318,
        "acousticness": 0.931,
        "instrumentalness": 0.00117,
        "liveness": 0.176,
        "valence": 0.0831,
        "tempo": 97.256,
        "duration_ms": 413827,
        "time_signature": 3,
        genres : [
            "art rock",
            "melancholia",
            "permanent wave",
            "rock",
            "singer-songwriter"
        ]
    }, 
    {
        title : 'Take on Me',
        artist : 'a-ha',
        releaseDate : new Date('1985-06-01'),
        id : '2WfaOiMkCvy7F5fcp2zZ8L',
        popularity : 85,
        explicit : false,
        "danceability": 0.573,
        "energy": 0.902,
        "key": 6,
        "loudness": -7.638,
        "mode": 0,
        "speechiness": 0.054,
        "acousticness": 0.018,
        "instrumentalness": 0.00125,
        "liveness": 0.0928,
        "valence": 0.876,
        "tempo": 84.412,
        "duration_ms": 225280,
        "time_signature": 4,
        genres : [
            "new romantic",
            "new wave",
            "new wave pop",
            "permanent wave",
            "soft rock",
            "synthpop"
        ]
    },
    {
        title : 'Tek It',
        artist : 'Cafuné',
        releaseDate : new Date('2021-07-20'),
        id : '751srcHf5tUqcEa9pRCQwP',
        popularity : 79,
        explicit : false,
        "danceability": 0.423,
        "energy": 0.913,
        "key": 8,
        "loudness": -5.354,
        "mode": 1,
        "speechiness": 0.0655,
        "acousticness": 0.0000653,
        "instrumentalness": 0,
        "liveness": 0.269,
        "valence": 0.596,
        "tempo": 146.995,
        "duration_ms": 191823,
        "time_signature": 4,
        genres : [
            "brooklyn indie"
        ]
    }
];

const comparableVals = [
    {
        key : 'popularity',
        sf : 1
    },
    {
        key : 'danceability',
        sf : 100
    },
    {
        key : 'energy',
        sf : 100
    },
    {
        key : 'valence',
        sf : 100
    },
    {
        key : 'tempo',
        sf : 1
    }
]

const font = "'Monserrat'"

const theme = createTheme({
    typography : {
        fontFamily : font
    }
})

function App() {

    const time = useRef(null);
    const popularity = useRef(null);
    const length = useRef(null);
    const genre = useRef(null);
    const allSongs = useRef(null);
    const scatter = useRef(null);

    const topButtons = [
        { title : 'Decade', ref : time },
        { title : 'Popularity', ref : popularity },
        { title : 'Length', ref : length },
        { title : 'Genre', ref : genre },
        { title : 'All Songs', ref : allSongs },
        { title : 'Scatterplots', ref : scatter}
    ];
    const [Playlist,SetPlaylist] = useState('');
    return (
        <Fragment>
            { Playlist != '' ? <Fragment>
                <Sidebar/>
            {/* Top header components */}
            <Grid contianer columns={1}>
                <Grid item xs={1} key={0}>
                    <TopBarMenu buttons={topButtons}/>
                </Grid>
            </Grid>

            <hr/>

            <Grid container columns={1}>
                <Grid item xs={1} key={0}>
                    <SummaryHeader  playlistName={'My Playlist'}
                                    songs={songs}/>
                </Grid>
            </Grid>

            <hr/>

            <Grid container columns={1} ref={time}>
                <Grid item xs={1} key={0}>
                    <TripThroughTime songs={songs}/>
                </Grid>
            </Grid>

            <hr/>

            <Grid container columns={1}>
                <Grid   item xs={1} key={0} ref={popularity}>
                    <SongsByPopularity songs={songs}/>
                </Grid>
            </Grid>

            <hr/>

            <Grid container columns={1}>
                <Grid item xs={1} key={0} ref={length}>
                    <SongsByLength songs={songs}/>
                </Grid>
            </Grid>

            <hr/>

            <Grid container columns={1}>
                <Grid item xs={1} ref={genre}>
                    <SongsByGenre songs={songs}/>
                </Grid>
            </Grid>

            <hr/>

            <Grid contianer columns={1}>
                <Grid item xs={1}>
                    <EnergyVsValence songs={songs}/>
                </Grid>
            </Grid>

            <hr/>

            <Grid item xs={1} key={12312} ref={allSongs}>
                <AllSongs songs={songs}/>
            </Grid>

            <Grid contianer columns={1}>
                <Grid item xs={1}>
                    <SongSelector songs={songs}/>
                </Grid>
            </Grid>

            <hr/>

            <Grid item xs={1} key={12312}>
                <TitleWithEmojis msg='Work(s) In Progress'/>
            </Grid>

            <Grid item xs={1} key={900}>
                <ExplicitLanguage songs={songs}/>
            </Grid>

            <Grid container columns={2} ref={scatter}>
            {
                comparableVals.map((val, idxx) => {
                    const x = val;
                    return comparableVals.map((val, idxy) => {
                        const y = val;

                        // Don't create the chart
                        if (x === y) {
                            return (<Fragment></Fragment>)
                        }

                        return (
                            <Grid item xs={1} mb={1}>
                                <ScatterPlotByAttributes    songs={songs}
                                                            xAxis={x.key}
                                                            yAxis={y.key}
                                                            scaleFactor={{
                                                                x : x.sf,
                                                                y : y.sf
                                                            }}/>
                            </Grid>
                        )

                    });
                })
            }

            </Grid>



            <ScrollToTop smooth />)
            </Fragment>  : <Fragment ><Sidebar /><ProfilePage/></Fragment> }
        </Fragment>
    );
}

export default App;
