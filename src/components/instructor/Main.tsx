import React, { useState } from "react";

import NavBar from "./NavBar";
import Overview from "./Overview";
import Positions from "./Positions";
import Trainees from "./Trainees";

const Main = () => {
  const [selectedButton, setSelectedButton] = useState("overview");
  const toggleNavButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedButton(event.currentTarget.name);
  };

  return (
    <>
      <div className="row section__container-darker pb-0">
        <NavBar
          selectedButton={selectedButton}
          toggleNavButton={toggleNavButton}
        />
      </div>
      <div className="section__container-light">
        {selectedButton === "overview" && <Overview />}
        {selectedButton === "trainees" && <Trainees />}
        {selectedButton === "positions" && <Positions />}
      </div>
    </>
  );
};

export default Main;
