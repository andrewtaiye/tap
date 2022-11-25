import React, { useState } from "react";

import NavBar from "./NavBar";
import Users from "./Users";
import UserPositions from "./UserPositions";
import Ranks from "./Ranks";
import Positions from "./Positions";
import Flights from "./Flights";
import Cats from "./Cats";

const Main = () => {
  const [selectedButton, setSelectedButton] = useState("users");
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
