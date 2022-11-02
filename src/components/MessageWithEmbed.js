
import react, { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import SpotifyEmbed from './SpotifyEmbed';

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

    const elements = textSide === 'left' ? [ 'text', 'embed' ] : [ 'embed', 'text' ];

    return (
        <Grid contianer={"true"} columns={2} sx={{ display : 'flex', justifyContent : 'center'}}>

            {
                elements.map((element, index) => {
                    if (element == 'text') {
                        return (
                            <Grid item xs style={{width:"800px"}} key={index} md={10}>
                                <Typography variant='h5'
                                            align={textSide === 'left' ? 'right' : 'left'}
                                >
                                    {message}
                                </Typography>
                            </Grid>
                        );
                    } else {
                        return (
                            <Grid item key={index}  md={10}>
                                <SpotifyEmbed song={song} theme={0}/>
                            </Grid>
                        );
                    }
                })
            }



        </Grid>
    );
}

/*

*/

export default MessageWithEmbed;
