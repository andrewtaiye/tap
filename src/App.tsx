/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
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
import Admin from "./pages/Admin";
import Instructor from "./pages/Instructor";

export interface LoginToken {
  exp: number;
  hasProfile: boolean;
  iat: number;
  jti: string;
  userId: string;
  is_admin: boolean;
  is_instructor: boolean;
}

const App = () => {
  const accessToken = useRef("");
  const [userId, setUserId] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [userPositions, setUserPositions] = useState<UserPositions[]>([]);
  const [positionAssessments, setPositionAssessments] = useState<
    PositionAssessment[]
  >([]);
  const [isInstructor, setIsInstructor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ranks, setRanks] = useState<string[]>([]);
  const [flights, setFlights] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const url = process.env.REACT_APP_API_ENDPOINT + `misc/enum`;
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
        const url = process.env.REACT_APP_API_ENDPOINT + `misc/refresh`;
        const body = { refresh: localStorage.refreshToken };
        const res = await fetchCall(url, "", "POST", body);

        if (res.status !== "ok") return;

        accessToken.current = res.data.access;
        const decoded: LoginToken = jwt_decode(res.data.access);

        setUserId(decoded.userId);
        setHasProfile(decoded.hasProfile);
        setIsAdmin(decoded.is_admin);
        setIsInstructor(decoded.is_instructor);
        navigate("/");
        return;
      }
    })();
  }, []);

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
        isAdmin,
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
        setIsAdmin,
        setRanks,
        setFlights,
        setPositions,
        setCats,
      }}
    >
      <div className="col">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={userId ? "/assessments" : "/login"} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/instructor" element={<Instructor />} />
        </Routes>
      </div>
    </GlobalVariables.Provider>
  );
};

export default App;
