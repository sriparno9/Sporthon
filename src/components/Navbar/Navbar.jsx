import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navstyle.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      setIsLoggedIn(!!storedUser);
    };

    checkLoggedInStatus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== isNavbarScrolled) {
        setIsNavbarScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNavbarScrolled]);

  useEffect(() => {
    setIsNavbarFixed(isNavbarScrolled);
  }, [isNavbarScrolled]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    // console.log("user has logged out");
    navigate("/");
    // console.log("code reaches the navigation page");
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const candidateId = storedUser ? storedUser.userid : null;

    const checkUserRegistration = async () => {
      try {
        if (!candidateId) {
          setIsUserRegistered(false);
          return;
        }

        const response = await fetch("http://localhost:8085/api/team");
        if (!response.ok) {
          console.error("Server error:", response.status, response.statusText);
          setIsUserRegistered(false);
          return;
        }

        const teams = await response.json();
        const isRegistered = teams.some(
          (team) => team.candidateId === candidateId
        );
        setIsUserRegistered(isRegistered);
      } catch (error) {
        console.error("Error checking user registration:", error);
        setIsUserRegistered(false);
      }
    };

    checkUserRegistration();
  }, [isLoggedIn]);

  const renderLoginLogoutLink = () => {
    if (isLoggedIn) {
      return (
        <>
          {isUserRegistered && (
            <li className="nav-item">
              <Link to="/participated-games" className="nav-links">
                <strong>Participated Games</strong>
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={handleLogout}>
              <strong>Logout</strong>
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <li className="nav-item">
          <Link to="/login" className="nav-links">
            <strong>Login</strong>
          </Link>
        </li>
      );
    }
  };

  return (
    <nav
      className={`navbar ${isNavbarFixed ? "fixed" : ""} ${
        isNavbarScrolled ? "scrolled" : ""
      }`}
    >
      <div className="navbar-container">
        <Link to="/">
          <a href="/" className="navbar-logo">
            sportathon🏆{" "}
          </a>
        </Link>
        <ul className="nav-menu">
          {location.pathname !== "/participated-games" && (
            <>
              <li className="nav-item">
                <a href="#about" className="nav-links">
                  <strong>About</strong>
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-links">
                  <strong>Contact Us</strong>
                </a>
              </li>
            </>
          )}
          {renderLoginLogoutLink()}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
