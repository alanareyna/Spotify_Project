
import AreaChart from '../../d3/components/AreaChart/AreaChart.js';


const data = [
    {
        "key" : "Users",
        "values" : [
            { "x" : "2015", "y" : 77 },
            { "x" : "2016", "y" : 104 },
            { "x" : "2017", "y" : 138 },
            { "x" : "2018", "y" : 180 },
            { "x" : "2019", "y" : 232 },
            { "x" : "2020", "y" : 299 },
            { "x" : "2021", "y" : 365 },
            { "x" : "2022", "y" : 433 } 
        ]
    },
    {
        "key" : "Subscribers",
        "values" : [
            { "x" : "2015", "y" : 22 },
            { "x" : "2016", "y" : 36 },
            { "x" : "2017", "y" : 59 },
            { "x" : "2018", "y" : 83 },
            { "x" : "2019", "y" : 108 },
            { "x" : "2020", "y" : 128 },
            { "x" : "2021", "y" : 165 },
            { "x" : "2022", "y" : 188 } 
        ]
    }
]

const UsersAndSubs = (props) => {

    return (
        <AreaChart data={data}/>
    )

}

export default UsersAndSubs;
