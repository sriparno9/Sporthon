import { CircleUserRound, Menu } from "lucide-react";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const NavbarAdmin = ({ expanded, setExpanded }) => {
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setAuthenticated(false);
    navigate("/login");
    console.log("reachedddddd");
  };

  return (
    <nav className="w-full bg-blue-400 h-20 flex ">
      {expanded ? (
        <MdClose size={40} onClick={handleExpand} className="mt-6 w-[8%] " />
      ) : (
        <Menu size={40} onClick={handleExpand} className="mt-6 w-[8%]" />
      )}
      <div className="flex justify-between w-[90%]">
        <a
          href="/admin"
          className="mt-6 font-bold text-white text-3xl no-underline"
        >
          sportathon🏆
        </a>
        <div className="flex justify-around items-center p-3">
          <ul className="flex mr-12">
            <li className="text-white  text-lg cursor-pointer font-sans hover:font-bold hover:text-xl">
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
