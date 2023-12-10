// src/components/AboutPage.js
import React from 'react';
import '../styles/AboutPage.css'; // Create this CSS file to style your page
import logoImage from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
const AboutPage = () => {
    const navigate = useNavigate();
  
    const navigateToAbout = () => {
      navigate('/about');
    };
  
    const goBack = () => {
      navigate(-1);
    };
  return (
    <section>
      <div className="register">
    <div className="about-container">
    <div className="navigation-contai">
    <button onClick={goBack} className="go-back-button">
          ← Go Back
        </button>
        <br></br>
      </div>
    <img src={logoImage} alt="SmartPark Logo" className="aboutlogo" />
      <div className="content-container">
        <h1>Welcome to SmartPark</h1>
        <p>
          SmartPark is a revolutionary parking management system that aims to transform traditional parking operations
          using advanced technologies. Our cutting-edge solution leverages Internet of Things (IoT) and cloud computing
          to streamline parking processes, enhance customer experiences, optimize resource utilization, and generate new
          revenue streams.
        </p>
        <p>
          With SmartPark, we strive to revolutionize the way parking is managed in downtown areas, reducing congestion,
          improving convenience, and providing stress-free parking experiences for car owners.
        </p>
      </div>
    </div>
    </div>
    </section>
  );
};

export default AboutPage;
