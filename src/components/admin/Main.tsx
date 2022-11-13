import React, { useState } from "react";
import Cats from "./Cats";
import Flights from "./Flights";

import NavBar from "./NavBar";
import Positions from "./Positions";
import Ranks from "./Ranks";
import UserPositions from "./UserPositions";
import Users from "./Users";

const Main = () => {
  const [selectedButton, setSelectedButton] = useState("");
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
        {selectedButton === "users" && <Users />}
        {selectedButton === "user-positions" && <UserPositions />}
        {selectedButton === "ranks" && <Ranks />}
        {selectedButton === "positions" && <Positions />}
        {selectedButton === "cats" && <Cats />}
        {selectedButton === "flights" && <Flights />}
      </div>
    </>
  );
};

export default Main;
