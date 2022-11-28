
import react, { useState } from 'react';

import { Grid } from '@mui/material';

import BarChart from '../../d3/components/BarChart/BarChart.js'

const BarChartByLength = (props) => {

    const { songs, shortest, longest } = props;

    const generateChartData = () => {

        const roundLength = (length) => Math.floor(length / 30000) * 30000;

        const msToMins = (ms) => {
            const minutes = Math.floor((ms / 1000 / 60) % 60);
            const seconds = Math.floor((ms / 1000) % 60);
        
            return `${minutes}:${seconds.toString().padStart(2, "0")}`;
        }

        const data = [ { key : 'Song Counts by Length', values : [ ] } ];

        // Find the oldest and newest valid decade
        const shortestLen = roundLength(shortest.duration_ms);
        const longestLen = roundLength(longest.duration_ms);

        // Gather the corresponding counts of the decades
        const buckets = { };
        for (let i = 0; i <= longestLen; i+= 30000) {
            buckets[i.toString()] = 0;
        }

        for (let song of songs) {
            let len = roundLength(song.duration_ms);
            buckets[len]++;
        }
        
        for (const duration of Object.keys(buckets)) {  
            let m = msToMins(parseInt(duration));
            
            data[0]['values'].push({
                x : m, 
                y : buckets[duration]
            });
        }
        
        return data; 
    }

    const [ chartData, setChartData ] = useState(generateChartData());

    return (
        <Grid   container
                columns={1}>
            <Grid   item
                    xs={1}
                    key={0}>
                <BarChart   data={chartData}
                            animate={false}
                            delay={25}
                            height={350}
                            axisConfig={{
                                showXAxis : true,
                                showYAxis : true,
                                xLabel : 'Song Length',
                                yLabel : '# of Songs'
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

export default BarChartByLength;
