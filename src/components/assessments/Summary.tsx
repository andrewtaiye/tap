/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from "react";

import GlobalVariables from "../../context/GlobalVariables";
import { LineChart } from "../../charts/charts";
import { ModalState } from "../generic/Modal";
import { Scenario, ScenarioCount } from "./Main";

import Button from "../generic/Button";
import ScenarioRow from "../generic/ScenarioRow";
import ScenarioCompletion from "./ScenarioCompletion";

interface Props {
  selectedPosition: string;
  setSelectedPosition: (position: string) => void;
  setModal: (state: ModalState) => void;
  scenarios: {
    beginnerScenarios: Scenario[];
    intermediateScenarios: Scenario[];
    advancedScenarios: Scenario[];
  };
  scenarioCompletion: ScenarioCount;
}

const Summary = (props: Props) => {
  const { userPositions, positionAssessments } = useContext(GlobalVariables);
  const lineChart: any = useRef();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setSelectedPosition(event.target.value);
  };

  useEffect(() => {
    LineChart(positionAssessments, lineChart.current, {
      x: (d: any) => d.assessment_number,
      y: (d: any) => d.grade,
      yLabel: "Grade",
      yDomain: [0, 100],
      width: 700,
      height: 400,
      color: "steelblue",
    });
  }, [positionAssessments]);

  const handleAddButtonClick = () => {
    const modal = {
      type: "position",
      subtype: "add",
      data: {},
    };
    props.setModal(modal);
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
              {element.is_revalidation && " (Revalidation)"}
            </option>
          );
        })}
      </select>
      <div className="row">
        <Button
          mode="outline"
          type="button"
          className="fs-24"
          onClick={handleAddButtonClick}
        >
          New Position
        </Button>
      </div>
      {props.selectedPosition && (
        <div className="instructor__personnel-position-container">
          <div className="col gap-32">
            <div
              className="row mt-2"
              style={{
                width: "700px",
                height: "400px",
                marginInline: "auto",
              }}
            >
              <svg ref={lineChart}></svg>
            </div>
            <ScenarioCompletion
              scenarios={props.scenarios}
              scenarioCompletion={props.scenarioCompletion}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Summary;
