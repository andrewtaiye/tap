/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import { fetchCall } from "../generic/utility";
import GlobalVariables, { UserPositions } from "../../context/GlobalVariables";
import { ModalState } from "../generic/Modal";

import Summary from "./Summary";
import AssessmentTable from "./AssessmentTable";

interface Props {
  setModal: (state: ModalState) => void;
}

const Main = (props: Props) => {
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [positionAssessments, setPositionAssessments] = useState<string[]>([]);
  const { userId, setUserPositions } = useContext(GlobalVariables);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      // Position Get API Call
      const url = `http://127.0.0.1:5001/position/get/${userId}`;
      const res = await fetchCall(url);

      if (res.status !== "ok") {
        console.error(res);
      }

      res.data.sort((a: UserPositions, b: UserPositions) => {
        if (a.position! < b.position!) {
          return -1;
        }
        if (a.position! > b.position!) {
          return 1;
        }
        return 0;
      });

      setUserPositions?.(res.data);
    })();
  }, [userId]);

  useEffect(() => {
    if (!selectedPosition) return;

    (async () => {
      // Assessment Get API Call
      const url = `http://127.0.0.1:5001/assessment/get/${selectedPosition}`;
      const res = await fetchCall(url);

      if (res.status !== "ok") {
        console.error(res);
      }
      // setUserPositions(res.data)
      console.log(res);
    })();
  }, [selectedPosition]);

  return (
    <>
      <div className="section__container-light">
        <p className="bebas fs-48 mb-2">Assessments</p>
        <Summary setSelectedPosition={setSelectedPosition} />
      </div>

      <div className="section__container-dark">
        <AssessmentTable setModal={props.setModal} />
      </div>
    </>
  );
};

export default Main;
