
import react, { Fragment, useState } from 'react';

import { Grid, Stack, Typography } from '@mui/material'

import PieChartByGenreWithOther from './PieChartByGenreWithOther.js';
import WhySoManyOther from './WhySoManyOther.js';
import MessageWithEmbed from '../../components/MessageWithEmbed.js';
import TitleWithEmojis from '../../components/TitleWithEmoji.js';

const config = {
    desc : `One of Spotify's biggest strengths is the level of specificity at which it stores data about its tracks. ` + 
            `However, this level of granularity leads to incredibly specific genre tags, many of which only apply to a single song. ` + 
            `These 'single genres' are often very obscure. ` + 
            `In fact, more obscure artists are not even analyzed for genre and so Spotify may not associate an artist's tracks with a genre until they become sufficiently popular enough. ` +
            `There does not seem to be a correlation between popularity and more genre tags, but there does appear to be a correlation between popularity and the accuracy of the selected genre tags.`
};

const MysteryGenreSong = (props) => {

    const { songs } = props;

    const getGenrelessSong = () => {
        const genrelessSongs = songs.filter((song) => {
            return song.genres.length === 0;
        });

        return genrelessSongs.length === 0 ? undefined : genrelessSongs.at(0);
    }

    const [ song, setSong ] = useState(getGenrelessSong());

    return (
        <Stack spacing={1}>
        {
            [ song ].map(v => {
                if (v === undefined) {
                    return (<Fragment></Fragment>)
                } else {
                    return <MessageWithEmbed song={song}
                    message={`Spotify has 0 genre tags associated with ${song.title} by ${song.artist}. Looks like it's up to you to determine what exactly this is!`}
                    />
                }
            })
        }

        </Stack>
    )

}

const MostGenreSong = (props) => {

    const { songs } = props;

    const getMostGenreSong = () => {
        return songs.sort((el1, el2) => {
            return el1.genres.length - el2.genres.length;
        }).at(-1);
    }

    const [ song, setSong ] = useState(getMostGenreSong());

    return (
        <Stack spacing={1}>
            <MessageWithEmbed   song={song}
                                message={`Spotify has ${song.genres.length} genre tags associated with ${song.title} by ${song.artist}! Here they are: ${song.genres.join(', ')}.`}
                                textSide='right'/>
        </Stack>
    )

}

const SongsByGenre = (props) => {

    const { songs } = props;

    const getSingleGenres = () => {
        const buckets = { };

        for (let song of songs) {
            
            for (let genre of song.genres) {
                if (buckets[genre] === undefined) {
                    buckets[genre] = 1
                } else {
                    buckets[genre]++;
                }
            }
        }

        const singleGenres = [ ];
        for (let genre of Object.keys(buckets)) {
            if (buckets[genre] === 1) {
                singleGenres.push(genre);
            }

            if (singleGenres.length === 16) {
                break;
            }
        }
        
        return singleGenres;
    }

    const [ singleGenres, setSingleGenres ] = useState(getSingleGenres());

    return (
        <Grid container columns={2}>
            <Grid item xs={2} key={0}>
                <TitleWithEmojis    emojis={[ '🎸', '📯', '🥁' ]}
                                    msg="Songs By Genre"/>
            </Grid>
            <Grid item xs={1} key={1}>
                <PieChartByGenreWithOther songs={songs}/>
            </Grid>
            <Grid item xs={1} key={2}>
                <Stack spacing={1}>
                    <Typography variant='h3' align='center'>
                        {`So... Why so many 'Other' tags? 🤔`}
                    </Typography>
                    <Typography>
                        {config.desc}
                    </Typography>
                    <Typography variant='h4' align='center'>
                        {`Here are some genre tags which appeared only once:`}
                    </Typography>
                    <Grid container columns={4}>
                    {
                        singleGenres.map(genre => {
                            return (
                                <Grid item xs={1}>
                                    <Typography align='center'>
                                        {`${genre}`}
                                    </Typography>
                                </Grid>
                            )
                        })
                    }
                    </Grid>
                </Stack>
            </Grid>
            <Grid item xs={2} key={3}>
                <MysteryGenreSong songs={songs}/>
            </Grid>
            <Grid item xs={2} key={4}>
                <MostGenreSong songs={songs}/>
            </Grid>
        </Grid>
    )

}

export default SongsByGenre;
