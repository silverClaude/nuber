import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//import PrimarySearchAppBar from './Menu'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <><div style={
        {
            height: '100vh',
            backgroundImage: 'url(/bg.jpg)',
            backgroundRepeat: false,
            backgroundSize: '100%,100%', 
            
            }
            }>
        <App /></div></>
);
