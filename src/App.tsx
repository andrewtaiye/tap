import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/styles.css";
import "./styles/utility.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Assessments from "./pages/Assessments";
import Modal from "./components/generic/Modal";

const App = () => {
  const [userId, setUserId] = useState(1);
  const [hasProfile, setHasProfile] = useState(true);

  return (
    <div className="col">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route
          path="/profile"
          element={<Profile userId={userId} hasProfile={hasProfile} />}
        />
      </Routes>
    </div>
  );
};

export default App;
