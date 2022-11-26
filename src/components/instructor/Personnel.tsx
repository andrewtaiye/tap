import React, { useState } from "react";
import dayjs from "dayjs";

import {
  PositionAssessment,
  UserPosition,
} from "../../context/GlobalVariables";
import { capitaliseFirstLetter } from "../generic/utility";

interface PersonnelObject {
  user_id: string;
}

interface SelectorProps {
  personnel: PersonnelObject[];
}

interface SummaryProps {
  personnelPositions: UserPosition[];
}

interface PositionProps {
  selectedPosition: string;
}

const Personnel = () => {
  const [personnel, setPersonnel] = useState<PersonnelObject[]>([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState("");
  // prettier-ignore
  const [personnelPositions, setPersonnelPositions] = useState<UserPosition[]>([]);
  const [selectedPosition, setSelectedPosition] = useState("");

  return (
    <>
      <PersonnelSelector personnel={personnel} />
      <PersonnelSummary personnelPositions={personnelPositions} />
      <PersonnelPosition selectedPosition={selectedPosition} />
    </>
  );
};

const PersonnelSelector = (props: SelectorProps) => {
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
          onChange={() => {}}
        >
          <option value="default" disabled>
            - Select Personnel -
          </option>
          {props.personnel?.map((element, index) => {
            return (
              <option value={""} key={index}>
                {""}
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
      <p className="bebas fs-32">Rank and Name</p>
      <div className="w-100 col gap-16">
        <div className="w-100 row gap-64">
          <div className="row w-100 justify-fe">
            <p className="fw-600">Flight</p>
          </div>
          <div className="row w-100 justify-fs">
            <p>flight</p>
          </div>
        </div>
        <div className="w-100 row gap-64">
          <div className="row w-100 justify-fe">
            <p className="fw-600">Ops CAT</p>
          </div>
          <div className="row w-100 justify-fs">
            <p>cat</p>
          </div>
        </div>
      </div>
      <PersonnelPositionTable personnelPositions={props.personnelPositions} />
    </div>
  );
};

const PersonnelPosition = (props: PositionProps) => {
  return (
    <div className="row section__container-light fs-24">
      <div className="instructor__personnel-position-container">
        <div className="col gap-32">
          {/* Title */}
          <p className="bebas fs-32">Position Details</p>

          {/* Chart */}
          <div className="row">
            <svg></svg>
          </div>

          {/* Scenario Checklist */}
          <div className="w-100 col gap-16">
            <p className="fw-600">
              Scenario Completion: <span className="fw-400">xx%</span>
            </p>
            <div className="w-100 col align-fs justify-fs px-8 gap-8">
              <p className="fw-600">Beginner</p>
              <div className="grid gc-3">
                <div className="row">
                  <p className="scenario-checklist__label">1.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
                <div className="row">
                  <p className="scenario-checklist__label">2.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
                <div className="row">
                  <p className="scenario-checklist__label">3.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
                <div className="row">
                  <p className="scenario-checklist__label">4.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
                <div className="row">
                  <p className="scenario-checklist__label">5.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 col align-fs justify-fs px-8 gap-8">
              <p className="fw-600">Intermediate</p>
              <div className="grid gc-3">
                <div className="row">
                  <p className="scenario-checklist__label">6.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
                <div className="row">
                  <p className="scenario-checklist__label">7.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
                <div className="row">
                  <p className="scenario-checklist__label">8.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
                <div className="row">
                  <p className="scenario-checklist__label">9.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 col align-fs justify-fs px-8 gap-8">
              <p className="fw-600">Advanced</p>
              <div className="grid gc-3">
                <div className="row">
                  <p className="scenario-checklist__label">10.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
                <div className="row">
                  <p className="scenario-checklist__label">11.</p>
                  <div className="flex row justify-sa">
                    <svg width="20" height="20" fill="rgb(var(--lightGrey))">
                      <path d="m 0 0 h 20 v 20 h -20 v -20" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Table */}
          <div className="row container">
            <PositionAssessmentTable
              selectedPosition={props.selectedPosition}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonnelPositionTable = (props: SummaryProps) => {
  return (
    <table className="table__positions">
      <colgroup>
        <col style={{ width: "9.091%" }} />
        <col style={{ width: "36.363%" }} />
        <col style={{ width: "18.182%" }} />
        <col style={{ width: "18.182%" }} />
        <col style={{ width: "18.182%" }} />
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
                </tr>
              );
            })}
          </>
        )}
      </tbody>
    </table>
  );
};

const PositionAssessmentTable = (props: PositionProps) => {
  // prettier-ignore
  const [positionAssessments, setPositionAssessments] = useState<PositionAssessment[]>([]);

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
        {positionAssessments?.length === 0 ? (
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
            {positionAssessments?.map((element, index) => {
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
