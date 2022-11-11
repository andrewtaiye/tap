import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "./utility";

import { ReactComponent as LongLogo } from "../../assets/logos/long.svg";

const Header = () => {
  const {
    accessToken,
    setUserId,
    setHasProfile,
    setUserProfile,
    setUserPositions,
    setPositionAssessments,
  } = useContext(GlobalVariables);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const url = `http://127.0.0.1:5001/user/logout`;
      const res = await fetchCall(url, accessToken.current, "POST");

      if (res.status !== "ok") {
        console.log(res.message);
        return;
      }

      localStorage.removeItem("refreshToken");
      setUserId?.("");
      setHasProfile?.(false);
      setUserProfile?.({});
      setUserPositions?.([]);
      setPositionAssessments?.([]);
      navigate("/login");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="header">
      <div className="row header__container bebas fs-24">
        <LongLogo style={{ height: "48px", width: "193px" }} />
        <div className="row gap-32 navBar__container">
          <NavLink
            to="/assessments"
            className={({ isActive }) => (isActive ? "selected" : undefined)}
          >
            Assessments
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "selected" : undefined)}
          >
            Profile
          </NavLink>
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
