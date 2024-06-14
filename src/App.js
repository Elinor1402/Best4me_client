import React from "react";
import { useState, useEffect, useRef } from "react";
import './App.css';
import Home from './components/pages/home/Home';
import SignUp from './components/pages/sign/SignUp';
import Login from './components/pages/sign/Login';
import FinalSignUp from './components/pages/sign/FinalSignUp';
import Summery from './components/pages/summery/Summery';
import UserList from './components/pages/users/Users';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadFiles from './components/pages/files/UploadFiles';
import PrivateRoute from "./Redux/PrivateRoute";
import Topbar from "./components/topbar/TopBarForAdmin";
import Questionaire from './components/Questions/questionnaire';
import HealthForm from './components/pages/forms/HealthForm';
import HiTechForm from './components/pages/forms/HiTechForm';

function App() {

  
  return (
   
    <Router>
      {/* <Topbar/> */}
      <Routes>
        <Route exact path='/' element= {<Home />}/>
        <Route path='/sign-up' element= {<SignUp/> } />
        <Route path='/log-in' element= {<Login />} />
        <Route path='/admin' element= {<PrivateRoute> <Summery /> </PrivateRoute>} />
        <Route path='/users' element= {<UserList />} />
        <Route path='/files' element= {<UploadFiles />} />
        <Route path= '/final-signup' element= {<FinalSignUp />} />
        <Route path='/questionnarie' element= {<Questionaire />} />
        <Route path='/Health' element= {<HealthForm />} />
        <Route path='/HiTech' element= {<HiTechForm />} />
      </Routes>
    </Router>
   
  );
}

export default App;
