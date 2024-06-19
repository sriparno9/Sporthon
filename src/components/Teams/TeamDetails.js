import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TeamDetails = ({ teamId1, teamId2 }) => {
  const { teamId } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (teamId) {
      fetchTeamMembers(teamId);
    }
  }, [teamId]);
  // console.log("efbhuerwgf", teamId);
  const fetchTeamMembers = async (teamId) => {
    try {
      // console.log("efbhuerwgf", teamId);
      const response = await fetch(`http://localhost:8085/api/team/${teamId}`);
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data.players);
      } else {
        console.error("Failed to fetch team members:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  return (
    <div className="h-screen w-[50%] m-auto">
      <h3 className="my-8 font-bold text-3xl text-fourth text-center">
        Team Details
      </h3>
      <table className="shadow-2xl border-2 border-cyan-200 w-full overflow-hidden">
        <thead className="text-white">
          <tr>
            <th className="py-3 bg-sky-800">S.No.</th>
            <th className="py-3 bg-sky-800">Team Members</th>
            <th className="py-3 bg-sky-800">Email Id</th>
          </tr>
        </thead>
        <tbody className="text-sky-900 text-center">
          {teamMembers.map((member, index) => (
            <tr
              key={index}
              className="bg-sky-200 hover:bg-sky-100 hover:scale-105 cursor-pointer duration-300"
            >
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6">{member.name}</td>
              <td className="py-3 px-6">{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <h3 className="mt-16 font-bold text-3xl text-fourth text-center">
        Team Fixtures
      </h3>
      <h3 className="my-4 font-medium text-xl text-button text-center">
        Team {teamId1} VS Team {teamId2} at this time on Ground 1
      </h3> */}
    </div>
  );
};

export default TeamDetails;
