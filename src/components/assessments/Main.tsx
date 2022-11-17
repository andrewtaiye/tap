/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import GlobalVariables, { UserPositions } from "../../context/GlobalVariables";
import { PositionAssessment } from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";
import { ModalState } from "../generic/Modal";

import Summary from "./Summary";
import AssessmentTable from "./AssessmentTable";

interface Props {
  setAssessmentModal: (state: ModalState) => void;
  setPositionModal: (state: ModalState) => void;
}

const Main = (props: Props) => {
  const { accessToken, userId, setUserPositions, setPositionAssessments } =
    useContext(GlobalVariables);
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  useEffect(() => {
    if (!userId) return;

    (async () => {
      // Position Get API Call
      const url =
        process.env.REACT_APP_API_ENDPOINT + `user_position/get/${userId}`;
      let res = await fetchCall(url, accessToken.current);

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      if (!res.data) return;

      res.data.positions.sort((a: UserPositions, b: UserPositions) => {
        if (a.position! < b.position!) {
          return -1;
        }
        if (a.position! > b.position!) {
          return 1;
        }
        return 0;
      });

      setUserPositions?.(res.data.positions);
    })();
  }, [userId]);

  useEffect(() => {
    if (!selectedPosition) return;

    (async () => {
      // Assessment Get API Call
      const url =
        process.env.REACT_APP_API_ENDPOINT +
        `assessment/get/${selectedPosition}`;
      let res = await fetchCall(url, accessToken.current);

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
      }

      if (!res.data) {
        setPositionAssessments?.([]);
        return;
      }

      res.data.assessments.sort(
        (a: PositionAssessment, b: PositionAssessment) => {
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
        }
      );

      setPositionAssessments?.(res.data.assessments);
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
            setModal={props.setPositionModal}
          />
        </div>
      </div>

      {selectedPosition && (
        <div className="row section__container-dark">
          <div className="row container">
            <AssessmentTable
              setModal={props.setAssessmentModal}
              selectedPosition={selectedPosition}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
