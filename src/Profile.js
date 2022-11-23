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
import Background from './music.jpeg'


const ProfilePage = () => {

    return (<Fragment >

            <Box sx={{height:250}}className="Header" style={{margin:'auto',backgroundImage:`url(${Background})`, backgroundPosition: "center",backgroundSize: "cover", alignContent:"center"}}>
                <h2 style={{textAlign:"center",padding:80, margin:'auto', color:'forestgreen', fontSize:'2.25rem'}}>Welcome admin, <br/>try selecting a playlist, or importing a new one from Spotify!</h2></Box>

            <div><h1>How it works.</h1>
                <Box>
                    <p> Utilizing Spotify's various API calls, we are capable of creating sleek and innovative infographics for our users</p>
                </Box>


        </div>
    </Fragment>);
}
export default ProfilePage;