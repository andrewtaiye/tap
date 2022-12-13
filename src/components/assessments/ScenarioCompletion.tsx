import React from "react";

import { Scenario, ScenarioCount } from "./Main";

import ScenarioRow from "../generic/ScenarioRow";

interface Props {
  scenarios: {
    beginnerScenarios: Scenario[];
    intermediateScenarios: Scenario[];
    advancedScenarios: Scenario[];
  };
  scenarioCompletion: ScenarioCount;
}

const ScenarioCompletion = (props: Props) => {
  return (
    <div className="w-100 col gap-16">
      <p className="fw-600">
        Scenario Completion:{" "}
        <span className="fw-400">
          {Math.round(
            (props.scenarioCompletion.fulfilled /
              props.scenarioCompletion.required) *
              100
          )}
          %
        </span>
      </p>
      {props.scenarios.beginnerScenarios.length > 0 && (
        <div className="w-100 col align-fs justify-fs px-8 gap-8">
          <p className="fw-600">Beginner</p>
          <div className="grid gc-3">
            {props.scenarios.beginnerScenarios.map((element, index) => {
              return <ScenarioRow key={index} {...element} />;
            })}
          </div>
        </div>
      )}
      {props.scenarios.intermediateScenarios.length > 0 && (
        <div className="w-100 col align-fs justify-fs px-8 gap-8">
          <p className="fw-600">Intermediate</p>
          <div className="grid gc-3">
            {props.scenarios.intermediateScenarios.map((element, index) => {
              return <ScenarioRow key={index} {...element} />;
            })}
          </div>
        </div>
      )}
      {props.scenarios.advancedScenarios.length > 0 && (
        <div className="w-100 col align-fs justify-fs px-8 gap-8">
          <p className="fw-600">Advanced</p>
          <div className="grid gc-3">
            {props.scenarios.advancedScenarios.map((element, index) => {
              return <ScenarioRow key={index} {...element} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioCompletion;
