import { ProSidebarProvider } from 'react-pro-sidebar';

import {Fragment} from "react";
import Sidebar from "./Components/SideBar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './Pages/Home'
import Splash from "./Splash";

const App = () => {

    return (
        <Fragment>
            <Router>
                <Sidebar/>
                <div > Add playlists</div>
            </Router>

        </Fragment>
    );
}

export default App;