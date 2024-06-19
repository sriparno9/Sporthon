import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MatchSchedule = () => {
  const { gameId } = useParams();
  const [matchSchedule, setMatchSchedule] = useState([]);
  const [gameName, setGameName] = useState("");
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [selectedWinnerTeamId, setSelectedWinnerTeamId] = useState("");
  const [remarks, setRemarks] = useState({});

  useEffect(() => {
    const fetchGameNames = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/game");
        if (response.ok) {
          const data = await response.json();
          const filteredGameNames = data.filter(
            (game) => game.gameId === parseInt(gameId)
          );
          const gameName =
            filteredGameNames.length > 0 ? filteredGameNames[0].gameName : "";
          setGameName(gameName);
        } else {
          console.error("Failed to fetch game names:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching game names:", error);
      }
    };

    fetchGameNames();
  }, [gameId]);

  useEffect(() => {
    const fetchMatchSchedule = async () => {
      try {
        const response = await fetch("http://localhost:8082/match/schedule");
        if (response.ok) {
          const data = await response.json();

          // Fetching match results
          const resultResponse = await fetch(
            "http://localhost:8082/match/result"
          );
          if (!resultResponse.ok) {
            console.error(
              "Failed to fetch match results:",
              resultResponse.statusText
            );
            return;
          }
          const resultData = await resultResponse.json();

          // Filtering out match IDs present in the result data
          const filteredMatchSchedule = data.filter(
            (match) =>
              match.gameName === gameName &&
              !resultData.some(
                (result) => result.matchId.matchID === match.matchID
              )
          );

          const initialRemarks = {};
          filteredMatchSchedule.forEach((match) => {
            initialRemarks[match.matchID] = "";
          });
          setRemarks(initialRemarks);
          setMatchSchedule(filteredMatchSchedule);
        } else {
          console.error("Failed to fetch match schedule:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching match schedule:", error);
      }
    };

    if (gameName) {
      fetchMatchSchedule();
    }
  }, [gameName]);

  const handleWinnerChange = (event, matchID) => {
    const { value } = event.target;
    setSelectedMatchId(matchID);
    setSelectedWinnerTeamId(value);
    setMatchSchedule((prevMatchSchedule) =>
      prevMatchSchedule.map((match) =>
        match.matchID === matchID ? { ...match, winnerTeam: value } : match
      )
    );
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8082/match/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId: selectedMatchId,
          winningTeamId: selectedWinnerTeamId,
          remarks: remarks[selectedMatchId],
        }),
      });
      if (response.ok) {
        console.log("Result saved successfully");
        setRemarks((prevRemarks) => ({
          ...prevRemarks,
          [selectedMatchId]: "",
        }));
        // Remove the saved match from the match schedule
        setMatchSchedule((prevMatchSchedule) =>
          prevMatchSchedule.filter((match) => match.matchID !== selectedMatchId)
        );
      } else {
        console.error("Failed to save result:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  const handleRemarkChange = (event, matchID) => {
    const { value } = event.target;

    setRemarks((prevRemarks) => ({
      ...prevRemarks,
      [matchID]: value,
    }));
  };

  return (
    <div className="h-screen w-[80%] m-auto">
      <h2 className="my-8 font-bold text-3xl text-fourth text-center">
        Match Schedule
      </h2>
      <table className="shadow-2xl border-2 border-gray-200 w-full overflow-hidden">
        <thead className="text-white bg-gray-500">
          <tr>
            <th className="py-3">Sr. No.</th>
            <th className="py-3">Match ID</th>
            <th className="py-3">Fixture</th>
            <th className="py-3">Winner Team</th>
            <th className="py-3">Remarks</th>
          </tr>
        </thead>
        <tbody className="text-grey-600">
          {matchSchedule.map((match, index) => (
            <tr key={match.matchID} className="bg-gray-200">
              <td className="py-3">{index + 1}</td>
              <td className="py-3">{match.matchID}</td>
              <td className="py-3">{`Team ${match.teamId1} vs Team ${match.teamId2}`}</td>
              <td className="py-3">
                <select
                  value={match.winnerTeam || ""}
                  onChange={(e) => handleWinnerChange(e, match.matchID)}
                  className="border-2 border-cyan-500 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-cyan-500"
                >
                  <option value="">
                    Select winner for Match {match.matchID}
                  </option>
                  <option value={match.teamId1}>Team {match.teamId1}</option>
                  <option value={match.teamId2}>Team {match.teamId2}</option>
                </select>
              </td>
              <td className="py-3">
                <input
                  type="text"
                  placeholder="Enter remarks"
                  value={remarks[match.matchID] || ""}
                  onChange={(e) => handleRemarkChange(e, match.matchID)}
                  className="border-2 border-cyan-500 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-cyan-500"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-8">
        <button
          className="bg-button cursor-pointer rounded-full border-button border-solid w-[40%] p-4 font-semibold text-lg text-white hover:scale-105"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MatchSchedule;
