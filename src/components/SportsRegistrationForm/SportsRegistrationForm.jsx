import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SportRegistrationForm.css";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
import NavbarGames from "../Navbar Games/NavbarGames";

const SportsRegistrationForm = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState([]);
  const [nextTeamId, setNextTeamId] = useState(1);
  const [gameDetails, setGameDetails] = useState({
    noOFPlayers: 0,
    isIndividual: 1,
  });
  const [validationErrors, setValidationErrors] = useState([]);

  const candidateId = JSON.parse(sessionStorage.getItem("user")).userid;
  // console.log("bjdhgfswfwrfg", candidateId);
  const gameID = Number(gameId);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/game");
        if (!response.ok) {
          console.error("Server error:", response.status, response.statusText);
          return;
        }
        const gamesData = await response.json();

        const selectedGame = gamesData.find((game) => game.gameId === gameID);

        if (selectedGame) {
          const noOFPlayers = Math.max(selectedGame.numberOfPlayers || 0, 0);
          setGameDetails({
            noOFPlayers,
            isIndividual: noOFPlayers > 0 ? 0 : 1,
          });

          const initialTeamMembers = Array.from(
            { length: noOFPlayers - 1 },
            () => ({
              name: "",
              gender: "",
              email: "",
              phone: "",
            })
          );
          setPlayers(initialTeamMembers);
        } else {
          console.error("Game not found for gameId:", gameId);
        }
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [gameID]);

  const handleInputChange = (index, field, value) => {
    setValidationErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      // Clear the validation error for the corresponding field
      newErrors[index] = { ...newErrors[index], [field]: "" };
      return newErrors;
    });

    setPlayers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value,
      };
      return updatedMembers;
    });
  };

  const validateForm = () => {
    const errors = [];
    if (!teamName.trim()) {
      errors.push({ teamName: "Team Name is required" });
    } else {
      errors.push({ teamName: "" });
    }
    players.forEach((player, index) => {
      if (!player.name.trim()) {
        errors[index] = { ...errors[index], name: "Name is required" };
      } else {
        errors[index] = { ...errors[index], name: "" };
      }
      if (!player.gender.trim()) {
        errors[index] = { ...errors[index], gender: "Gender is required" };
      } else {
        errors[index] = { ...errors[index], gender: "" };
      }
      if (!player.email.trim()) {
        errors[index] = { ...errors[index], email: "Email is required" };
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(player.email)) {
        errors[index] = { ...errors[index], email: "Invalid email format" };
      } else {
        errors[index] = { ...errors[index], email: "" };
      }
      if (!player.phone.trim()) {
        errors[index] = { ...errors[index], phone: "Phone is required" };
      } else if (!/^\d{10}$/.test(player.phone)) {
        errors[index] = {
          ...errors[index],
          phone: "Phone must be 10 digits",
        };
      } else {
        errors[index] = { ...errors[index], phone: "" };
      }
    });
    setValidationErrors(errors);
    return errors.every((error) => Object.values(error).every((msg) => !msg));
  };

  // const validateForm = () => {
  //   const errors = [];
  //   if (!teamName.trim()) {
  //     errors.push({ teamName: "Team Name is required" });
  //   } else {
  //     errors.push({ teamName: "" });
  //   }
  //   players.forEach((player, index) => {
  //     if (!player.name.trim()) {
  //       errors[index] = { ...errors[index], name: "Name is required" };
  //     }
  //     if (!player.gender.trim()) {
  //       errors[index] = { ...errors[index], gender: "Gender is required" };
  //     }
  //     if (!player.email.trim()) {
  //       errors[index] = { ...errors[index], email: "Email is required" };
  //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(player.email)) {
  //       errors[index] = { ...errors[index], email: "Invalid email format" };
  //     }
  //     if (!player.phone.trim()) {
  //       errors[index] = { ...errors[index], phone: "Phone is required" };
  //     } else if (!/^\d+$/.test(player.phone)) {
  //       errors[index] = {
  //         ...errors[index],
  //         phone: "Phone must only contain numbers",
  //       };
  //     }
  //   });
  //   setValidationErrors(errors);
  //   return errors.every((error) => Object.values(error).every((msg) => !msg));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const teamId = nextTeamId;
      setNextTeamId((prevId) => prevId + 1);
      // http://172.20.10.8:8085/api/team-register
      const response = await fetch("http://localhost:8085/api/team-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team: {
            teamId,
            teamName,
            gameId: gameID,
            candidateId,
            players: players.map(({ name, gender, email, phone }) => ({
              name,
              gender,
              email,
              phone,
            })),
          },
        }),
      });

      console.log("sabyaaaa", response);

      if (response.ok) {
        navigate("/");
        console.log("navigate got triggered");
      } else {
        console.error("Team registration failed.");
      }
    } catch (error) {
      console.error("Error posting team registration:", error);
    }
  };

  return (
    <>
      <NavbarGames />
      <div className="background-reg-page">
        <div className="registration-form-container">
          <h1 style={{ fontWeight: "700", fontSize: "30px" }}>
            Team Registration
          </h1>
          <form className="sport-reg-form" onSubmit={handleSubmit}>
            <label>
              Team Name:
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="game-input-field"
              />
            </label>
            {validationErrors.find((error) => error.teamName) && (
              <p className="validation-msg">
                {validationErrors.find((error) => error.teamName).teamName}
              </p>
            )}

            {players.map((member, index) => (
              <div key={index} className="team-member">
                <h3 style={{ fontWeight: "700", fontSize: "20px" }}>
                  Team Member {index + 1} Details
                </h3>
                <label>
                  Name:
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="game-input-field"
                  />
                </label>
                {validationErrors[index]?.name && (
                  <p className="validation-msg">
                    {validationErrors[index].name}
                  </p>
                )}
                <label>
                  Gender:
                  <select
                    value={member.gender}
                    onChange={(e) =>
                      handleInputChange(index, "gender", e.target.value)
                    }
                    className="game-select-field"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                {validationErrors[index]?.gender && (
                  <p className="validation-msg">
                    {validationErrors[index].gender}
                  </p>
                )}
                <label>
                  Email:
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                    className="game-input-field"
                  />
                </label>
                {validationErrors[index]?.email && (
                  <p className="validation-msg">
                    {validationErrors[index].email}
                  </p>
                )}
                <label>
                  Phone Number:
                  <input
                    type="tel"
                    value={member.phone}
                    onChange={(e) =>
                      handleInputChange(index, "phone", e.target.value)
                    }
                    className="game-input-field"
                  />
                </label>
                {validationErrors[index]?.phone && (
                  <p className="validation-msg">
                    {validationErrors[index].phone}
                  </p>
                )}
              </div>
            ))}
            <button className="game-registration-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SportsRegistrationForm;
