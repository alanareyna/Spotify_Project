import React, { Fragment, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import Button from '@mui/material/Button'
import './SideBar.css';
import { IconContext } from 'react-icons';
import PlaylistData from "../PlaylistData.js";
import {Link} from "react-router-dom";

const Sidebar = (props) => {

    const { playlists, setPlaylist } = props;

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

                <FaIcons.FaBars style={{marginLeft:12, cursor:"pointer"}}onClick={showSidebar} />
                <h2 style={{font:"Gotham Circular", color:'white', textAlign:'center'}}>Spotify Journey</h2>
                <Link to="/Login"><FaIcons.FaSignOutAlt style={{marginRight:18, cursor:"pointer", fontSize:"1.5rem"}} /></Link>

            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' >
                    <li className='navbar-toggle'>
                        <h1 style={{textAlign:'center'}}>Your Playlists</h1>
                    </li>

                    
                    <Button variant="contained">⊕ import playlists</Button>

                    {/*playlists === undefined || playlists.length === 0) ? <div><p style={{font:'Gotham Circular', color:"white"}}>Looks like you haven't imported any playlists yet,</p></div> : ''*/}
                    
                    {getPlaylistMsg()}

                    {playlists === undefined ? <Fragment/> : playlists.map((item, index) => {
                        return (
                            <Button size='small'
                                    variant='outlined'
                                    onClick={() => {
                                        setPlaylist(item);
                                    }}>{item.name}</Button>
                        )
                        /*return (
                            <li key={index} className={item.cName}>
                                <h3 style={{color:"white"}}>{item.name}</h3>


                            </li>
                        );
                        */
                    })}
                    <Link to="/Vis"><Button size={"small"} variant="outlined" onClick={()=>setPlaylist('sampleP1')}>Sample Playlist #1</Button>
                    </Link>

                </ul>
                <Button onClick={showSidebar}><FaIcons.FaCaretLeft/></Button>

            </nav>
        </IconContext.Provider>

    );
}

export default Sidebar;