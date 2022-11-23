
import react from 'react';
import { Grid } from '@mui/material';

import MessageWithEmbed from '../../components/MessageWithEmbed';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const msToMins = (ms) => {

    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}


const ShortestSong = (props) => {

    const { song } = props;

    const getMessage = () => {

        let base = `The shortest song in the playlist is ${song.title} by ${song.artist}.`;

        let len = `It clocks in at only ${msToMins(song.duration_ms)}.`

        return `${base} ${len} Why must the best things always end so soon?`;

    }

    return (
        <Grid   container
                columns={1}>
            <Grid   item
                    xs={1}
                    key={0}>
                <AnimationOnScroll animateIn='animate__fadeInLeftBig'>
                    <MessageWithEmbed   song={song}
                                        message={getMessage()}/>
                </AnimationOnScroll>
            </Grid>
        </Grid>
    )

}

export default ShortestSong;
