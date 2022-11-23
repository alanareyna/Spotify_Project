import React, {Fragment, useState} from "react";
import Popup from 'reactjs-popup';
import './PopUpWindow.css'
import 'reactjs-popup/dist/index.css';
import Background1 from './Spotify_App_Logo_blur.jpg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import App from './App.js'



const Login = () => {
    const [isLogin,setLogin] = useState(false);


    return (
        <Fragment >
        {!isLogin ?
            <Grid container
                  columns={1}
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"


                  style={{ minHeight: '100vh' ,backgroundImage:`url(${Background1})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat", }} sx={{ml:'auto', mr:'auto',mb:10}}>
                <h1 style={{color:"white", font: "inherit", fontSize: '2.25rem',
                    letterSpacing: '0.2rem', fontWeight: 600, margin:'0 0 2rem 0',
                    textAlign:'center'}}>SPOTIFY-JOURNEY</h1>
                <TextField

                    id="outlined-error-helper-text"
                    label="Login name"
                    placeholder=""
                    onKeyPress={(event) => {
                        if(event.key === "Enter")
                            event.preventDefault();
                    }}
                    style={{backgroundColor:'white'}}
                />
                <TextField ms={1}

                    id="outlined-error-helper-text"
                    label="Password"
                    placeholder=""
                    onKeyPress={(event) => {
                        if(event.key === "Enter")
                            event.preventDefault();
                    }}
                           style={{backgroundColor:'white'}}
                />
                <Divider />
                <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={() => setLogin(!isLogin)} //when data/api is pushed, we can verify onclick if its a real user
                    >Login</Button>

                    <Popup
                        trigger={<Button variant="contained" className="button"> New User </Button>}
                        modal
                        nested
                    >
                        {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="header"> Create User </div>
                                <div className="content" style={{textAlign:'center'}}>
                                    {' '}
                                    A Spotify account is required for importing Playlists, Please <br/>create a username and password unique from your Spotify Account
                                </div>
                                <TextField

                                    id="outlined-error-helper-text"
                                    label="Username"
                                    placeholder=""
                                    onKeyPress={(event) => {
                                        if(event.key === "Enter")
                                            event.preventDefault();
                                    }}
                                    style={{backgroundColor:'white'}}
                                />
                                <TextField ms={1}
                                           id="outlined-error-helper-text"
                                           label=" Password"
                                           placeholder=""
                                           onKeyPress={(event) => {
                                               if(event.key === "Enter")
                                                   event.preventDefault();
                                           }}
                                           style={{backgroundColor:'white'}}
                                />
                                <TextField ms={1}
                                           id="outlined-error-helper-text"
                                           label="Confirm Password"
                                           placeholder=""
                                           onKeyPress={(event) => {
                                               if(event.key === "Enter")
                                                   event.preventDefault();
                                           }}
                                           style={{backgroundColor:'white'}}
                                />
                                <div className="actions">
                                    <Popup
                                        trigger={<button className="button"> Create </button>}
                                        position="top center"
                                        nested
                                    >

                                    </Popup>
                                    <button
                                        className="button"
                                        onClick={() => {
                                            console.log('modal closed ');
                                            close();
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>

                </Box>
            </Grid>
            : <App/>}
        </Fragment>
    );
};

export default Login;