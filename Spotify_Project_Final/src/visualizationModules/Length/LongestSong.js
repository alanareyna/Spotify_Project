
import { Grid } from '@mui/material';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import MessageWithEmbed from '../../components/MessageWithEmbed';

const msToMins = (ms) => {

    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const LongestSong = (props) => {

    const { song } = props;

    const getMessage = () => {

        let base = `The longest song in the playlist is ${song.title} by ${song.artist}.`;

        let len = `It clocks in at ${msToMins(song.duration_ms)}.`

        return `${base} ${len} You can never have too much of a good thing.`;

    }

    return (
        <Grid   container
                columns={1}>
            <Grid   item
                    xs={1}
                    key={0}>
                <AnimationOnScroll animateIn='animate__fadeInRightBig'>
                    <MessageWithEmbed   song={song}
                                        message={getMessage()}
                                        textSide={'right'}/>
                </AnimationOnScroll>
            </Grid>
        </Grid>
    )

}
//The longest song in the playlist is ${song.title} by ${song.artist}.
export default LongestSong;
