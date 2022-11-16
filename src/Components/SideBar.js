import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'
import './SideBar.css';
import { IconContext } from 'react-icons';
import PlaylistData from "./PlaylistData.js";

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (

            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <h1 style={{textAlign:'center'}}>Your Playlists</h1>
                        </li>
                        {PlaylistData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <h3>{item.cName}</h3>
                                    <Link to={item.path}>

                                    </Link>

                                </li>
                            );
                        })}<Button variant="contained">⊕ Add playlist</Button>
                    </ul>
                    <Button Add Playlist/>
                </nav>
            </IconContext.Provider>

    );
}

export default Sidebar;