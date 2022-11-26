import React, { useState } from "react";
import dayjs from "dayjs";

import { UserPosition } from "../../context/GlobalVariables";

interface PersonnelObject {
  user_id: string;
}

interface SelectorProps {
  personnel: PersonnelObject[];
}

interface SummaryProps {
  personnelPositions: UserPosition[];
}

const Personnel = () => {
  const [personnel, setPersonnel] = useState<PersonnelObject[]>([]);
  const [selectedPersonnel, setSelectedPersonnel] = useState("");
  const [personnelPositions, setPersonnelPositions] = useState<UserPosition[]>(
    []
  );
  const [selectedPosition, setSelectedPosition] = useState("");

  return (
    <>
      <PersonnelSelector personnel={personnel} />
      <PersonnelSummary personnelPositions={personnelPositions} />
      <PersonnelPosition />
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

const PersonnelPosition = () => {
  return (
    <div className="section__container-light">
      <p className="bebas fs-32">Position Details</p>
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

export default Personnel;
