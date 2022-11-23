
import { Stack, Paper, Typography } from "@mui/material"

const WhySoManyOther = (props) => {

    return (
        <Stack spacing={2}>
            <Typography variant='h3' align='center'>
                {'Why so many \'Other\' tags? 🤔'}
            </Typography>
            <Stack spacing={0.5}>
                <Typography>
                    {`One of Spotify's biggest strengths is the level of specificity at which it stores data about its tracks.`}
                </Typography>
                <Typography>
                    {'However, this level of granularity leads to incredibly specific genre tags, many of which only apply to a single song.'}
                </Typography>
                <Typography>
                    {`These 'single genres' are often very obscure...`}
                </Typography>
            </Stack>
        </Stack>
    )

}

export default WhySoManyOther;
