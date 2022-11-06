import React, { useState } from "react";

import Button from "../Button";
import Display from "./Display";
import Edit from "./Edit";
import PositionTable from "./PositionTable";

import { positions } from "../../temp/positionData";
import { profiles } from "../../temp/profileData";

const Main = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleButtonClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="section__container-light">
        <p className="bebas fs-48 mb-2">Profile</p>

        {isEditing ? (
          <Edit
            data={profiles[0]}
            isEditing={isEditing}
            handleButtonClick={handleButtonClick}
          />
        ) : (
          <Display
            data={profiles[0]}
            isEditing={isEditing}
            handleButtonClick={handleButtonClick}
          />
        )}
      </div>
      <div className="section__container-dark">
        <PositionTable data={positions} />
      </div>
      {isEditing && (
        <div className="section__container-light col">
          <Button mode="outline" type="button" className="button__delete fs-24">
            Delete User
          </Button>
        </div>
      )}
    </>
  );
};

export default Main;
