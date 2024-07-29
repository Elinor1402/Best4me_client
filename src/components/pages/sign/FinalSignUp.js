import React from "react";
import "./FinalSignUp.css";
import Navbar from "../../navbar/Navbar";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CompanyPic from "../../../images/img-4.jpeg";

//After sign up move to this page , here the admin get the company ID
export default function FinalSignUp() {
  var id = localStorage.getItem("CompanyID");

  return (
    <>
      <Navbar />
      <div className="final-container">
        <Card selected className="Card">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={CompanyPic}
              alt="CompanyPic"
            />
            <CardContent>
              <Typography
                selected
                className="Typography"
                gutterBottom
                variant="h10"
                component="div"
              >
                Before login..
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"2em"}
              >
                Welcome to our site your ID is
              </Typography>
              <Typography variant="h3" color="black">
                {id}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize={"2em"}
              >
                Use it and your password to login
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to="/log-in">
              <Button
                sx={{
                  borderRadius: 10,
                  color: "black",
                  fontSize: "16px",
                  width: "10em",
                  border: "3px solid #48bd1885",
                  marginTop: "6em",
                  marginBottom: "2em",
                }}
              >
                Login
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
