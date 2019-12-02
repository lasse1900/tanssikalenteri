import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'  // Redirect
// import loginService from './services/login'
// import { useField } from './hooks'
import './App.css'
// import { Login, Register, index } from './routes'
import Routes from './routes';


import 'antd/dist/antd.css';


const App = () => (
  <div>
    <button onClick={event => window.location.href = '/login'}>Login</button>
    <button onClick={event => window.location.href = '/register'}>Register</button>
    <button onClick={event => window.location.href = '/auth'}>Auth</button>
    <Routes />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
