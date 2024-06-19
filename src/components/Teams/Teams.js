import React, { useState, useEffect } from "react";
import FixtureDialog from "../../FixtureDialog/FixtureDialog";
import { useNavigate, useParams } from "react-router-dom";

const Teams = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [gameName, setGameName] = useState("");
  const [matchSchedule, setMatchSchedule] = useState([]);

  const removeSelectedTeams = (teamId1, teamId2) => {
    setSelectedTeams((prevTeams) =>
      prevTeams.filter(
        (team) => team.teamId !== teamId1 && team.teamId !== teamId2
      )
    );
  };

  const handleSetFixture = (teamId1, teamId2) => {
    removeSelectedTeams(teamId1, teamId2);
  };

  useEffect(() => {
    fetchTeamData();
    fetchMatchSchedule();
  }, [gameId]);

  const fetchTeamData = async () => {
    try {
      // Fetch team data along with the game name using game id
      const response = await fetch(
        `http://localhost:8085/api/team/game/${gameId}`
      );
      if (response.ok) {
        const data = await response.json();
        setTeamData(data);
        if (data.length > 0) {
          setGameName(data[0].game.gameName);
        }
      } else {
        console.error("Failed to fetch team data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  const fetchMatchSchedule = async () => {
    try {
      const response = await fetch("http://localhost:8082/match/schedule");
      if (response.ok) {
        const data = await response.json();
        setMatchSchedule(data);
      } else {
        console.error("Failed to fetch match schedule:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching match schedule:", error);
    }
  };

  const handleToggleSelection = (teamId) => {
    const index = selectedTeams.indexOf(teamId);
    if (index === -1) {
      setSelectedTeams([...selectedTeams, teamId]);
    } else {
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    }
  };

  const handleFixture = () => {
    if (selectedTeams.length === 2) {
      setShowDialog(true);
      console.log("Fixture is set for teams:", selectedTeams);
    } else {
      console.log("Please select exactly two teams.");
    }
  };

  const handleClickTeamDetails = (teamId) => {
    navigate(`/admin/sport/${gameId}/teams/team/${teamId}`);
  };

  // Filter out teams that are not present in the match schedule
  const filteredTeamData = teamData.filter((team) => {
    return !matchSchedule.some(
      (match) => match.teamId1 === team.teamId || match.teamId2 === team.teamId
    );
  });

  return (
    <div className="h-screen w-[50%] m-auto">
      <h3 className="my-8  font-bold text-3xl text-fourth text-center">
        Teams
      </h3>
      <table className="shadow-2xl border-2 border-gray-200 w-full overflow-hidden">
        <thead className="text-white">
          <tr>
            <th className="py-3 bg-gray-600">S.No.</th>
            <th className="py-3 bg-gray-600">Select</th>
            <th className="py-3 bg-gray-600">Team ID</th>
            <th className="py-3 bg-gray-600">Team Name</th>
          </tr>
        </thead>
        <tbody className="text-cyan-900 text-center">
          {filteredTeamData.map((team, index) => (
            <tr
              key={team.teamId}
              className="bg-gray-200 hover:bg-gray-100 hover:scale-105 cursor-pointer duration-300"
            >
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6">
                <input
                  type="checkbox"
                  onChange={() => handleToggleSelection(team.teamId)}
                  checked={selectedTeams.includes(team.teamId)}
                />
              </td>
              <td className="py-3 px-6">{team.teamId}</td>
              <td
                onClick={() => handleClickTeamDetails(team.teamId)}
                className="py-3 px-6"
              >
                {team.teamName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center m-auto mt-16 w-[70%]">
        <button
          className="bg-button cursor-pointer rounded-full border-button border-solid w-[100%] p-4 
              font-semibold text-lg text-white hover:scale-105"
          onClick={handleFixture}
        >
          Set Match Schedule
        </button>
      </div>
      {showDialog && (
        <FixtureDialog
          onClose={() => setShowDialog(false)}
          onSetFixture={handleSetFixture}
          teamId1={selectedTeams[0]}
          teamId2={selectedTeams[1]}
          gameName={gameName}
          removeSelectedTeams={removeSelectedTeams}
        />
      )}
    </div>
  );
};

export default Teams;
