
import react, { useEffect, useState } from 'react';

import { Paper } from '@mui/material';

const SpotifyEmbed = (props) => {

    const { song } = props;
    const theme = props.theme ?? 0;
    const id = song.id;
    const width = props.width ?? "100%"

    const constructLink =() => {
        return `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=${theme}`;
    }

    const [ link, setLink ] = useState(constructLink());

    useEffect(() => {
        setLink(constructLink());
    }, [ song ])

    return (
        <iframe     title={ id }
                    style={{ 'borderRadius' : '12px' }}
                    src={ link }
                    width={width}
                    height="152"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
        </iframe>
    )

}

export default SpotifyEmbed;
