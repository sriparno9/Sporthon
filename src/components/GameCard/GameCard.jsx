import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GameCard.css";

const GameCard = ({ games }) => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const candidateId = storedUser ? storedUser.userid : null;

  const [userRegistrations, setUserRegistrations] = useState({});
  const [registerClicked, setRegisterClicked] = useState(false);

  useEffect(() => {
    const checkUserRegistration = async (gameId) => {
      try {
        if (!candidateId) {
          console.error("User ID is null.");
          return false;
        }

        const response = await fetch("http://localhost:8085/api/team");
        if (!response.ok) {
          console.error("Server error:", response.status, response.statusText);
          return false;
        }

        const teams = await response.json();

        // const x = teams.some(
        //   (team) => team.candidateId === candidateId && team.game.gameId === gameId
        // );
        // console.log("checkinggggg", x);

        return teams.some(
          (team) => team.candidateId === candidateId && team.game.gameId === gameId
        );
      } catch (error) {
        console.error("Error checking user registration:", error);
        return false;
      }
    };

    const checkUserRegistrationForGames = async () => {
      const registrations = {};
      // console.log("hatjaa", games);
      for (const game of games) {
        const isRegistered = await checkUserRegistration(game.gameId);
        registrations[game.gameId] = isRegistered;
      }

      setUserRegistrations(registrations);
    };

    checkUserRegistrationForGames();
  }, [candidateId, games]);

  const handleRegisterClick = async (gameId) => {
    setRegisterClicked(true);

    if (!candidateId) {
      navigate("/login");
    } else {
      console.log(`Registering for game with ID ${gameId}`);

      navigate(`/sportRegister/${gameId}`);
    }
  };

  if (!games || games.length === 0) {
    return <div>No games available</div>;
  }

  return (
    <div className="game-cards-container">
      {games.map((game) => (
        <div key={game.gameId} className="game-card">
          <h2 className="game_name">{game.gameName}</h2>
          <p className="game-description">
            <b>Game Type:</b> {game.gameType}
          </p>
          <p className="game-description">
            Team members required: {game.numberOfPlayers}
          </p>
          {userRegistrations[game.gameId] ? (
            <p className="registration-message">Already Registered!</p>
          ) : (
            <button
              className="register-button-game"
              onClick={() => handleRegisterClick(game.gameId)}
            >
              Register
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default GameCard;
