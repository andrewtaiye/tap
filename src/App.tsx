import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./styles/styles.css";
import "./styles/utility.css";

import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="col">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
