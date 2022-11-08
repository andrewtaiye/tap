import React, { useContext, useEffect, useState } from "react";

import { fetchCall } from "../generic/utility";
import GlobalVariables from "../../context/GlobalVariables";
import { ModalState } from "../generic/Modal";

import Summary from "./Summary";
import AssessmentTable from "./AssessmentTable";

interface Props {
  setModal: (state: ModalState) => void;
}

const Main = (props: Props) => {
  const [userPositions, setUserPositions] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [positionAssessments, setPositionAssessments] = useState<string[]>([]);
  const { userId } = useContext(GlobalVariables);

  useEffect(() => {
    (async () => {
      // Position Get API Call
      const url = `http://127.0.0.1:5001/position/get/${userId}`;
      const res = await fetchCall(url);

      if (res.status === "ok") {
        // setUserPositions(res.data)
        console.log(res);
      } else {
        console.error(res);
      }
    })();
  }, [userId]);

  useEffect(() => {
    (async () => {
      // Assessment Get API Call
      const url = `http://127.0.0.1:5001/assessment/get/${userId}/${selectedPosition}`;
      const res = await fetchCall(url);

      if (res.status === "ok") {
        // setUserPositions(res.data)
        console.log(res);
      } else {
        console.error(res);
      }
    })();
  }, [selectedPosition]);

  return (
    <>
      <div className="section__container-light">
        <p className="bebas fs-48 mb-2">Assessments</p>
        <Summary
          userPositions={userPositions}
          setSelectedPosition={setSelectedPosition}
        />
      </div>

      <div className="section__container-dark">
        <AssessmentTable setModal={props.setModal} />
      </div>
    </>
  );
};

export default Main;
