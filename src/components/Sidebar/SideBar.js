import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Button from '@mui/material/Button'
import './SideBar.css';
import { IconContext } from 'react-icons';
import PlaylistData from "../PlaylistData.js";
import {Link} from "react-router-dom";

import {Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

const SideBar = (props) => {

    const { playlists, setPlaylist, setUser } = props;

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const getPlaylistMsg = () => {
        if (playlists === undefined) {
            return (<Fragment/>)
        }

        if (playlists.length === 0) {
            return (<div>
                <p style={{font:'Gotham Circular', color:"white"}}>
                    Looks like you haven't imported any playlists yet,
                </p>
            </div>)
        } else {
            return (<Fragment/>);
        }
    }

    return (
        
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar' style={{justifyContent:"space-between"}}>

                   { playlists==undefined ?  
                    <FaIcons.FaBars style={{marginLeft:12, cursor:"pointer"}}
                    onClick={showSidebar} /> 
                    : <FaIcons.FaHome style={{marginLeft:12, cursor:"pointer"}}
                    onClick={(setPlaylist(undefined))} />}

                <h2     style={{
                            font:"Gotham Circular",
                            color:'white',
                            textAlign:'center'
                        }}
                        onClick={() => {
                            setPlaylist(undefined);
                        }}>
                    Spotify Journey
                </h2>

                <FaIcons.FaSignOutAlt   style={{
                                            marginRight:18,
                                            cursor:"pointer",
                                            fontSize:"1.5rem"
                                        }}
                                        onClick={() => {
                                            console.log('wowie')
                                            setPlaylist(undefined);
                                            setUser(undefined);
                                        }}/>

            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' >
                    <li className='navbar-toggle'>
                        <h1 style={{textAlign:'center'}}>Your Playlists</h1>
                    </li>

                    
                    <Button variant="contained">⊕ import playlists</Button>
                    
                    {getPlaylistMsg()}

                    {playlists === undefined ? <Fragment/> : playlists.sort((el1, el2) => {
                        return el1.name.localeCompare(el2.name)
                    }).map((item, index) => {
                        return (
                            <Button size='small'
                                    variant='contained'
                                    sx={{
                                        mt : 1,
                                        mb : 1
                                    }}
                                    style={{
                                        width : 150,
                                        color : '#191414',
                                        backgroundColor : '#1db954',
                                        '&:hover' : {
                                            backgroundColor : '#1ed760'
                                        }
                                    }}
                                    onClick={() => {
                                        setPlaylist(item);
                                    }}>
                                {item.name}
                            </Button>
                        )
                    })}

                </ul>
                <Button onClick={showSidebar}><FaIcons.FaCaretLeft/></Button>

            </nav>
        </IconContext.Provider>
        
    );
}

export default SideBar;
