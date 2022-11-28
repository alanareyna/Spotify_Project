
import ScatterPlotByAttributes from "../ScatterPlotByAttributes";

const ScatterEnergyVsValence = (props) => {
    const { songs } = props;

    return (
        <ScatterPlotByAttributes    songs={songs}
                                    xAxis={'energy'}
                                    yAxis={'valence'}/>
    )
}

export default ScatterEnergyVsValence;
