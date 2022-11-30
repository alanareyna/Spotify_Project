
import React, {Fragment, useState, useEffect } from "react";
import { Button, Box, Divider, Grid, FormControl } from '@mui/material';
import Popup from 'reactjs-popup';
import * as FaIcons from 'react-icons/fa';

import PopUpWindow from "../components/PopUpWindow/PopUpWindow";
import '../components/PopUpWindow/PopUpWindow.css'
import 'reactjs-popup/dist/index.css';
import Background1 from '../assets/Spotify_App_Logo_blur.jpg'
import TextField from '@mui/material/TextField';

import App from '../App.js'
import API from "../API_Interface/API_Interface.js";
import {Link} from "react-router-dom";


const Login = ({setUser}) => {
    const [isLogin,setLogin] = useState(false);
    const [errorState,setErrorState] = useState(false);
    const [ userInput, setUserInput ] = useState('');
    const [ passwordInput, setPasswordInput ] = useState('');
    const [ verifyUser, setVerifyUser ] = useState(false);
    const [ authFailed, setAuthFailed ] = useState(false);


    const handleInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserInput(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("Login:: handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    useEffect(() => {
        
        if (!verifyUser || userInput.length === 0 || passwordInput.length === 0) {
            console.log(`${verifyUser} ${userInput.length} ${passwordInput.length}`)
            return;
        }

        const api = new API();
        async function getUserInfo() {
            api.getUserInfo(userInput)
                .then( userInfo => {
                    console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                    const user = userInfo.user;
                    console.log(`The password is ${user.password}`)
                    if( userInfo.status === "OK" && user.password === passwordInput) {
                        console.log('logged in successfully')
                        setUser(user);
                        setErrorState(false);
                        
                    } else  {
                        setVerifyUser(false);
                        setAuthFailed(true);
                        setErrorState(true);
                    }
                });
        }

        getUserInfo();
    }, [ verifyUser, userInput, passwordInput ]);

    const handleUserInputChange = (event) => {
        setUserInput(event.target.value);
    }

    const handlePasswordInputChange = (event) => {
        setPasswordInput(event.target.value);
    }

    return (
        <Fragment >
                <Grid   container
                        columns={1}
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            minHeight: '100vh',
                            backgroundImage:`url(${Background1})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat", }}
                        sx={{
                            ml:'auto',
                            mr:'auto',
                            mb:10}}>
                    <h1 style={{color:"white", font: "inherit", fontSize: '2.25rem',
                        letterSpacing: '0.2rem', fontWeight: 600, margin:'0 0 2rem 0',
                        textAlign:'center'}}>SPOTIFY-JOURNEY</h1>
                    {errorState ? <Grid container columns={2} style={{alignItems:"center",backgroundColor:'red', width:250, padding:3,borderRadius:10}}><FaIcons.FaExclamationCircle xs={1} item style={{justifyContent:"center", textAlign:"center"}}/><p xs={1} item style={{justifyContent:"center", textAlign:"center"}}> Wrong username or password</p></Grid> : ''}
                        <TextField

                            id="outlined-error-helper-text"
                            label="Login name"
                            placeholder=""

                            onKeyPress={(event) => {
                                if(event.key === "Enter") {
                                    event.preventDefault();
                                }
                            }}
                            style={{backgroundColor:'white'}}
                            onChange={handleUserInputChange}
                        />
                        <TextField ms={1}
                                   className="passwordField"
                                   id="password-field"
                                   label="Password"
                                   placeholder=""
                                   type={"password"}


                                onKeyPress={(event) => {
                                    if(event.key === "Enter")
                                        event.preventDefault();
                                }}
                                style={{backgroundColor:'white'}}
                                onChange={handlePasswordInputChange}
                        />
                    <Divider />
                    <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
                            <Button variant="contained"
                                    size="medium"
                                    onClick={() => { setVerifyUser(true) }}>
                                Login
                            </Button>


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

                                        A Spotify account is required for importing Playlists, Please <br/>
                                        create a username and password unique from your Spotify Account
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
                                               type={"password"}
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
                                               type={"password"}
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

        </Fragment>
    );
};

export default Login;