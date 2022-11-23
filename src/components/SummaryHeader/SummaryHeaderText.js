

import react, { useState } from 'react';

import { Grid, Typography } from '@mui/material';

const config = {
    columns : 1
};

const SummaryHeaderText = (props) => {

    const { playlistName, songs } = props;

    return (
        <Grid   container
                columns={config.columns}>
            <Grid   item
                    xs={config.columns} key={0}>
                <Typography variant='h1'
                            align='center'>
                    {playlistName}
                </Typography>
            </Grid>

            <Grid   item
                    xs={config.columns} key={1}>
                <Typography variant='h3'
                            align='center'>
                    {'Created by JHend'}
                </Typography>
            </Grid>

            <Grid   item
                    xs={config.columns} key={2}>
                <Typography variant='h3'
                            align='center'>
                    {`${songs.length} song${songs.length === 1 ? '' : 's'}`}
                </Typography>
            </Grid>

        </Grid>        
    )

}

export default SummaryHeaderText;
