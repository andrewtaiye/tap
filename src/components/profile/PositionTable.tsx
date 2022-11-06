import React from "react";
import Button from "../Button";

import { positions } from "../../temp/positionData";

const PositionTable = () => {
  return (
    <div className="col">
      <table>
        <colgroup>
          <col style={{ width: "6.3829787234042553191489361702128%" }} />
          <col style={{ width: "27.659574468085106382978723404255%" }} />
          <col style={{ width: "14.89361702127659574468085106383%" }} />
          <col style={{ width: "14.89361702127659574468085106383%" }} />
          <col style={{ width: "14.89361702127659574468085106383%" }} />
          <col style={{ width: "14.89361702127659574468085106383%" }} />
          <col style={{ width: "6.3829787234042553191489361702128%" }} />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={7} className="px-2 py-2">
              <div className="row justify-sb">
                <p className="fs-32">Validated Positions</p>
                <Button mode="active" type="button" className="fs-24">
                  Add Position
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>S/N</th>
            <th>Position</th>
            <th>Revalidation</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Approval Date</th>
            <th>Edit</th>
          </tr>
          {positions.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.position}</td>
                <td>{element.revalidation ? "Yes" : "No"}</td>
                <td>{element.startDate}</td>
                <td>{element.endDate}</td>
                <td>{element.approvalDate}</td>
                <td>Edit</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PositionTable;
