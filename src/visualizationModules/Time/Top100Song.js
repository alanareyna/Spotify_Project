
import { Grid, Typography } from '@mui/material';

import SpotifyEmbed from "../../components/SpotifyEmbed";

const top100Songs = {
    '1990' : {
        title : 'Scar Tissue',
        artist : 'Red Hot Chili Peppers',
        id : '1G391cbiT3v3Cywg8T7DM1',
        releaseDate : new Date('1999-06-08'),
        weeks : 16
    },
    '2000' : {
        title : 'I Gotta Feeling',
        artist : 'The Black Eyed Peas',
        id : '2H1047e0oMSj10dgp7p2VG',
        releaseDate : new Date('2009-01-01'),
        weeks : 14
    }
}

const Top100Song = (props) => {

    const { decade } = props;

    const getMessage = () => {
        const topSong = top100Songs[decade];
        return `The song which spent the most time in the #1 position on the Top 100 Billboard chart in the ${decade}s was ${topSong.title} by ${topSong.artist}, `
                + `released ${topSong.releaseDate.toLocaleString('en-US', {
                    year : 'numeric',
                    month : 'long',
                    day : 'numeric'
                })}. `
                + `It held the #1 spot for ${topSong.weeks} week${topSong.weeks === 1 ? '' : 's'}.`;
    }

    return (
        <Grid   container
                columns={1}
                display='flex'
                alignItems='center'
                justifyContent='center'>
            <Grid   item
                    xs={0}
                    display='flex'
                    justifyContent='center'>
                <Typography variant='h4'
                            align='center'>
                    {`Your most prevalent decade is the ${decade}s.`}
                </Typography>
            </Grid>
            <Grid   item
                    xs={0}
                    display='flex'
                    justifyContent='center'>
                <Typography variant='h6'
                            align='left'>
                    {getMessage()}
                </Typography>
            </Grid>

            <Grid   item
                    xs={1}>
                <SpotifyEmbed   song={top100Songs[decade]}
                                theme={1}/>            
            </Grid>
        </Grid>
    )

}

export default Top100Song;
