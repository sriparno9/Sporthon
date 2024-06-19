import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import SportRegistrationForm from "./components/SportsRegistrationForm/SportsRegistrationForm";
import Homepage from "./components/HomePage/HomePage";
import ParticipatedGames from "./components/PartcipatedGames/ParticipatedGames";
import Dashboard from "./components/Dashboard/Dashboard";
import About from "./components/About/About";
import AddSport from "./components/Add Sport/AddSport";
import Sport from "./components/Sport/Sport";
import Teams from "./components/Teams/Teams";
import TeamDetails from "./components/Teams/TeamDetails";
import PointsTable from "./components/PointsTable/PointsTable";
import MatchHistory from "./components/MatchHistory/MatchHistory";
import NavbarAdmin from './components/Navbar_Admin/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sportRegister/:gameId" element={<SportRegistrationForm />} />
      <Route path="/participated-games" element={<ParticipatedGames />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/admin/*" element={<AdminRoutes expanded={expanded} setExpanded={setExpanded} />} />
    </Routes>
  );
}

function AdminRoutes({ expanded, setExpanded }) {
  return (
    <div>
      <NavbarAdmin expanded={expanded} setExpanded={setExpanded} />
      <div className='flex h-[100%]'>
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/addsport" element={<AddSport />} />
          <Route path="/sport/:gameId" element={<Sport />} />
          <Route path="/sport/:gameId/teams" element={<Teams />} />
          <Route path="/sport/:gameId/teams/team/:teamId" element={<TeamDetails />} />
          <Route path="/sport/:gameId/match-decision" element={<PointsTable />} />
          <Route path="/sport/:gameId/match-history" element={<MatchHistory />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
