/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import GlobalVariables, { UserPosition } from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";
import { ModalState } from "../generic/Modal";

import Summary from "./Summary";
import AssessmentTable from "./AssessmentTable";

interface Props {
  setAssessmentModal: (state: ModalState) => void;
  setPositionModal: (state: ModalState) => void;
}

export interface Scenario {
  scenario_number: number;
  requirement: number;
  fulfilled: number;
  live_requirement: number;
  live_fulfilled: number;
}

export interface ScenarioCount {
  requirement: number;
  fulfilled: number;
}

const Main = (props: Props) => {
  const {
    accessToken,
    userId,
    positionAssessments,
    setUserPositions,
    setPositionAssessments,
  } = useContext(GlobalVariables);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [beginnerScenarios, setBeginnerScenarios] = useState<Scenario[]>([]);
  const [intermediateScenarios, setIntermediateScenarios] = useState<
    Scenario[]
  >([]);
  const [advancedScenarios, setAdvancedScenarios] = useState<Scenario[]>([]);
  const [scenarioCompletion, setScenarioCompletion] = useState<ScenarioCount>({
    requirement: 0,
    fulfilled: 0,
  });

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

      res.data.positions.sort((a: UserPosition, b: UserPosition) => {
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

      setPositionAssessments?.(res.data.assessments);
      setBeginnerScenarios(res.data.scenarios.beginner);
      setIntermediateScenarios(res.data.scenarios.intermediate);
      setAdvancedScenarios(res.data.scenarios.advanced);
      setScenarioCompletion(res.data.count);
    })();
  }, [selectedPosition, JSON.stringify(positionAssessments)]);

  return (
    <>
      <div className="row section__container-light fs-24">
        <div className="assessments__summary-container">
          <p className="bebas fs-48 mb-2">Assessments</p>
          <Summary
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            setModal={props.setPositionModal}
            scenarios={{
              beginnerScenarios,
              intermediateScenarios,
              advancedScenarios,
            }}
            scenarioCompletion={scenarioCompletion}
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
