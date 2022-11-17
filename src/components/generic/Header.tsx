import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "./utility";

import { ReactComponent as LongLogo } from "../../assets/logos/long.svg";

const Header = () => {
  const {
    accessToken,
    isAdmin,
    setUserId,
    setHasProfile,
    setUserProfile,
    setUserPositions,
    setPositionAssessments,
    setIsAdmin,
  } = useContext(GlobalVariables);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const url = process.env.REACT_APP_API_ENDPOINT + `user/logout`;
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
      setIsAdmin?.(false);

      navigate("/login");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="header">
      <div className="row header__container bebas fs-24">
        <LongLogo
          style={{
            height: "48px",
            width: "193px",
          }}
        />
        <div className="row gap-32 header__navBar__container">
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
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? "selected" : undefined)}
            >
              Admin
            </NavLink>
          )}
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
