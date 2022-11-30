
import { Button, Grid, Stack } from '@mui/material';

const config = {
    vizCounts : 6
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
                            }}
                            sx={{
                                width : 125,
                                ml : 0.1,
                                mr : 0.1,
                                mt : 0.8,
                                mb : 0.8,
                                color : '#191414',
                                backgroundColor : '#1db954',
                                '&:hover' : {
                                    backgroundColor : '#1ed760'
                                }
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
