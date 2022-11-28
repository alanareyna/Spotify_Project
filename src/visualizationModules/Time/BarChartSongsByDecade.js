
import react, { useEffect, useState } from 'react';

import { Stack, Slider, Button, ButtonGroup } from '@mui/material';

import BarChart from '../../d3/components/BarChart/BarChart';

const BarChartSongsByDecade = (props) => {

    const { songs } = props;

    const [ bucketSize, setBucketSize ] = useState(10);

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

    const roundYearToBucket = (year) => Math.floor(year / bucketSize) * bucketSize;

    const constructBarData = () => {
        const data = [
            {
                key : 'Song Counts',
                values : [ ],
                k : Math.floor(Math.random() * 10000)
            }
        ];

        const oldestDecade = roundYearToBucket(getOldestSong().releaseDate.getFullYear());//roundYearToDecade(getOldestSong().releaseDate.getFullYear());
        const newestDecade = roundYearToBucket(getNewestSong().releaseDate.getFullYear());//roundYearToDecade(getNewestSong().releaseDate.getFullYear());     

        const buckets = { };

        for (let i = oldestDecade; i <= newestDecade; i+= bucketSize) {
            console.log(i)
            console.log(`${i} < ${newestDecade}`)
            console.log(bucketSize)
            buckets[i.toString()] = 0;
        }
        
        for (let song of songs) {
            let year = roundYearToBucket(song.releaseDate.getFullYear());//roundYearToDecade(song.releaseDate.getFullYear());
            buckets[year]++;
        }

        for (const year of Object.keys(buckets)) {
            data[0]['values'].push({
                x : year,
                y : buckets[year]
            });
        }        
        console.log(`Constructed bar data with ${bucketSize}:`)
        console.log(data)
        return data;

    }

    const [ barData, setBarData ] = useState(constructBarData());
    
    const handleChange = (value) => {
        setBucketSize(value);
    }

    useEffect(() => {
        setBarData(constructBarData());
        //ReactDOM.render(<App />, document.getElementById("app"));
    }, [ bucketSize ]);

    return (
        <Stack spacing={1}>
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
            <ButtonGroup  color='primary'
                                value={bucketSize}
                                onChange={handleChange}>
                <Button value='5'
                        onClick={() => {
                            handleChange(5);
                        }}>{'5'}</Button>
                <Button value='10'
                        onClick={() => {
                            handleChange(10);
                        }}>{'10'}</Button>
            </ButtonGroup>
        </Stack>
        
    )

}

export default BarChartSongsByDecade;
