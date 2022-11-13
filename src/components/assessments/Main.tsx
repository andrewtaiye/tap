/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import GlobalVariables, { UserPositions } from "../../context/GlobalVariables";
import { PositionAssessment } from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";
import { ModalState } from "../generic/Modal";

import Summary from "./Summary";
import AssessmentTable from "./AssessmentTable";

interface Props {
  setModal: (state: ModalState) => void;
}

const Main = (props: Props) => {
  const { accessToken, userId, setUserPositions, setPositionAssessments } =
    useContext(GlobalVariables);
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  useEffect(() => {
    if (!userId) return;

    (async () => {
      // Position Get API Call
      const url = process.env.REACT_APP_API_ENDPOINT + `position/get/${userId}`;
      const res = await fetchCall(url, accessToken.current, "GET");

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      if (!res.data) return;

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
      const url =
        process.env.REACT_APP_API_ENDPOINT +
        `assessment/get/${selectedPosition}`;
      const res = await fetchCall(url, accessToken.current, "GET");

      if (res.status !== "ok") {
        console.error(res);
      }

      if (!res.data) {
        setPositionAssessments?.([]);
        return;
      }

      res.data.sort((a: PositionAssessment, b: PositionAssessment) => {
        if (a.date < b.date) {
          return -1;
        }

        if (a.date > b.date) {
          return 1;
        }

        if (a.assessment_number < b.assessment_number) {
          return -1;
        }

        if (a.assessment_number > b.assessment_number) {
          return 1;
        }

        return 0;
      });

      setPositionAssessments?.(res.data);
    })();
  }, [selectedPosition]);

  return (
    <>
      <div className="row section__container-light">
        <div className="container">
          <p className="bebas fs-48 mb-2">Assessments</p>
          <Summary
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
          />
        </div>
      </div>

      {selectedPosition && (
        <div className="row section__container-dark">
          <div className="row container">
            <AssessmentTable
              setModal={props.setModal}
              selectedPosition={selectedPosition}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
