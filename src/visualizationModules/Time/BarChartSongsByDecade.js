
import react, { useState } from 'react';

import BarChart from '../../d3/components/BarChart/BarChart';

const BarChartSongsByDecade = (props) => {

    const { songs } = props;

    const getOldestSong = () => {
        return songs.sort((el1, el2) => {
            return el1.releaseDate.getFullYear()- el2.releaseDate.getFullYear();
        }).at(0);        
    } 

    const getNewestSong = () => {
        return songs.sort((el1, el2) => {
            return el1.releaseDate.getFullYear() - el2.releaseDate.getFullYear();
        }).at(-1);
    }

    const roundYearToDecade = (year) => Math.floor(year / 10) * 10;

    const constructBarData = () => {
        const data = [
            {
                key : 'Song Counts',
                values : [ ] 
            }
        ];

        const oldestDecade = roundYearToDecade(getOldestSong().releaseDate.getFullYear());
        const newestDecade = roundYearToDecade(getNewestSong().releaseDate.getFullYear());     

        const buckets = { };

        for (let i = oldestDecade; i <= newestDecade; i+= 10) {
            buckets[i.toString()] = 0;
        }
        
        for (let song of songs) {
            let year = roundYearToDecade(song.releaseDate.getFullYear());
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

export default BarChartSongsByDecade;
