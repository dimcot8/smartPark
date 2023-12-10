import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logoImages from "../assets/logo2.png";
import Notification from "../components/Notification";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchRedirect = () => {
    navigate("/search");
  };
  const [navbarState, setNavbarState] = useState({
    isNavbarActive: false,
    isNotificationActive: false,
    isLoginSuccess: false,
  });

  const toggleNavbar = () => {
    setNavbarState((prevState) => ({
      ...prevState,
      isNavbarActive: !prevState.isNavbarActive,
    }));
  };

  const toggleNotification = () => {
    setNavbarState((prevState) => ({
      ...prevState,
      isNotificationActive: !prevState.isNotificationActive,
    }));
  };

  const { isNavbarActive, isNotificationActive, isLoginSuccess } = navbarState;

  // Check if the current route is either '/login' or '/signup'
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  // Conditionally render the Navbar only if not on the login or signup pages
  if (isLoginPage || isSignupPage) {
    return null;
  }

  const loginLogoutLink = isLoginSuccess ? (
    <Link to="/logout">Logout</Link>
  ) : (
    <Link to="/login">Login</Link>
  );

  const listItems = [
    {
      list: [
        {
          type: isLoginSuccess ? "Logout" : "Login",
          content: isLoginSuccess ? "Logout Successful" : "Login Successful",
        },
      ],
    },
  ];

  return (
    <header>
      <div className="navbar-logo">
        <img src={logoImages} alt="Logo" />
      </div>

      <div className="search-bar">
        <button className="btn search-btn" onClick={handleSearchRedirect}>
          Find your parking spot
        </button>
      </div>

      <div className="not">
        <Notification listItems={listItems} />
      </div>

      <div className={`navbar ${isNavbarActive ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </ul>
      </div>

      <div className="hamburger" onClick={toggleNavbar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </header>
  );
}

export default Navbar;
