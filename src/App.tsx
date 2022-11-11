/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

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

export interface LoginToken {
  exp: number;
  hasProfile: boolean;
  iat: number;
  jti: string;
  userId: string;
}

const App = () => {
  const [accessToken, setAccessToken] = useState("");
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
      const url = `http://127.0.0.1:5001/misc/enum`;
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

    (async () => {
      if (localStorage.refreshToken) {
        const url = `http://127.0.0.1:5001/misc/refresh`;
        const body = { refresh: localStorage.refreshToken };
        const res = await fetchCall(url, "", "POST", body);

        if (res.status !== "ok") return;

        setAccessToken(res.data.access);
        const decoded: LoginToken = jwt_decode(res.data.access);

        console.log(decoded);
        setUserId?.(decoded.userId);
        setHasProfile?.(decoded.hasProfile);
        navigate("/assessments");
        return;
      }
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
        accessToken,
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
        setAccessToken,
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
