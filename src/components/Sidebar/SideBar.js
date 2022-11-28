import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Button from '@mui/material/Button'
import './SideBar.css';
import { IconContext } from 'react-icons';
import PlaylistData from "../PlaylistData.js";
import {Link} from "react-router-dom";

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const [Playlist,setPlaylist] = useState('');
    const showSidebar = () => setSidebar(!sidebar);

    return (

        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar' style={{justifyContent:"space-between"}}>

                <FaIcons.FaBars style={{marginLeft:12, cursor:"pointer"}}onClick={showSidebar} />
                <h2 style={{font:"Gotham Circular", color:'white', textAlign:'center'}}>Spotify Journey</h2>
                <Link to="/Login"><FaIcons.FaSignOutAlt style={{marginRight:18, cursor:"pointer", fontSize:"1.5rem"}} /></Link>

            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' >
                    <li className='navbar-toggle'>
                        <h1 style={{textAlign:'center'}}>Your Playlists</h1>
                    </li>
                    {PlaylistData.length === 0 ? <div><p style={{font:'Gotham Circular', color:"white"}}>Looks like you haven't imported any playlists yet,</p></div> : ''}
                    {PlaylistData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <h3 style={{color:"white"}}>{item.cName}</h3>


                            </li>
                        );
                    })}<Button variant="contained">⊕ import playlists</Button>
                    <Link to="/Vis"><Button size={"small"} variant="outlined" onClick={()=>setPlaylist('sampleP1')}>Sample Playlist #1</Button>
                    </Link>

                </ul>
                <Button onClick={showSidebar}><FaIcons.FaCaretLeft/></Button>

            </nav>
        </IconContext.Provider>

    );
}

export default Sidebar;