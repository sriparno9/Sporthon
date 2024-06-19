import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './NavbarGames.css';

function NavbarGames() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      setIsLoggedIn(!!storedUser);
    };

    checkLoggedInStatus();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="navbarrr">
        <div className="navbarrr-container">
        <Link to="/">
          <a href="/" className="navbar-logo">
            sportathon🏆{" "}
          </a>
        </Link>

          <li className="navvv-items">
            <Link to="/login" onClick={handleLogout}>
              <strong>Logout</strong>
            </Link>
          </li>
        </div>
      </nav>
    </>
  );
}
export default NavbarGames;