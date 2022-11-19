import React, {Fragment, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import Splash from "./Splash";

import Button from '@mui/material/Button'

const root = ReactDOM.createRoot(document.getElementById('root'));



export default function Main(props) {
    console.log("main calls splash which calls login.")
    return(<Splash/>)
}



root.render(
    <Fragment>
        <Main/>
    </Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//export default ToLogin;
