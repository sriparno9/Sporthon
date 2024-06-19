import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUpIcon, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { MdOutlineSports } from "react-icons/md";

const Sidebar = ({ expanded, setExpanded }) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [active, setActive] = useState();
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/game");
      if (response.ok) {
        const data = await response.json();
        setSports(data);
      } else {
        console.error("Failed to fetch sports:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  return (
    <div className="">
      <nav className="h-[1000px] inline-flex flex-col bg-blue-400">
        {/* <nav className="h-[1000px] inline-flex flex-col bg-gradient-to-b from-purple-600 via-purple-500 to-blue-500"> */}
        <div className="items-center w-[50%] m-auto mt-5">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            className="w-16 rounded-full"
          />
          {expanded && <p className="text-md text-white mt-1">Admin</p>}
        </div>

        <ul className="flex-1 px-2 mt-4 ml-3">
          <li
            className={` relative flex items-center py-1 px-3 my-4 font-medium rounded-md cursor-pointer transition-colors group ${
              activeIndex === 0
                ? "bg-gradient-to-tr from-third to-secondary text-indigo-800"
                : "hover:bg-secondary text-white"
            }`}
            onClick={() => setActiveIndex(0)}
          >
            <Newspaper size={25} />
            <Link
              className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
              to="/admin/addsport"
            >
              Create Event
            </Link>
            {!expanded && (
              <div
                className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-gradient-to-tr from-red-400 to-red-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
              >
                Create Event
              </div>
            )}
          </li>
          <li
            className={` relative items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              activeIndex === 1
                ? "bg-gradient-to-tr from-third to-secondary text-indigo-800"
                : "hover:bg-secondary text-white"
            }`}
            onClick={() => setActiveIndex(1)}
          >
            <div className="flex justify-between">
              <MdOutlineSports size={25} />
              <span
                className={`overflow-hidden transition-all ${
                  expanded ? "w-52 ml-3" : "w-0"
                }`}
                onClick={() => setOpen((curr) => !curr)}
              >
                All Sports
              </span>
              {!expanded && (
                <div
                  className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-gradient-to-tr from-red-400 to-red-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                >
                  All Sports
                </div>
              )}
              {open === true ? (
                <ChevronUpIcon
                  onClick={() => setOpen((curr) => !curr)}
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-8" : "w-0"
                  }`}
                />
              ) : (
                <ChevronDown
                  onClick={() => setOpen((curr) => !curr)}
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-8" : "w-0"
                  }`}
                />
              )}
            </div>
          </li>

          {open &&
            expanded &&
            sports.map((sport) => (
              <li
                key={sport.gameId}
                className={` relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                  active === sport.gameId
                    ? "bg-gradient-to-tr from-third to-secondary text-indigo-800"
                    : "hover:bg-secondary text-white"
                }`}
                onClick={() => {
                  setActive(sport.gameId);
                  setActiveIndex(null);
                }}
              >
                <Link
                  to={`/admin/sport/${sport.gameId}`}
                  className={`overflow-hidden ${
                    expanded ? "w-52 ml-3" : "w-0"
                  } transition-all`}
                >
                  {sport.gameName}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
