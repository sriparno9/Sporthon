import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Contact from "../Contact/Contact";
import About from "../About/About";
import videoFile from "../../assets/giff.mp4";
import GameCard from "../GameCard/GameCard";
import ImageSlider from "../ImageSlider/ImageSlider";
import "./homestyle.css";

function Homepage() {
  const sports = ["Football", "Basketball", "Tennis", "Cricket", "Swimming"];
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games data from http://localhost:3001/games
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/game");
        const data = await response.json();
        setGames(data);
        // console.log("afrgfebv" , data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <video autoPlay muted loop className="video">
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h2 className="text-overload">
          "Unleash Your Inner Athlete: Join HCL's Sporthaton and Experience the
          Thrill of Sports!"
        </h2>
        {/* <button className='reg-button'>Register</button> */}
      </div>

      {/* <Sports sports={sports} /> */}
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginTop: "20px" }}>
        <b> Offered Sports</b>
        <hr
          style={{
            marginLeft: "36rem",
            marginRight: "35rem",
            color: "black",
            textDecorationThickness: "90px",
          }}
        />
      </h1>
      <div style={{ marginLeft: "4rem" }}>
        <GameCard games={games} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <About />
      </div>
      <div>
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
          <b> Image Gallery </b>
        </h1>
        <ImageSlider />
      </div>
      <br />
      <br />
      <br />
      <Contact />
    </div>
  );
}

export default Homepage;
