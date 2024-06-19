import React, { useState, useEffect } from "react";

const FixtureDialog = ({
  onClose,
  onSetFixture,
  teamId1,
  teamId2,
  gameName,
  removeSelectedTeams,
}) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venueId, setVenueId] = useState("");
  const [venues, setVenues] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await fetch("http://localhost:8082/match/venue");
      if (response.ok) {
        const data = await response.json();
        setVenues(data);
      } else {
        console.error("Failed to fetch venues:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleSetFixture = async () => {
    if (startTime >= endTime) {
      setErrorMessage("End time must be greater than start time.");
      return;
    } else {
      setErrorMessage("");
    }

    const formattedDate = formatDate(date);

    const fixtureDetails = {
      gameName: gameName,
      teamId1: teamId1,
      teamId2: teamId2,
      matchDate: formattedDate,
      startTime: startTime,
      endTime: endTime,
      venueId: venueId,
    };

    console.log("whjegferf", fixtureDetails);

    try {
      const response = await fetch("http://localhost:8082/match/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fixtureDetails),
      });
      // await onSetFixture(teamId1, teamId2);
      // removeSelectedTeams(teamId1, teamId2);

      if (response.ok) {
        onClose();
      } else {
        console.error("Failed to schedule match:", response.statusText);
      }
    } catch (error) {
      console.error("Error scheduling match:", error);
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-[50%]">
        <h2 className="text-2xl font-bold mb-4 text-center">Set Fixture</h2>

        <div className="mb-4">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-400 rounded-md p-2 ml-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            id="start-time"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border border-gray-400 rounded-md p-2 ml-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            id="end-time"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border border-gray-400 rounded-md p-2 ml-2 w-full"
          />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mb-4">
          <label htmlFor="venue">Venue</label>
          <select
            id="venue"
            className="appearance-none border-b-2 border-solid text-lg font-medium
    focus:border-border outline-none bg-inherit border border-gray-400 rounded-md p-2 ml-2 w-full"
            onChange={(e) => setVenueId(e.target.value)}
            value={venueId}
          >
            <option value="" disabled selected>
              Select a Venue
            </option>
            {venues.map((venue) => (
              <option key={venue.venueID} value={venue.venueID}>
                {venue.venueName} - {venue.location}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center  pointer-events-none">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        <div className="flex justify-evenly">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2 w-[45%]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-[45%]"
            onClick={handleSetFixture}
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixtureDialog;
