
import React, { useState } from 'react';
import { BrowserRouter, Route,Router, Routes} from 'react-router-dom';


import Splash from './pages/Splash.js'
import Login from './pages/Login.js'
import ProfilePage from './pages/Profile.js'
import App from './App.js'
import SideBar from './components/Sidebar/SideBar.js';
//import Sidebar from './components/SideBar/SideBar.js'
function AppRouter() {

    const [ user, setUser ] = useState(undefined);
    const [ cont, setCont ] = useState(false);

    return (
        <div className="wrapper">

                {cont ? 
                    (<Login setUser={setUser}/>)
                    :
                    (<Splash setCont={setCont}/>)
                }
        </div>
    );
}

export default AppRouter;


/*

                <Routes>
                    <Route path="/" element={<Splash />} />
                    <Route path="/Login" element={<Login setUser={setUser}/>}/>

                    <Route path="/Home" element={<ProfilePage/>}/>
                    <Route path="/Vis" element={<App/>}/>


                </Routes>
*/