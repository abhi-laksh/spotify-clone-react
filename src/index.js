import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/fontawesome.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/main.css';
import Routes from './Routes';
import Layout from './components/layouts/Webplayer/Layout';
import Base from './components/layouts/Base';


ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root') 
);