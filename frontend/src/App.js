import './assets/style/Main.css';
import React from 'react';
import Login from './components/login/login';
import mask from './assets/media/ppe-mask.svg';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Userfront from "@userfront/react";

Userfront.init("8nwrppdb");

const SignupForm = Userfront.build({
  toolId: "lokrdn"
});

function App() {
  return (

    /* <Login></Login> */
     <Login />
    //<SignupForm />
    // <div className='flex justify-center items-center h-screen'>
    //     Hello UAEM!
    //     <img className='mx-8' src={mask}/>
    // </div>
  );
}

export default App;
