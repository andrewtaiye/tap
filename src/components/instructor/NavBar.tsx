import React from "react";

import Button from "../generic/Button";

interface Props {
  selectedButton: string;
  toggleNavButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NavBar = (props: Props) => {
  return (
    <div className="row container justify-sb">
      <div className="row admin__navBar__container alignSelf-end">
        <Button
          mode="nav"
          type="button"
          className={`fs-24${
            props.selectedButton === "overview" ? " selected" : ""
          }`}
          onClick={props.toggleNavButton}
          name="overview"
        >
          Overview
        </Button>
        <Button
          mode="nav"
          type="button"
          className={`fs-24${
            props.selectedButton === "trainees" ? " selected" : ""
          }`}
          onClick={props.toggleNavButton}
          name="trainees"
        >
          Trainees
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
      </div>
      <div>
        <p className="bebas fs-48">Instructor Panel</p>
      </div>
    </div>
  );
};

export default NavBar;
