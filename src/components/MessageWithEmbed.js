
import react, { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import SpotifyEmbed from './SpotifyEmbed';

const config = {
    columns : 7
}

const MessageWithEmbed = (props) => {

    const { song } = props;
    const leadingMsg = props.leadingMsg ?? '';
    const { releaseDate, title, artist } = song;
    const textSide = props.textSide ?? 'left';
    const message = props.message ?? `${leadingMsg} ${title} By ${artist}, released ${releaseDate.toLocaleString('en-US', {
        year : 'numeric',
        month : 'long',
        day : 'numeric'
    })}.`

    const elements = textSide === 'left' ? [ 'text', ' ', 'embed' ] : [ 'embed', ' ', 'text' ];

    return (
        <Grid contianer={"true"} columns={config.columns} sx={{ display : 'flex', justifyContent : 'center', m : 0.8}}>

            {
                elements.map((element, index) => {
                    if (element === 'text') {
                        return (
                            <Grid item xs={config.columns-1} style={{width:"800px"}} key={index} md={10} sx={{ m : 0.8}}>
                                <Typography variant='h5'
                                            align={textSide === 'left' ? 'right' : 'left'}
                                            >
                                    {message}
                                </Typography>
                            </Grid>
                        );
                    } else if (element === 'embed') {
                        return (
                            <Grid item xs={config.columns-1} key={index} md={10} sx={{ m : 0.8 }}>
                                <SpotifyEmbed song={song} theme={0}/>
                            </Grid>
                        );
                    } else if (element === ' ') {
                        <Grid item xs={1}></Grid>
                    }
                })
            }



        </Grid>
    );
}

/*

*/

export default MessageWithEmbed;
