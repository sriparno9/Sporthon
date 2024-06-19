import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import NavbarGames from "../Navbar Games/NavbarGames";

function ParticipationPage() {
  const [userGames, setUserGames] = useState([]);
  const [sportsFromAPI, setSportsFromAPI] = useState([]);
  const [error, setError] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    fetchUserGames();
    // fetchSportsFromAPI();
  }, []);

  const fetchUserGames = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/team");
      if (!response.ok) {
        throw new Error("Failed to fetch user games");
      }
      console.log(response);
      const data = await response.json();
      const userId = JSON.parse(sessionStorage.getItem("user")).userid;
      const filteredUserGames = data.filter(
        (team) => team.candidateId === parseInt(userId)
      );
      // console.log(filteredUserGames, "filtered");
      setUserGames(filteredUserGames);
      console.log(userGames, "userGames");
      console.log(filteredUserGames[0].game.gameId, "gameId");
      fetchSchedule(
        filteredUserGames[0].game.gameName,
        filteredUserGames[0].teamId
      );
      fetchPlayerDetails(filteredUserGames[0].teamId);
      fetchResults(filteredUserGames[0].teamId);
    } catch (error) {
      setError("Error fetching user games. Please try again later.");
      // console.error('Error fetching user games:', error.message);
    }
  };

  const fetchSchedule = async (gameName, teamId) => {
    const response = await fetch(
      `http://localhost:8082/match/upcomingmatch/${teamId}/${gameName}`
    );
    const data = await response.json();
    setScheduleData(data);
    console.log(data, "schedule");
    console.log(scheduleData, "scheduleData");
  };

  const fetchPlayerDetails = async (teamId) => {
    const response = await fetch(`http://localhost:8085/api/team/${teamId}`);
    const data = await response.json();
    setPlayers(data.players);
    console.log("onclickdata", data.players);
    console.log("onClick", players);
  };

  const fetchResults = async (teamId) => {
    console.log("ismail ", teamId);
    const response = await fetch(
      `http://localhost:8082/match/history/${teamId}`
    );
    const data = await response.json();
    setResults(data);
    console.log("sabya", results);
  };

  const handleGameClick = async (teamId, gameName) => {
    console.log("teamId", teamId);
    fetchPlayerDetails(teamId);
    fetchSchedule(gameName, teamId);
    fetchResults(teamId);
    setSelectedGameId(teamId);
    // navigate(`/participated-games/${gameName.toLowerCase()}`);
  };

  return (
    <>
      <NavbarGames />
      <div className="entire-page">
        <div className="participation-container">
          <div className="game-list">
            <h2 className="game-dashboard">Game Dashboard</h2>
            <ul>
              {userGames.map((sport) => (
                <li
                  key={sport.game.gameId}
                  className={`game-item ${
                    selectedGameId === sport.teamId ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleGameClick(sport.teamId, sport.game.gameName)
                  }
                >
                  {sport.game.gameName}
                </li>
              ))}
            </ul>
          </div>
          <div className="details">
            <h3 className="custom-section-title">Game Details</h3>
            {scheduleData && (
              <div>
                <h2 className="custom-subsection-title">Schedule</h2>
                {scheduleData[0]?.matchDate &&
                scheduleData[0]?.startTime &&
                scheduleData[0]?.endTime ? (
                  <p className="schedule__details">
                    <p>Date: {scheduleData[0]?.matchDate} </p>
                    <p>Start Time: {scheduleData[0]?.startTime} </p>
                    End Time: {scheduleData[0]?.endTime}
                  </p>
                ) : (
                  <p className="schedule__details">
                    Schedule has not been set by admin
                  </p>
                )}
                <br />
                <h2 className="custom-subsection-title">Venue</h2>
                <p className="schedule__details">
                  {scheduleData[0]?.venue ? (
                    <div>
                      {scheduleData[0]?.venue?.venueName}{" "}
                      {scheduleData[0]?.venue?.location}
                    </div>
                  ) : (
                    <p>Venue has not been set by admin</p>
                  )}
                </p>
                <br />
                {players.length > 0 && (
                  <h2 className="custom-subsection-title">Teammates</h2>
                )}

                {players &&
                  players.map((player) => (
                    <div key={player.playerId} className="custom-card">
                      <p className="schedule__details">{player.name}</p>
                    </div>
                  ))}
                <br />
                {results.length > 0 && (
                  <h2 className="custom-subsection-title">Results</h2>
                )}

                {results &&
                  results.map((result, index) => (
                    <div key={result.matchId} className="custom-card">
                      {/* <p className="schedule__details">Round {index + 1}</p> */}
                      <p className="schedule__details">Your result</p>
                      {result.winningTeamId === result.teamId1 ? (
                        <p className="match__win">Win</p>
                      ) : (
                        <p className="match__lose">Lose</p>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
          {/* </main> */}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default ParticipationPage;
