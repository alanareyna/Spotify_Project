
import react, { useEffect, useState } from 'react';

const SpotifyAlbumEmbed = (props) => {

    const { playlist } = props;
    const theme = props.theme ?? 0;
    const id = playlist.id;

    const [ link, setLink ] = useState(`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=${theme}`)

    useEffect(() => {
        setLink(`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=${theme}`);
    }, [ playlist ]);

    return (

        <iframe style={{"borderRadius" : "12px"}}
                src={link}
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
        </iframe>       

    )

}

export default SpotifyAlbumEmbed;
