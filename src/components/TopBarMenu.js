
import { Button, Grid, Stack } from '@mui/material';

const config = {
    vizCounts : 5
}

const TopBarMenu = (props) => {

    // Buttons is an array of objects:
    //  { title : <title of button>, ref : <reference obtained via useRef> }
    const { buttons } = props;

    const scrollToRef = (ref) => {
        ref.current.scrollIntoView({
            behavior : 'smooth',
            block : 'start'
        });
    }

    return (
        <Stack direction='row' justifyContent='center'>
        {
            buttons.map((button) => {
                return (
                    <Button variant='contained'
                            onClick={() => {
                                scrollToRef(button.ref)
                            }}>
                        {button.title}
                    </Button>
                )
            })
        }
        </Stack>
    )
}

export default TopBarMenu;
