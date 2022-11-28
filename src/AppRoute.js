import React from 'react';
import { BrowserRouter, Route,Router, Routes} from 'react-router-dom';


import Splash from './Splash.js'
import Login from './Login.js'
import ProfilePage from './Profile.js'
import App from './App.js'
import Sidebar from './components/SideBar.js'
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