import React, { useState } from "react";

const AddSport = () => {
  const [sportName, setSportName] = useState("");
  const [type, setType] = useState("");
  const [number, setNumber] = useState("");

  const handleSportName = (e) => {
    const { value } = e.target;
    setSportName(value);
  };

  const handleNumber = (e) => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      game: {
        gameName: sportName,
        gameType: type,
        numberOfPlayers: parseInt(number),
      },
      id: 3,
    };

    try {
      const response = await fetch("http://localhost:8085/api/game-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data posted successfully!");
        setSportName("");
        setType("");
        setNumber("");
      } else {
        console.error("Failed to post data:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="w-[50%] m-auto h-screen overflow-y-hidden">
      <h3 className="my-8  font-bold text-3xl text-fourth text-center">
        Add Sport
      </h3>
      <div className="w-[100%] mt-6">
        <form onSubmit={handleSubmit}>
          <div className="">
            <input
              type="text"
              placeholder="Sport Name"
              value={sportName}
              onChange={handleSportName}
              className="mt-10 font-semibold  border-b-2 border-b-solid border-border w-[100%] text-lg  placeholder:text-xl placeholder:font-medium placeholder:text-black outline-none bg-inherit"
            />
          </div>
          <div>
            <div className="relative mt-10">
              <select
                className="appearance-none w-full   border-b-2 selection:text-black border-solid text-xl font-semibold
                border-border  focus:border-border outline-none  bg-inherit"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="" disabled hidden>
                  Select Type
                </option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
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
          </div>

          <div>
            <input
              type="number"
              placeholder="Number of Players"
              value={number}
              onChange={handleNumber}
              className="mt-12 font-semibold  border-b-2 border-b-solid border-border w-[100%] text-lg  
              placeholder:text-xl placeholder:font-medium placeholder:text-black outline-none bg-inherit"
            />
          </div>
          <div className="flex justify-center m-auto mt-16 w-[70%]">
            <button
              className="bg-button cursor-pointer rounded-full border-button border-solid w-[100%] p-4 
              font-semibold text-lg text-white"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSport;
