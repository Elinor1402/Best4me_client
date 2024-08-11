import React from "react";
import "./Login.css";
import Button from "@material-ui/core/Button";
import LoginIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import Navbar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { loginAction, logoutAction } from "../../../Redux/usersActions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";

export default function LogInUser() {
  const [userID, setUserID] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const isLogged = useSelector((state) => state.usersReducer.isLogged);
  const dispatch = useDispatch();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    //if you add this line when you reach userlogin page you will disconnevt from all users.(optional)
    dispatch(logoutAction());
  }, []);

  function handleSubmit(Event) {
    console.log("submit");
    Event.preventDefault();

    axios
      .post("http://localhost:3000/user-log-in", {
        userID: userID,
        userPassword: userPassword,
      })
      .then((res) => {
        const compID = localStorage.getItem("CompanyID");
        if (compID) localStorage.removeItem("CompanyID");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", userID);
        dispatch(loginAction());
        console.log("general info", res.data.message);
        const infoForm = res.data.message;
        navigate("/generalform", { state: { infoForm } });
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
        console.log(errorMessage);
      });
  }
  return (
    <>
      <Navbar />
      <div className="login-container">
        <h1 className="sign-in">Login User</h1>
        <form onSubmit={handleSubmit}>
          <div className="form2">
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <div className="form-group">
              <label for="userID">User ID : </label>
              <input
                type="text"
                name="userID"
                placeholder="User ID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                required
              />
            </div>
            {/* <i onClick={togglePasswordVisiblity}>{passwordShown ?  <FaEye/>:<FaEyeSlash/>}</i> */}
            <div className="form-group">
              <label for="userID">Password : </label>
              <i onClick={togglePasswordVisiblity}>
                {passwordShown ? <FaEye /> : <FaEyeSlash />}
              </i>
              <input
                type={passwordShown ? "text" : "password"}
                name="userPassword"
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setuserPassword(e.target.value)}
                required
              />
            </div>
            <div className="loginbtn">
              <button type="submit" class="btn btn-primary">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
