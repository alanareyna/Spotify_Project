
import react, { useState } from 'react';

import { Grid, Typography, Paper } from '@mui/material';

import SpotifyAlbumEmbed from '../SpotifyAlbumEmbed';
import SummaryHeaderText from './SummaryHeaderText';

const config = {
    columns : 2
}

const SummaryHeader = (props) => {

    const { playlist, songs } = props;

    return (
        <Grid   container
                columns={config.columns}
                sx={{
                    display : 'flex', 
                    justifyContent : 'center',
                    m : 0.8
                }}>
            <Grid   item
                    xs={1}
                    key={0}>
                <Paper elevation={2}>
                    <SummaryHeaderText playlistName={playlist.name} songs={songs}/>
                </Paper>
            </Grid>

            <Grid   item
                    xs={1}
                    key={3}>
                <SpotifyAlbumEmbed playlist={{
                    id : playlist.id
                }} theme={1}/>
            </Grid>

        </Grid>
    )

}

export default SummaryHeader;
