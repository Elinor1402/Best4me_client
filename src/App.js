import React from "react";
import "./App.css";
import Home from "./components/pages/home/Home";
import SignUp from "./components/pages/sign/SignUp";
import Login from "./components/pages/sign/Login";
import LoginUser from "./components/pages/sign/LoginUser";
import FinalSignUp from "./components/pages/sign/FinalSignUp";
import Summery from "./components/pages/summery/Summery";
import UserList from "./components/pages/users/Users";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadFiles from "./components/pages/files/UploadFiles";
import PrivateRoute from "./Redux/PrivateRoute";
import GeneralForm from "./components/pages/forms/GeneralForm";
import PersonalForm from "./components/pages/forms/PersonalForm";
import NotFound from "./components/pages/notfound/NotFound";

//The main component that uses router to navigate through different components
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/admin" element={<Summery />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/files" element={<UploadFiles />} />
        <Route path="/final-signup" element={<FinalSignUp />} />
        <Route path="/user-log-in" element={<LoginUser />} />
        <Route path="/Personal" element={<PersonalForm />} />
        <Route path="/generalform" element={<GeneralForm />} />

        {/* to prevent rendering the page if you not log in */}
        {/* <Route path="/admin" element={<PrivateRoute component={Summery} />} /> */}
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
