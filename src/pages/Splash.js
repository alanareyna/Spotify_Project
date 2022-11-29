import {Fragment, useState} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Main from '../index.js';
import Background from '../assets/Spotify_App_Logo.svg'
import Button from '@mui/material/Button'
import Login from './Login'


const Splash = (props) => {

    const { setCont } = props;

    const [isClicked,setIsClicked] = useState(false);

    return (

        <Fragment>
            <Grid container
                               columns={1}
                               spacing={0}
                               direction="column"
                               alignItems="center"
                               justifyContent="center"
                               style={{ minHeight: '100vh' ,backgroundImage:`url(${Background})`,
                                   backgroundPosition: "center",
                                   backgroundSize: "cover",
                                   backgroundRepeat: "no-repeat", }} sx={{ml:'auto', mr:'auto',mb:10}}>
                <Grid item xs={1} style={{}}>
                    <div className="content" style={{
                    }}>
                        <div className="inner" style={{border:0}}>
                            <h1 style={{color:"white", font: "inherit", fontSize: '2.25rem',
                                letterSpacing: '0.2rem', fontWeight: 600, margin:'0 0 2rem 0',
                                textAlign:'center'}}>SPOTIFY-JOURNEY</h1>
                            <Box width={900} padding={2.5} sx={{color:'white',borderTop:1,borderBottom:1}}>
                                <p style={{color:"white", textAlign:'center', fontSize:25}}>Bringing data visualization and music taste Together<br/>Powered by <a
                                    href="https://d3js.org/">D3</a></p>
                                <footer style={{color:"whitesmoke", textAlign:"center"}}>A project by Alana Reyna, Joseph Henderson, and Karsten Steinhorst</footer>
                            </Box>
                            <style>

                                
                            </style>

                            <div className="vl"></div>
                            <Grid container columns={1}
                                  spacing={0}
                                  alignItems="center"
                                  justifyContent="center"
                                  direction="column">

                                <Grid item xs={1} alignContents="center">
                                    
                                    <Button style={{padding:20}}
                                            variant="contained"
                                            color="success"
                                            size="large"
                                            onClick={()=>setCont(true)}>
                                        Begin Your Journey
                                    </Button>
                                    
                                </Grid>

                            </Grid>

                        </div>
                    </div>
                </Grid>
            </Grid>



                </Fragment>);


}

export default Splash;
