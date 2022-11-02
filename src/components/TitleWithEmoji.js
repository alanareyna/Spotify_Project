
import react, {Fragment, useState} from 'react';

import { Typography } from '@mui/material'; 

import useInterval from '../hooks/useInterval';

const TitleWithEmojis = (props) => {

    const emojis = props.emojis ?? [ '😀' ];
    const msg = props.msg ?? "";
    const animSpeed = props.animSpeed ?? 1000;
    const variant = props.variant ?? 'h3';
    const align = props.align ?? 'center';

    const [ emoji, setEmoji ] = useState(0);

    useInterval(() => {
        if (emoji == emojis.length - 1) {
            setEmoji(0);
        } else {
            setEmoji(emoji + 1);
        }
    }, animSpeed);

    return (
        <Fragment>
            <Typography variant={variant}
                        align={align}>
                {`${msg} ${emojis[emoji]}`}
            </Typography>
        </Fragment>
    )

}

export default TitleWithEmojis;
