import { Button, Grid, Typography } from "@mui/material";

import SpotifyEmbed from '../../components/SpotifyEmbed';

import react, { Fragment, useState, useReducer } from 'react';

import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const config = {
    decadeSongs : {
        '1990' : [ ]
    }
};

const irandomRange = (min, max) => { 
    return Math.floor(Math.random() * (max - min) + min);
} 

const PopularityQuizOption = (props) => {

    const { selectedSong, otherSong, gameState, setGameState, playStats, setPlayStats } = props;

    return (
        <Grid   container
                columns={1}
                sx={{
                    display : 'flex',
                    justifyContent : 'center'
                }}>

            <Grid   item
                    xs={1}
                    key={0}
                    md={10}
                    sx={{ m : 0.8 }}>
                <SpotifyEmbed song={selectedSong} theme={1}/>
            </Grid>

            <Grid   item
                    xs={1}
                    key={1}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'>
            {
                [ gameState ].map((value) => {
                    if (gameState !== 'play') {
                        return (
                            <Typography variant='h5' key={0}>
                                {`Popularity: ${selectedSong.popularity}`}
                            </Typography>
                        )
                    } else {
                        return (
                            <Button     variant='contained'
                                        disabled={gameState !== 'play'}
                                        key={1}
                                        onClick={() => {
                                            if (selectedSong.popularity === otherSong.popularity) {
                                                setGameState('tie');
                                                setPlayStats({
                                                    plays : playStats.plays + 1,
                                                    wins : playStats.wins + 1
                                                })
                                            } else if (selectedSong.popularity > otherSong.popularity) {
                                                setGameState('win');
                                                setPlayStats({
                                                    plays : playStats.plays + 1,
                                                    wins : playStats.wins + 1
                                                })
                                            } else {
                                                setGameState('lose');
                                                setPlayStats({
                                                    plays : playStats.plays + 1,
                                                    wins : playStats.wins
                                                })
                                            }
                                        }}>
                            {'This one!'}
                        </Button>)
                    }
                })
            }

            </Grid>

        </Grid>
    )

}

const PopularityQuiz = (props) => {

    const [ state, dispatch ] = useReducer(0);

    const { songs } = props;

    const getLeastPopularSong = () => songs.sort((el1, el2) => el1.popularity - el2.popularity)[0];
    const getMostPopularSong = () => songs.sort((el1, el2) => el1.popularity - el2.popularity).at(-1);

    const [ gameState, setGameState ] = useState('play');

    const [ playStats, setPlayStats ] = useState({
        plays : 0,
        wins : 0
    });

    const generateSelectedSongs = () => {
        let arr = [];

        const sortedSongs = songs.sort((el1, el2) => el1.popularity - el2.popularity);

        let firstSong = irandomRange(1, sortedSongs.length - 2);
        arr.push(firstSong)

        let secondSong = irandomRange(1, sortedSongs.length - 2);
        while (secondSong === arr[0]) {
            secondSong = irandomRange(1, sortedSongs.length - 2);
        }
        arr.push(secondSong);

        return arr.map((song) => {
            return sortedSongs[song];
        });
    }

    const [ selectedSongs, setselectedSongs ] = useState(generateSelectedSongs());

    return (
        <Grid   container
                columns={2}
                display='flex'
                justifyContent='center'
                >

            <Grid item xs={2} key={0}>
                <Typography
                    variant='h3'
                    align='center'>
                    {'Quiz Time! 🤔'}
                </Typography>
            </Grid>

            <Grid item xs={2} key={11}>
                <Typography
                    variant='h4'
                    align='center'>
                    {'Which song do you think is more popular?'}
                </Typography>
            </Grid>

            <Grid item xs={1} key={22}>
                <AnimationOnScroll animateIn='animate__fadeInLeftBig'>
                    <PopularityQuizOption   selectedSong={selectedSongs[0]}
                                            otherSong={selectedSongs[1]}
                                            gameState={gameState}
                                            setGameState={setGameState}
                                            playStats={playStats}
                                            setPlayStats={setPlayStats}/>
                </AnimationOnScroll>
            </Grid>
            <Grid item xs={1} key={33}>
                <AnimationOnScroll animateIn='animate__fadeInRightBig'>
                    <PopularityQuizOption   selectedSong={selectedSongs[1]}
                                            otherSong={selectedSongs[0]}
                                            gameState={gameState}
                                            setGameState={setGameState}
                                            playStats={playStats}
                                            setPlayStats={setPlayStats}/>
                </AnimationOnScroll>
            </Grid>
            <Grid item xs={2} m={0.8} key={44}>
            {
                [ gameState ].map((state) => {
                    switch (state) {
                        case 'play':
                            return (
                                <Typography variant='h5' align='center'>
                                    {'Select the song which you think is the most popular. Try giving them a listen first.'}
                                </Typography>
                            );
                        case 'win':
                            return (
                                <Typography variant='h5' align='center' color='green'>
                                    {"You're right!"}
                                </Typography>                                    
                            );
                        case 'lose':
                            return (
                                <Typography variant='h5' align='center' color='red'>
                                    {"Sorry, that's incorrect!"}
                                </Typography>                                    
                            );  
                        case 'tie':
                            return (
                                <Typography variant='h5' align='center' color='green'>
                                    {"Trick question! Both songs are equally popular! You were always destined to win 🙂"}
                                </Typography>                                        
                            )
                        default:
                            break;                                 
                    }
                    return (<Fragment></Fragment>)
                })
            }

            </Grid>
            <Grid item xs={2} m={0.8} display='flex'
                    alignItems='center'
                    justifyContent='center'
                    key={55}>
                {
                    [ playStats.plays ].map((wins) => {
                        if (playStats.plays !== 0) {
                            return (
                                <Typography>{`${playStats.wins}/${playStats.plays} - ${Math.round(100*(playStats.wins/playStats.plays))}% win rate`}</Typography>
                            )
                        } else {
                            return (
                                <Typography>{''}</Typography>
                            )
                        }
                    })
                }
                
            </Grid>
            <Grid item xs={2} m={0.8} display='flex'
                    alignItems='center'
                    justifyContent='center'
                    key={66}>
            {
                [ gameState ].map((state) => {
                    if (gameState !== 'play') {
                        return (
                            <Button variant='contained'
                                    onClick={() => {
                                        setselectedSongs(generateSelectedSongs());
                                        setGameState('play');
                                    }}>
                                {'Play again?'}
                            </Button>
                        )
                    } else {
                        return (<Fragment></Fragment>)
                    }
                })
            }
            </Grid>
        </Grid>
    )

}

export default PopularityQuiz;
