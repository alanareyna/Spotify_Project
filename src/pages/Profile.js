import React, {Fragment, useEffect, useState} from "react";
import Popup from 'reactjs-popup';
import '../components/PopUpWindow/PopUpWindow.css'
import 'reactjs-popup/dist/index.css';
import Background1 from '../assets/Spotify_App_Logo_blur.jpg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import App from '../App.js'
import Background from '../assets/music.jpeg'
import APIImage from '../assets/API.png';
import usersvsComp from '../visualizationModules/User/UsersVsComp'
import playlistData from "../components/PlaylistData.js";
import Sidebar from '../components/Sidebar/SideBar.js'
import bg1 from '../assets/grad1.png'
import d3 from '../assets/d3.png'

import API from "../API_Interface/API_Interface.js";
import UsersAndSubs from "../visualizationModules/User/UsersAndSubs";
import UsersVsComp from "../visualizationModules/User/UsersVsComp";

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

const ProfilePage = (props) => {

    const { user, setUser, setPlaylist } = props;
    console.log(user);
    
    const [ playlists, setPlaylists ] = useState(undefined);

    useEffect(() => {

        const api = new API();
        async function getUserPlaylists() {
            api.getUserPlaylists(user.username)
                .then(info => {
                    console.log(`api returns user playlists and they are: ${JSON.stringify(info)}`);
                    setPlaylists(info.playlists);
                });
        }

        getUserPlaylists();

    }, [ user ]);

    useEffect(() => {
        if (playlists === undefined) {
            return;
        }

    }, [ playlists ])

    return (<Fragment >
        <Sidebar playlists={playlists} setPlaylist={setPlaylist} setUser={setUser}/>
            <Box sx={{height:250}}className="Header" style={{margin:'auto',backgroundColor:'#04395E', backgroundPosition: "center",backgroundSize: "cover", alignContent:"center"}}>

                <h2 style={{
                        textAlign:"left",
                        padding:80, 
                        margin:'auto', 
                        color:'forestgreen', 
                        fontSize:'2.25rem'}}>
                    {`Welcome ${user.username}!`}<br/>Try selecting a playlist, or importing a new one from Spotify!
                </h2>
            </Box>
        {playlists !== undefined && playlists.length === 0 ? <div>
            <h1 style={{marginTop:25,marginLeft:80,fontSize:'2.5rem'}}>New user?</h1>
            <p style={{marginTop:25,marginLeft:80,fontSize:'1.5rem', justifyContent:"space-evenly", textAlign:"left"}}>
            To get started, connect your Spotify
        </p>
            <button style={{marginTop:10,marginLeft:80,borderRadius:50, padding:"1rem", fontWeight:800, cursor:"pointer", color:'green'}}
                    onClick={()=>requestAuthorization()} >Login to Spotify</button>
        </div> : ''}
        <h1 style={{textAlign:"center"}}>How it works.</h1>
        <div style={{backgroundImage:`url(${bg1})`, backgroundPosition: "center",
            backgroundSize: "cover",}}>
            <Grid container columns={2} style={{display:"flex", alignItems:"center"}}>
                <Grid item xs={1}>
                    <Box>
                        <p style={{padding:70,fontSize:'2rem', justifyContent:"space-evenly", textAlign:"center"}}> Utilizing Spotify's various API calls, we are capable of retrieving and storing metadata from songs, playlists, and artists</p>
                    </Box></Grid>
                <Grid item xs={1} style={{justifyContent:"center"}}> <img src={APIImage} width={700} style={{padding:30}}/> </Grid>
            </Grid>
            <Grid container columns={2} style={{display:"flex", alignItems:"center"}}>
                <Grid item xs={1}>
                    <img src={d3} width={700} style={{padding:50}}/>
                </Grid>
                <Grid item xs={1}>
                    <p style={{padding:70,fontSize:'2rem', justifyContent:"space-evenly", textAlign:"center", marginTop:60}}>
                        With this data, we create various representations through the help of Data-Driven Documents, also known as D3.
                    </p></Grid>
            </Grid>
            </div>

        <h3 style={{textAlign:"center"}}>Why use Spotify API compared to competitors?</h3>
        <Grid container columns={4}>
            <Grid item xs={2}>
                <Box>
                    <UsersAndSubs/>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Box>
                    <UsersVsComp/>
                </Box>
            </Grid>
        </Grid>



    </Fragment>);
}
export default ProfilePage;