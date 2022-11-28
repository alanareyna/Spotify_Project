
import react, { useState } from 'react';

import PieChart from '../../d3/components/PieChart/PieChart.js'

const PieChartByGenreWithOther = (props) => {

    const { songs } = props;

    const generatePieChartData = () => {

        const data = [ ];
        const buckets = { };

        // For each song, add it's genre tag info the the overall counts
        for (let song of songs) {
            song.genres.forEach(genre => {
                if (buckets[genre] === undefined) {
                    buckets[genre] = 1;
                } else {
                    buckets[genre]++;
                }
            });

        }

        const correctedBuckets = { };
        for (let genre of Object.keys(buckets)) {
            if (buckets[genre] <= 2) {
                if (correctedBuckets['Other'] === undefined) {
                    correctedBuckets['Other'] = buckets[genre];
                } else {
                    correctedBuckets['Other'] += buckets[genre];
                }
            } else {
                correctedBuckets[genre] = buckets[genre];
            }
        }

        for (let genre of Object.keys(correctedBuckets)) {

            let value = correctedBuckets[genre];

            data.push({
                label : genre,
                value : correctedBuckets[genre]
            });
        }

        return data;

    }

    const [ pieChartData, setPieChartData ] = useState(generatePieChartData());

    return (
        <PieChart   data={pieChartData}
                    height={256 + 256/2}
                    width={256 + 256/2}
                    labelOffset={128 + 32 + 16}
                    valueFormatter={value => value}/>
    )

}

export default PieChartByGenreWithOther;
