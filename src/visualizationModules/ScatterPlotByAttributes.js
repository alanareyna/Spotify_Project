import ScatterChart from "../d3/components/ScatterChart/ScatterChart";

import react, { useState } from 'react';

import { Grid } from '@mui/material';

const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const ScatterPlotByAttributes = (props) => {

    const { songs, xAxis, yAxis } = props;
    const scaleFactor = props.scaleFactor ?? {
        x : 1,
        y : 1
    };

    const getScatterData = () => {
        const data = [
            {
                key : '',
                values : [ ]
            }
        ];

        for (let song of songs) {
            data[0]['values'].push({
                x : song[xAxis]*scaleFactor.x,
                y : song[yAxis]*scaleFactor.y
            })
        }

        return data;
    }

    const [ scatterData, setScatterData ] = useState(getScatterData());

    return (
        <Grid container columns={1}>
            <Grid item xs={1}>
                <ScatterChart   data={scatterData}
                                height={350}
                                pointSize={4}
                                axisConfig={{
                                    showXAxis : true,
                                    showYAxis : true,
                                    xLabel : capitalizeFirst(xAxis),
                                    yLabel : capitalizeFirst(yAxis)
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

export default ScatterPlotByAttributes;
