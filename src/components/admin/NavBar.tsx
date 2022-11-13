import React from "react";

import Button from "../generic/Button";

interface Props {
  selectedButton: string;
  toggleNavButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NavBar = (props: Props) => {
  return (
    <div className="row admin__navBar justify-sb px-8">
      <div className="row admin__navBar__container alignSelf-end">
        <Button
          mode="nav"
          type="button"
          className={`fs-24${
            props.selectedButton === "users" ? " selected" : ""
          }`}
          onClick={props.toggleNavButton}
          name="users"
        >
          Users
        </Button>
        <Button
          mode="nav"
          type="button"
          className={`fs-24${
            props.selectedButton === "user-positions" ? " selected" : ""
          }`}
          onClick={props.toggleNavButton}
          name="user-positions"
        >
          User Positions
        </Button>
        <Button
          mode="nav"
          type="button"
          className={`fs-24${
            props.selectedButton === "ranks" ? " selected" : ""
          }`}
          onClick={props.toggleNavButton}
          name="ranks"
        >
          Ranks
        </Button>
        <Button
          mode="nav"
          type="button"
          className={`fs-24${
            props.selectedButton === "positions" ? " selected" : ""
          }`}
          onClick={props.toggleNavButton}
          name="positions"
        >
          Positions
        </Button>
        <Button
          mode="nav"
          type="button"
          className={`fs-24${
            props.selectedButton === "cats" ? " selected" : ""
          }`}
          onClick={props.toggleNavButton}
          name="cats"
        >
          CATs
        </Button>
        <Button
          mode="nav"
          type="button"
          className={`fs-24${
            props.selectedButton === "flights" ? " selected" : ""
          }`}
          onClick={props.toggleNavButton}
          name="flights"
        >
          Flights
        </Button>
      </div>
      <div>
        <p className="bebas fs-48">Admin Panel</p>
      </div>
    </div>
  );
};

export default NavBar;
