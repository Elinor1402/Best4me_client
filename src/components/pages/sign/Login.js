import React from "react";
import "./Login.css";
import axios from "axios";
import Navbar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginAction, logoutAction } from "../../../Redux/usersActions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";

//Login page for admin
export default function LogIn() {
  const [companyID, setCompanyID] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    //if you add this line when you reach login page you will disconnevt from all users.(optional)
    dispatch(logoutAction());
  }, []);

  function handleSubmit(Event) {
    console.log("submit");
    Event.preventDefault();

    axios
      .post("http://localhost:3000/log-in", {
        companyID: companyID,
        companyPassword: companyPassword,
      })
      .then((res) => {
        const userID = localStorage.getItem("userID");
        if (userID) localStorage.removeItem("userID");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("CompanyID", companyID);
        dispatch(loginAction());
        navigate("/admin");
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
      });
  }
  return (
    <>
      <Navbar />
      <div className="login-container">
        <h1 className="sign-in">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form2">
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <div className="form-group">
              <label for="companyID">Comany ID : </label>
              <input
                type="text"
                name="companyID"
                placeholder="Company ID"
                value={companyID}
                onChange={(e) => setCompanyID(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label for="companyID">Password : </label>
              <i onClick={togglePasswordVisiblity}>
                {passwordShown ? <FaEye /> : <FaEyeSlash />}
              </i>
              <input
                type={passwordShown ? "text" : "password"}
                name="companyPassword"
                placeholder="Password"
                value={companyPassword}
                onChange={(e) => setCompanyPassword(e.target.value)}
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
