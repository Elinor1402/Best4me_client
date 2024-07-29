import React from "react";
import Navbar from "../navbar/Navbar";
import "../../App.css";
import "./HeroSection.css";
import Button from "@material-ui/core/Button";
import LoginIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";

//This is the first page the admin sees.
function HeroSection() {
  return (
    <>
      <Navbar />
      <div className="hero-container">
        <p>What are you waiting for?</p>
        <Link to="/sign-up">
          <Button
            className="signupbtn"
            type="button"
            endIcon={<SendIcon />}
            color="primary"
            variant="contained"
          >
            SIGN UP
          </Button>
        </Link>
        <Link to="/log-in">
          <Button
            className="loginbtn"
            type="button"
            endIcon={<LoginIcon />}
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </Link>
      </div>
    </>
  );
}

export default HeroSection;
