import React from "react";

import Button from "../generic/Button";

import { ModalState } from "../generic/Modal";

import { assessments } from "../../temp/assessmentData";
import { capitaliseFirstLetter } from "../generic/utility";

interface Props {
  setModal: (state: ModalState) => void;
}

const AssessmentTable = (props: Props) => {
  const handleAddButtonClick = () => {
    const modal = {
      type: "assessment",
      subtype: "add",
      data: {},
    };
    props.setModal(modal);
  };

  const handleEditButtonClick = (element: {}) => {
    const modal = {
      type: "assessment",
      subtype: "edit",
      data: { ...element },
    };
    props.setModal(modal);
  };

  return (
    <div className="col">
      <table>
        <colgroup>
          <col style={{ width: "48px" }} />
          <col style={{ width: "112px" }} />
          <col style={{ width: "160px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "32px" }} />
          <col style={{ width: "64px" }} />
          <col style={{ width: "64px" }} />
          <col style={{ width: "336px" }} />
          <col style={{ width: "48px" }} />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={17} className="px-2 py-2">
              <div className="row justify-sb">
                <p className="fs-32">{`<Position>`}</p>
                <Button
                  mode="active"
                  type="button"
                  className="fs-24"
                  onClick={handleAddButtonClick}
                >
                  Add Assessment
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
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
            <th>Edit</th>
          </tr>
          {assessments.map((element) => {
            return (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.date}</td>
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
                <td>{capitaliseFirstLetter(element.safety)}</td>
                <td>{element.grade}</td>
                <td>{element.remarks}</td>
                <td>
                  <p
                    onClick={() => handleEditButtonClick(element)}
                    style={{ cursor: "pointer" }}
                  >
                    Edit
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentTable;
