import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import "../../App.css";
import "./HeroSection.css";
import Button from "@material-ui/core/Button";
import LoginIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Paper } from "@mui/material";

import homeImg from "../../images/img-4.jpeg";
import stockImg from "../../images/img-6.jpg";
import investImg from "../../images/img-7.jpeg";
import investImg2 from "../../images/img-8.png";
import graphsImg from "../../images/img-9.png";
import bplanImg from "../../images/img-3.jpg";
import graphsImg2 from "../../images/img-2.jpg";

//This is the first page the admin sees.
function HeroSection() {
  const items = [
    {
      image: homeImg, // Local image reference
      placeholder: "https://via.placeholder.com/300x200?text=Placeholder+Image", // Placeholder image
    },
    {
      image: stockImg,
      placeholder: "https://via.placeholder.com/300x200?text=Image+2",
    },
    {
      image: investImg,
      placeholder: "https://via.placeholder.com/300x200?text=Image+3",
    },
    {
      image: investImg2,
      placeholder: "https://via.placeholder.com/300x200?text=Image+4",
    },
    {
      image: graphsImg,
      placeholder: "https://via.placeholder.com/300x200?text=Image+5",
    },
    {
      image: bplanImg,
      placeholder: "https://via.placeholder.com/300x200?text=Image+6",
    },
    {
      image: graphsImg2,
      placeholder: "https://via.placeholder.com/300x200?text=Image+7",
    },
    // Add more items as needed
  ];

  // State to keep track of the index of the first image being shown
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Automatically move to the next image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);


  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const visibleItems = items
    //if instead of 7 put 5 will crate space between the images
    .concat(items) // Duplicate the items array to simulate infinite scrolling
    .slice(index, index + 7);


  return (
    <>
      <Navbar />
      <Box className="hero-container">

        <Box className="carousel-container">
          <Carousel
            className="carousel"
            autoPlay={false}
            indicators={false}
            navButtonsAlwaysVisible={true}
            animation="slide"
            navButtonsProps={{
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 0,
              }
            }}
            // onChange={handleNext}  // Handle next slide
            next={handleNext}  // Handle next slide
            prev={handlePrev}  // Handle previous slide
          >
            <CarouselItem items={visibleItems} />
          </Carousel>
        </Box>
        <Box className="hero-box">
          <Card className="hero-card">
            <CardContent>
              <Typography variant="h5" component="div" className="headerM" gutterBottom>
                And what is the best system for you?
              </Typography>
              <Box className="button-container">
                <Link to="/sign-up" className="link">
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
                <Link to="/log-in" className="link">
                  <Button
                    className="loginbtnH"
                    type="button"
                    endIcon={<LoginIcon />}
                    color="primary"
                    variant="contained"
                  >
                    Login
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* </div> */}
    </>
  );
}

function CarouselItem({ items }) {
  return (
    <Paper className="carousel-item">
      <div className="image-container">
        {items.map((item, index) => (
          <img
            key={index}
            src={item.image}
            alt={`Carousel item ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>
    </Paper>
  );
}
export default HeroSection;
