
import react, { useState } from 'react';

const SpotifyEmbed = (props) => {

    const { song } = props;
    const theme = props.theme ?? 0;
    const id = song.id;

    const [ link, setLink ] = useState(`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=${theme}`);

    return (
        <iframe     title={ id }
                    style={{ 'borderRadius' : '12px' }}
                    src={ link }
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    >
        </iframe>
    )

}

export default SpotifyEmbed;
