
import react, { useState, useEffect}  from 'react';

import { Grid, FormControl,InputLabel, Select, MenuItem, Input } from '@mui/material';

const SongInspector = (props) => {

    const { songs } = props;
    
    const [ currentSong, setCurrentSong ] = useState(songs.at(0));

    return (
        <Grid container columns={1}>
            <Grid item xs={1} key={123}>
                <FormControl fullwidth>
                    <InputLabel id='label'>{'Song'}</InputLabel>
                    <Select labelId='label'
                            id='select'
                            value={currentSong.year}
                            label='Song'>
                    {
                        songs.map((song, index) => {
                            return (
                                <MenuItem value={index}>
                                    {song.title}
                                </MenuItem>
                            )
                        })
                    }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )

}

export default SongInspector;
