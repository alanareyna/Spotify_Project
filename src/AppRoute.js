
import React, { useState } from 'react';
import { BrowserRouter, Route,Router, Routes} from 'react-router-dom';


import Splash from './pages/Splash.js'
import Login from './pages/Login.js'
import ProfilePage from './pages/Profile.js'
import App from './App.js'
import SideBar from './components/Sidebar/SideBar.js';
import Viz from './pages/Viz.js';
//import Sidebar from './components/SideBar/SideBar.js'
function AppRouter() {

    const [ user, setUser ] = useState(undefined);
    const [ cont, setCont ] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ playlist, setPlaylist ] = useState(undefined);

    const getComponent = () => {
        if (user != undefined) {
                if (playlist !== undefined) {
                    return (
                        <Viz playlist={playlist}/>
                    )
                } else {
                    return (
                        <ProfilePage user={user} setPlaylist={setPlaylist}/>
                    )
                }
        } else {
            return !cont ? (<Splash setCont={setCont}/>) : (<Login setUser={setUser}/>)
        }
    }
    
    return (
        <div className="wrapper">
                {getComponent()}
        </div>
    );
}

export default AppRouter;
