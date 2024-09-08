import React , { useState, useEffect } from 'react';
import '../../../App.css';
import HeroSection from '../../herosection/HeroSection';



function Home() {

  useEffect(() => {
    localStorage.removeItem('token');
  });

  return (
    <>
      <HeroSection />
    </>
  );
}

export default Home;