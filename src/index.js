import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import logo from './logo.png';
//import PrimarySearchAppBar from './Menu'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <><div style={
        {
            height: '100vh',
            backgroundImage: "url(http://localhost:3000/bg.jpg)",
            backgroundRepeat: false,
            backgroundSize: '100%,100%', 
            
            }
            }>
        <App /></div></>
);
