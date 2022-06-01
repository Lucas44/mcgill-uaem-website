import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index-compiled.css';
import App from './App';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './components/profile/profile';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);