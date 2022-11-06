import React, { useState } from "react";
import Display from "./Display";
import Edit from "./Edit";

const Main = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleButtonClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="section__container-light">
      <p className="bebas fs-48 mb-2">Profile</p>

      {isEditing ? (
        <Edit isEditing={isEditing} handleButtonClick={handleButtonClick} />
      ) : (
        <Display isEditing={isEditing} handleButtonClick={handleButtonClick} />
      )}
    </div>
  );
};

export default Main;
