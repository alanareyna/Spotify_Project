
import ScatterChart from '../d3/components/ScatterChart/ScatterChart'

import react, { useState } from 'react';

import { Grid } from '@mui/material';

const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const TempoVsEnergy = (props) => {

    
    const { songs } = props;

    const getScatterData = (xProp, yProp) => {
        const data = [
            {
                key : '',
                values : [ ]
            }
        ];

        for (let song of songs) {
            data[0]['values'].push({
                x : song[xProp]*100,
                y : song[yProp]*100
            })
        }

        return data;
    }

    const [ scatterData, setScatterData ] = useState(getScatterData('energy', 'valence'));

    return (
        <Grid container columns={2}>
            <Grid item xs={1}>
                <ScatterChart   data={scatterData}
                                height={350}
                                pointSize={4}
                                axisConfig={{
                                    showXAxis : true,
                                    showYAxis : true,
                                    xLabel : 'Energy',
                                    yLabel : 'Valence'
                                }}
                                marign={{
                                    top : 25,
                                    bottom : 30,
                                    left : 75,
                                    right : 75
                                }}
                                colorScale={{
                                    from : '#1db954',
                                    to : '#1ed760'
                                }}/>
            </Grid>
        </Grid>
    )

}

export default TempoVsEnergy;
