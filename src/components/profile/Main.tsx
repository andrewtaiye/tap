import React, { useState } from "react";
import Button from "../Button";
import Display from "./Display";
import Edit from "./Edit";
import PositionTable from "./PositionTable";

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
          <Edit isEditing={isEditing} handleButtonClick={handleButtonClick} />
        ) : (
          <Display
            isEditing={isEditing}
            handleButtonClick={handleButtonClick}
          />
        )}
      </div>
      <div className="section__container-dark">
        <PositionTable />
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
