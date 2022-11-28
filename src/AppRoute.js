import React from 'react';
import { BrowserRouter, Route,Router, Routes} from 'react-router-dom';


import Splash from './pages/Splash.js'
import Login from './pages/Login.js'
import ProfilePage from './pages/Profile.js'
import App from './App.js'
import SideBar from './components/Sidebar/SideBar.js';
//import Sidebar from './components/SideBar/SideBar.js'
function AppRouter() {
    return (
        <div className="wrapper">

                <Routes>
                    <Route path="/" element={<Splash />} />
                    <Route path="/Login" element={<Login/>}/>

                    <Route path="/Home" element={<ProfilePage/>}/>
                    <Route path="/Vis" element={<App/>}/>


                </Routes>

        </div>
    );
}

export default AppRouter;