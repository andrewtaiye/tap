import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { ReactComponent as LongLogo } from "../assets/logos/long.svg";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
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
