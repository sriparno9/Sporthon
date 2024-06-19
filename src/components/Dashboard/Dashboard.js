import React, { useState, useEffect } from "react";
import Card from "../../Card";
// import NavbarAdmin from "../Navbar_Admin/Navbar";

const Dashboard = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/game");
      if (response.ok) {
        const data = await response.json();
        setGames(data);
      } else {
        console.error("Failed to fetch games:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <>
      {/* <NavbarAdmin /> */}
      <div className="w-full mb-10 h-full">
        <h3 className="my-8 font-bold text-3xl text-fourth text-center">
          Dashboard
        </h3>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <Card
                key={game.gameId}
                text={game.gameName}
                image={`./images/${game.gameName.toLowerCase()}.jpeg`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
