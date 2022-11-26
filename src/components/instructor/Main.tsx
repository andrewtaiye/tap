import React, { useState } from "react";

import NavBar from "./NavBar";
import Overview from "./Overview";
import Positions from "./Positions";
import Personnel from "./Personnel";

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

      {selectedButton === "overview" && <Overview />}
      {selectedButton === "personnel" && <Personnel />}
      {selectedButton === "positions" && <Positions />}
    </>
  );
};

export default Main;
