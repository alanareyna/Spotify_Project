

import {Fragment} from "react";
import Sidebar from "./Components/SideBar";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Pages/Home'

const PlaylistPage = () => {

    return (
    <div className={"navbar"}>
        <Router>
            <Sidebar/>
            test
                <Route path='/' component={Home}/>
        </Router>

    </div>
    );
}

export default PlaylistPage;