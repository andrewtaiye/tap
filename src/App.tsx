/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./styles/styles.css";
import "./styles/utility.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Assessments from "./pages/Assessments";

import GlobalVariables from "./context/GlobalVariables";

const App = () => {
  const [userId, setUserId] = useState(0);
  const [hasProfile, setHasProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === 0) {
      navigate("/login");
      return;
    }
    if (hasProfile === false) {
      navigate("/profile");
      return;
    }
  }, []);

  return (
    <GlobalVariables.Provider
      value={{ userId, setUserId, hasProfile, setHasProfile }}
    >
      <div className="col">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </GlobalVariables.Provider>
  );
};

export default App;
