
import react, { useState } from 'react';

import BarChart from "../../d3/components/BarChart/BarChart";

const BarChartSongsByHighestDecade = (props) => {

    const { songs } = props;
    const decade = parseInt(props.decade, 10);

    const constructBarData = () => {
        const data = [
            {
                key : 'Song Counts',
                values : [ ]
            }
        ];

        const buckets = { };

        for (let i = decade; i <= decade + 9; i++) {
            buckets[i.toString()] = 0;
        }

        for (let song of songs) {
            let year = song.releaseDate.getFullYear();

            if (year < decade || year > decade + 9) {
                continue;
            }

            buckets[year]++;
        }

        for (const year of Object.keys(buckets)) {
            data[0]['values'].push({
                x : year,
                y : buckets[year]
            });
        }

        return data;
    }

    const [ barData, setBarData ] = useState(constructBarData());

    return (
        <BarChart   data={barData}
                    animate={true}
                    delay={25}
                    height={350}
                    axisConfig={{
                        showXAxis : true,
                        showYAxis : true,
                        xLabel : 'Year',
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

export default BarChartSongsByHighestDecade;
