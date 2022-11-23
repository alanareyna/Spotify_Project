
import { Grid, Stack, Typography } from '@mui/material';

import EnergyDesciption from './EnergyDescription';
import ValenceDesciption from './ValenceDescription';
import ScatterEnergyVsValence from './ScatterEnergyVsValence';

const Title = () => {
    return (
        <Stack direction='row'>
            <Typography variant='h2'>{'⚡'}</Typography>
            <Typography variant='h2'>{'Energy vs. Valence'}</Typography>
            <Typography></Typography>
        </Stack>
    )
}

const EnergyVsValence = (props) => {

    const { songs } = props;

    return (
        <Stack spacing={1}>
            <Typography variant='h1' align='center'>
                {'Energy vs. Valence'}
            </Typography>
            <EnergyDesciption/>
            <ValenceDesciption/>
            <Grid container columns={2}>
                <Grid item xs={1}>
                    <ScatterEnergyVsValence songs={songs}/>
                </Grid>
            </Grid>
        </Stack>
    )

}

export default EnergyVsValence;
