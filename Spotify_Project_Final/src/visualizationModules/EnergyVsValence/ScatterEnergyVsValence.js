
import ScatterPlotByAttributes from "../ScatterPlotByAttributes";

const ScatterEnergyVsValence = (props) => {
    const { songs } = props;

    return (
        <ScatterPlotByAttributes    songs={songs}
                                    xAxis={'energy'}
                                    yAxis={'valence'}
                                    scaleFactor={{ x : 100, y : 100}}/>
    )
}

export default ScatterEnergyVsValence;
