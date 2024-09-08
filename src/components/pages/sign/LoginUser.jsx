import React from "react";
import "./Login.css";
import LoginIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import Navbar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { loginAction, logoutAction } from "../../../Redux/usersActions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Box,
  Paper,
} from "@mui/material";

export default function LogInUser() {
  const [userID, setUserID] = useState("");
  const [userPassword, setUserPassword] = useState("");
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
      <Paper elevation={3} className="login-paper">
        <Typography variant="h4" className="login-title">
          Login User
        </Typography>
        <form onSubmit={handleSubmit} className="login-form">
          {errorMessage && <Alert severity="error" className="alert">{errorMessage}</Alert>}
          <TextField
            className="login-input"
            variant="outlined"
            margin="normal"
            label="User ID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
          <TextField
            className="login-input"
            variant="outlined"
            margin="normal"
            label="Password"
            type={passwordShown ? "text" : "password"}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisiblity}>
                    {passwordShown ? <FaEye /> : <FaEyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="login-button"
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </div>
  </>
  );
}
