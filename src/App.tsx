/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./styles/styles.css";
import "./styles/utility.css";

import GlobalVariables, {
  UserProfile,
  UserPositions,
} from "./context/GlobalVariables";
import { PositionAssessment } from "./context/GlobalVariables";
import { fetchCall } from "./components/generic/utility";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Assessments from "./pages/Assessments";

const App = () => {
  const [userId, setUserId] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [userPositions, setUserPositions] = useState<UserPositions[]>([]);
  const [positionAssessments, setPositionAssessments] = useState<
    PositionAssessment[]
  >([]);
  const [isInstructor, setIsInstructor] = useState(false);
  const [ranks, setRanks] = useState<string[]>([]);
  const [flights, setFlights] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const url = `http://127.0.0.1:5001/enum`;
      const res = await fetchCall(url);

      if (res.status !== "ok") {
        console.error(res.message);
        return;
      }

      setRanks(res.data.ranks);
      setFlights(res.data.flights);
      setCats(res.data.cats);
      setPositions(res.data.positions);
    })();

    if (!userId) {
      navigate("/login");
      return;
    }

    if (hasProfile === false) {
      navigate("/profile");
      return;
    }
  }, [userId, hasProfile]);

  return (
    <GlobalVariables.Provider
      value={{
        userId,
        hasProfile,
        userProfile,
        userPositions,
        positionAssessments,
        isInstructor,
        ranks,
        flights,
        cats,
        positions,
        setUserId,
        setHasProfile,
        setUserProfile,
        setUserPositions,
        setPositionAssessments,
        setIsInstructor,
      }}
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
