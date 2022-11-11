import React, { useContext } from "react";

import GlobalVariables from "../../context/GlobalVariables";

import Button from "../generic/Button";

interface Props {
  setSelectedPosition: (position: string) => void;
}

const Summary = (props: Props) => {
  const { userPositions } = useContext(GlobalVariables);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSelectedPosition(event.target.value);
  };

  return (
    <>
      <p className="fs-24 mb-2">
        Select a position to view past assessments, or add a new position
      </p>
      <select
        className="fs-24 py-1 mb-2"
        style={{
          width: "500px",
          textAlign: "center",
          appearance: "none",
        }}
        defaultValue="default"
        onChange={handleSelectChange}
      >
        <option value="default" disabled>
          - Select Position -
        </option>
        {userPositions?.map((element, index) => {
          return (
            <option value={element.id} key={index}>
              {element.position}
            </option>
          );
        })}
      </select>
      <div className="col">
        <Button mode="outline" type="button" className="fs-24">
          New Position
        </Button>
        <div
          className="row mt-2"
          style={{
            width: "700px",
            height: "400px",
            border: "1px solid rgb(var(--black))",
          }}
        >
          Assessment Grade Chart
        </div>
      </div>
    </>
  );
};

export default Summary;
