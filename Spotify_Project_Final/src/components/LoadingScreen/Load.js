import React from 'react';
import Loading from "../../assets/SpotifyLogo.png";
import {Typography,Grid} from "@mui/material";
import "./Load.css";
function Load() {
    return (
        <div style={{marginTop:'10%'}}>
        <div className="loader"><img  className="LoadIcon" src={Loading}/></div>

            <Typography variant='h3' textAlign='center' fontWeight={20}>
                {'Loading your music...'}
                </Typography>

        </div>
    );
}

export default Load;
