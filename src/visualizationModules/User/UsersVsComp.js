
import LineChart from '../../d3/components/LineChart/LineChart.js'

import { Grid, Typography } from '@mui/material';

const data = [
    {
        "key" : "Spotify",
        "values" : [
            { "x" : "2016", "y" : 36 },
            { "x" : "2017", "y" : 59 },
            { "x" : "2018", "y" : 83 },
            { "x" : "2019", "y" : 108 },
            { "x" : "2020", "y" : 128 },
            { "x" : "2021", "y" : 165 }
        ]
    },
    {
        "key" : "Apple Music",
        "values" : [
            { "x" : "2016", "y" : 20 },
            { "x" : "2017", "y" : 27 },
            { "x" : "2018", "y" : 40 },
            { "x" : "2019", "y" : 50 },
            { "x" : "2020", "y" : 72 },
            { "x" : "2021", "y" : 88 }		
        ]
    },
    {
        "key" : "Amazon Music",
        "values" : [
            { "x" : "2016", "y" : 8 },
            { "x" : "2017", "y" : 16 },
            { "x" : "2018", "y" : 24 },
            { "x" : "2019", "y" : 32 },
            { "x" : "2020", "y" : 55 },
            { "x" : "2021", "y" : 68 }		
        ]
    },
    {
        "key" : "Youtube Music",
        "values" : [
            { "x" : "2016", "y" : 3 },
            { "x" : "2017", "y" : 2.8 },
            { "x" : "2018", "y" : 10 },
            { "x" : "2019", "y" : 18 },
            { "x" : "2020", "y" : 30 },
            { "x" : "2021", "y" : 50 }		
        ]
    }	
]

const UsersVsComp = (props) => {

    return (
            <LineChart data={data}
                        colorScale={{
                            from : '#00ff00',
                            to : '#ff0000'
                        }}/>
    )

}

export default UsersVsComp;
