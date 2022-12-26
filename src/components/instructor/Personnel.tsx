/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import GlobalVariables, {
  PositionAssessment,
  UserPosition,
} from "../../context/GlobalVariables";
import { Scenario, ScenarioCount } from "../assessments/Main";
import { capitaliseFirstLetter, fetchCall } from "../generic/utility";

import { LineChart } from "../../charts/charts";

import Button from "../generic/Button";
import ScenarioCompletion from "../assessments/ScenarioCompletion";

interface PersonnelObject {
  user_id: string;
  rank: string;
  full_name: string;
  cat: string;
  flight: string;
}

interface SelectorProps {
  personnel: PersonnelObject[];
  setSelectedPersonnel: (object: PersonnelObject) => void;
  setSelectedPosition: (positionId: string) => void;
}

interface SummaryProps {
  selectedPersonnel: PersonnelObject;
  personnelPositions: UserPosition[];
  setSelectedPosition: (positionId: string) => void;
}

interface PositionTableProps {
  personnelPositions: UserPosition[];
  setSelectedPosition: (positionId: string) => void;
}

interface PositionProps {
  selectedPosition: string;
  positionAssessments: PositionAssessment[];
  scenarios: {
    beginnerScenarios: Scenario[];
    intermediateScenarios: Scenario[];
    advancedScenarios: Scenario[];
  };
  scenarioCompletion: ScenarioCount;
}

interface AssessmentTableProps {
  selectedPosition: string;
  positionAssessments: PositionAssessment[];
}

const Personnel = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [personnel, setPersonnel] = useState<PersonnelObject[]>([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState({
    user_id: "",
    rank: "",
    full_name: "",
    cat: "",
    flight: "",
  });
  // prettier-ignore
  const [personnelPositions, setPersonnelPositions] = useState<UserPosition[]>([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [beginnerScenarios, setBeginnerScenarios] = useState<Scenario[]>([]);
  const [intermediateScenarios, setIntermediateScenarios] = useState<
    Scenario[]
  >([]);
  const [advancedScenarios, setAdvancedScenarios] = useState<Scenario[]>([]);
  const [scenarioCompletion, setScenarioCompletion] = useState<ScenarioCount>({
    requirement: 0,
    fulfilled: 0,
  });
  const [positionAssessments, setPositionAssessments] = useState<
    PositionAssessment[]
  >([]);

  useEffect(() => {
    (async () => {
      const url =
        process.env.REACT_APP_API_ENDPOINT + `instructor/get/personnel`;
      let res = await fetchCall(url, accessToken.current);

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res.message);
        return;
      }

      setPersonnel(res.data.personnel);
    })();
  }, []);

  useEffect(() => {
    if (!selectedPersonnel.user_id) return;

    (async () => {
      const url =
        process.env.REACT_APP_API_ENDPOINT +
        `user_position/get/${selectedPersonnel.user_id}`;
      let res = await fetchCall(url, accessToken.current);

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res.message);
        return;
      }

      setPersonnelPositions(res.data.positions);
    })();
  }, [selectedPersonnel.user_id]);

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
        console.error(res.message);
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
  }, [selectedPosition]);

  return (
    <>
      <PersonnelSelector
        personnel={personnel}
        setSelectedPersonnel={setSelectedPersonnel}
        setSelectedPosition={setSelectedPosition}
      />
      {selectedPersonnel.full_name && (
        <PersonnelSummary
          selectedPersonnel={selectedPersonnel}
          personnelPositions={personnelPositions}
          setSelectedPosition={setSelectedPosition}
        />
      )}
      {selectedPosition && (
        <PersonnelPosition
          selectedPosition={selectedPosition}
          positionAssessments={positionAssessments}
          scenarios={{
            beginnerScenarios,
            intermediateScenarios,
            advancedScenarios,
          }}
          scenarioCompletion={scenarioCompletion}
        />
      )}
    </>
  );
};

const PersonnelSelector = (props: SelectorProps) => {
  const handlePersonnelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selection = props.personnel.find(
      (element) => element.user_id === event.target.value
    );
    props.setSelectedPersonnel(selection as PersonnelObject);
    props.setSelectedPosition("");
  };

  return (
    <div className="section__container-light fs-24">
      <div className="col gap-16">
        <p className="bebas fs-48">Instructor Dashboard</p>
        <p>Select Personnel to view their training records</p>
        <select
          className="fs-24 py-1 mb-2"
          style={{
            width: "500px",
            textAlign: "center",
            appearance: "none",
          }}
          defaultValue="default"
          onChange={handlePersonnelChange}
        >
          <option value="default" disabled>
            - Select Personnel -
          </option>
          {props.personnel?.map((element, index) => {
            return (
              <option value={element.user_id} key={index}>
                {element.rank} {capitaliseFirstLetter(element.full_name)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

const PersonnelSummary = (props: SummaryProps) => {
  return (
    <div className="section__container-dark col gap-32 fs-24">
      <p className="bebas fs-32">
        {props.selectedPersonnel.rank}{" "}
        {capitaliseFirstLetter(props.selectedPersonnel.full_name)}
      </p>
      <div className="w-100 col gap-16">
        <div className="w-100 row gap-64">
          <div className="row w-100 justify-fe">
            <p className="fw-600">Flight</p>
          </div>
          <div className="row w-100 justify-fs">
            <p>{capitaliseFirstLetter(props.selectedPersonnel.flight)}</p>
          </div>
        </div>
        <div className="w-100 row gap-64">
          <div className="row w-100 justify-fe">
            <p className="fw-600">Ops CAT</p>
          </div>
          <div className="row w-100 justify-fs">
            <p>{props.selectedPersonnel.cat}</p>
          </div>
        </div>
      </div>
      <PersonnelPositionTable
        personnelPositions={props.personnelPositions}
        setSelectedPosition={props.setSelectedPosition}
      />
    </div>
  );
};

const PersonnelPosition = (props: PositionProps) => {
  const lineChart: any = useRef();

  useEffect(() => {
    LineChart(props.positionAssessments, lineChart.current, {
      x: (d: any) => d.assessment_number,
      y: (d: any) => d.grade,
      yLabel: "Grade",
      yDomain: [0, 100],
      width: 700,
      height: 400,
      color: "steelblue",
    });
  }, [props.positionAssessments]);

  return (
    <div className="row section__container-light fs-24">
      <div className="col gap-32">
        {/* Title */}
        <p className="bebas fs-32">Position Details</p>

        {/* Chart */}
        <div className="row">
          <svg ref={lineChart}></svg>
        </div>

        {/* Scenario Checklist */}
        <div className="instructor__personnel-position-container">
          <ScenarioCompletion
            scenarios={{
              beginnerScenarios: props.scenarios.beginnerScenarios,
              intermediateScenarios: props.scenarios.intermediateScenarios,
              advancedScenarios: props.scenarios.advancedScenarios,
            }}
            scenarioCompletion={props.scenarioCompletion}
          />
        </div>

        {/* Assessment Table */}
        <div className="row container">
          <PositionAssessmentTable
            selectedPosition={props.selectedPosition}
            positionAssessments={props.positionAssessments}
          />
        </div>
      </div>
    </div>
  );
};

const PersonnelPositionTable = (props: PositionTableProps) => {
  const handleButtonClick = (positionId: string) => {
    props.setSelectedPosition(positionId);
  };

  return (
    <table className="table__positions">
      <colgroup>
        <col style={{ width: "9.091%" }} />
        <col style={{ width: "27.272%" }} />
        <col style={{ width: "18.182%" }} />
        <col style={{ width: "18.182%" }} />
        <col style={{ width: "18.182%" }} />
        <col style={{ width: "9.091%" }} />
      </colgroup>
      <thead>
        <tr>
          <th colSpan={6} className="px-2 py-2">
            <p className="fs-32">Positions</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.personnelPositions?.length === 0 ? (
          <>
            <tr>
              <th colSpan={6}>
                <p className="fs-16">Personnel has no positions</p>
              </th>
            </tr>
          </>
        ) : (
          <>
            <tr>
              <th>S/N</th>
              <th>Position</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Approval Date</th>
              <th>View</th>
            </tr>
            {props.personnelPositions?.map((element, index) => {
              return (
                <tr key={element.id}>
                  <td>{index + 1}</td>
                  <td>
                    {element.position}
                    {element.is_revalidation && " (Revalidation)"}
                  </td>
                  <td>
                    {dayjs
                      .unix(element.start_date as number)
                      .format("YYYY.MM.DD")}
                  </td>
                  <td>
                    {element.end_date
                      ? dayjs
                          .unix(element.end_date as number)
                          .format("YYYY.MM.DD")
                      : "-"}
                  </td>
                  <td>
                    {element.approval_date
                      ? dayjs
                          .unix(element.approval_date as number)
                          .format("YYYY.MM.DD")
                      : "-"}
                  </td>
                  <td>
                    <div className="row">
                      <Button
                        mode="active"
                        type="button"
                        className="fs-16"
                        name="save"
                        onClick={() => {
                          handleButtonClick(element.id as string);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
};

const PositionAssessmentTable = (props: AssessmentTableProps) => {
  return (
    <table className="table__assessments">
      <colgroup>
        <col style={{ width: "48px" }} />
        <col style={{ width: "112px" }} />
        <col style={{ width: "160px", minWidth: "160px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "32px", minWidth: "32px" }} />
        <col style={{ width: "64px", minWidth: "64px" }} />
        <col style={{ width: "64px", minWidth: "64px" }} />
        <col style={{ width: "336px", minWidth: "336px" }} />
      </colgroup>
      <thead>
        <tr>
          <th colSpan={16} className="px-2 py-2">
            <p className="fs-32">Assessment Details</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.positionAssessments?.length === 0 ? (
          <>
            <tr>
              <th colSpan={16}>
                <p className="fs-16">This position has no assessments</p>
              </th>
            </tr>
          </>
        ) : (
          <>
            <tr>
              <th>S/N</th>
              <th>Date</th>
              <th>Instructor</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
              <th>F</th>
              <th>G</th>
              <th>H</th>
              <th>I</th>
              <th>J</th>
              <th>Safety</th>
              <th>Grade</th>
              <th>Remarks</th>
            </tr>
            {props.positionAssessments?.map((element, index) => {
              return (
                <tr key={element.id}>
                  <td>{index + 1}</td>
                  <td>{dayjs.unix(element.date).format("DD.MM.YYYY")}</td>
                  <td>{capitaliseFirstLetter(element.instructor)}</td>
                  <td>{element.a}</td>
                  <td>{element.b}</td>
                  <td>{element.c}</td>
                  <td>{element.d}</td>
                  <td>{element.e}</td>
                  <td>{element.f}</td>
                  <td>{element.g}</td>
                  <td>{element.h}</td>
                  <td>{element.i}</td>
                  <td>{element.j}</td>
                  <td>{element.safety ? "Pass" : "Fail"}</td>
                  <td>{element.grade}</td>
                  <td>{element.remarks}</td>
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
};

export default Personnel;
