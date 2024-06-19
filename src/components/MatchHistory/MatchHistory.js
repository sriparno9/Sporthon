import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const MatchHistory = () => {
  const { gameId } = useParams();
  const [matchHistory, setMatchHistory] = useState([]);
  const [gameName, setGameName] = useState("");

  useEffect(() => {
    const fetchGameName = async () => {
      try {
        const response = await fetch(
          `http://localhost:8085/api/game/game-id/${gameId}`
        );
        if (response.ok) {
          const data = await response.json();
          setGameName(data.gameName);
        } else {
          console.error("Failed to fetch game name:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching game name:", error);
      }
    };

    fetchGameName();
  }, []);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8082/match/result");
        if (response.ok) {
          const data = await response.json();
          const filteredResults = data.filter(
            (result) => result.matchId.gameName === gameName
          );
          console.log("ghvfjwefrefre", filteredResults);
          setMatchHistory(filteredResults);
        } else {
          console.error("Failed to fetch match history:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching match history:", error);
      }
    };

    if (gameName) {
      fetchMatchHistory();
    }
  }, [gameName]);

  return (
    <div className="h-screen w-[60%] m-auto">
      <h2 className="my-8 font-bold text-3xl text-fourth text-center">
        Match History for {gameName}
      </h2>
      <table className="shadow-2xl border-2 border-gray-200 w-full overflow-hidden">
        <thead className="text-white bg-gray-600">
          <tr>
            <th className="py-3 pr-3">Serial No.</th>
            <th className="py-3">Match ID</th>
            <th className="py-3">Fixture</th>
            <th className="py-3">Winning Team ID</th>
            <th className="py-3">Remarks</th>
          </tr>
        </thead>
        <tbody className="text-cyan-900">
          {matchHistory.map((match, index) => (
            <tr key={match.resultId} className="bg-gray-200">
              <td className="py-3 pl-12">{index + 1}</td>
              <td className="py-3 pl-12">{match.matchId.matchID}</td>
              <td className="py-3 pl-14">{`Team ${match.matchId.teamId1} vs Team ${match.matchId.teamId2}`}</td>
              <td className="py-3 pl-14">Team {match.winningTeamId}</td>
              <td className="py-3 pl-12">{match.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchHistory;
