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
import API from './API.png'
import playlistData from "./components/PlaylistData.js";


function requestAuthorization(){
    const client_Id = "a1ee653cf91e4621bf912de2d2e32475";
    const client_secret = "e6ac86ac40d748c8ad38fc545564cdcb";

    let url = "https://accounts.spotify.com/authorize";
    const redirect = "localhost:3000"

    url += "?client_id=" + client_Id;
    url += "&response_type=code";
    url+= "&redirect_uri=" +encodeURI(redirect)
    url += "&show_dialog=true";
    url += "&scope=user-read-private"
    window.location.href = url;

}

const ProfilePage = () => {

    return (<Fragment >

            <Box sx={{height:250}}className="Header" style={{margin:'auto',backgroundColor:'#04395E', backgroundPosition: "center",backgroundSize: "cover", alignContent:"center"}}>

                <h2 style={{textAlign:"left",padding:80, margin:'auto', color:'forestgreen', fontSize:'2.25rem'}}>Welcome admin, <br/>try selecting a playlist, or importing a new one from Spotify!</h2></Box>

        {playlistData.length !== 0 ? <div>
            <h1 style={{marginTop:25,marginLeft:80,fontSize:'2.5rem'}}>New user?</h1>
            <p style={{marginTop:25,marginLeft:80,fontSize:'1.5rem', justifyContent:"space-evenly", textAlign:"left"}}>
            To get started, connect your Spotify
        </p>
            <button style={{marginTop:10,marginLeft:80,borderRadius:50, padding:"1rem", fontWeight:800, cursor:"pointer", color:'green'}}
                    onClick={()=>requestAuthorization()} >Login to Spotify</button>
        </div> : ''}
        <h1 style={{textAlign:"center"}}>How it works.</h1>
        <Grid container columns={2} >
                <Grid item xs={1}>
                    <Box>
                        <p style={{padding:70,fontSize:'2rem', justifyContent:"space-evenly", textAlign:"center"}}> Utilizing Spotify's various API calls, we are capable of retrieving and storing metadata from songs, playlists, and artists</p>
                    </Box></Grid>
                <Grid item xs={1} style={{justifyContent:"center"}}> <img src={API} width={800} style={{padding:50}}/> </Grid>
            </Grid>
        <Grid container columns={2}>
            <Grid item xs={1}>
                <img/>
            </Grid>
            <Grid item xs={2}> <p style={{padding:70,fontSize:'2rem', justifyContent:"space-evenly", textAlign:"center"}}> With this powerful data, we create data representations with the help of D3's powerful libraries</p></Grid>
        </Grid>
            <div>


        </div>
    </Fragment>);
}
export default ProfilePage;