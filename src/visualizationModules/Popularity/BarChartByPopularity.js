
import react, { useState } from 'react';

import BarChart from '../../d3/components/BarChart/BarChart';

const roundToNearest10 = (value) => {
    return Math.floor(value / 10) * 10;
}

const BarChartByPopularity = (props) => {

    const [ bucketSize, setBucketSize ] = useState(10);

    const { songs } = props;

    const [ barData, setBarData ] = useState(() => {
        const data = [
            {
                key : 'Song Counts',
                values : [ ]
            }
        ];

        const buckets = { };
        for (let i = 0; i < 100; i+= 10) {
            buckets[i.toString()] = 0;
        }

        for (let song of songs) {
            let popularity = roundToNearest10(song.popularity);
            buckets[popularity.toString()]++;
        }

        for (let popularity of Object.keys(buckets)) {
            data[0]['values'].push({ x : `${popularity}-${parseInt(popularity, 10) + 9}`, y : buckets[popularity]} );
        }

        return data;

    }) 

    return (
        <BarChart
            data={barData}
            animate={false}
            delay={25}
            height={350}
            axisConfig={{
                showXAxis : true,
                showYAxis : true,
                xLabel : 'Popularity',
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
    )

}

export default BarChartByPopularity;
