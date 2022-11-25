import React, { useContext } from "react";
import dayjs from "dayjs";

import Button from "../generic/Button";

import GlobalVariables from "../../context/GlobalVariables";
import { ModalState } from "../generic/Modal";

import { capitaliseFirstLetter } from "../generic/utility";

interface Props {
  setModal: (state: ModalState) => void;
  selectedPosition: string;
}

const AssessmentTable = (props: Props) => {
  const { userPositions, positionAssessments } = useContext(GlobalVariables);
  const position = userPositions?.find(
    (element) => element.id === props.selectedPosition
  );
  const handleAddButtonClick = () => {
    const modal = {
      type: "assessment",
      subtype: "add",
      data: { position: position?.position, positionId: position?.id },
    };
    props.setModal(modal);
  };

  const handleEditButtonClick = (element: {}, index: number) => {
    const modal = {
      type: "assessment",
      subtype: "edit",
      data: {
        ...element,
        index: index,
        position: position?.position,
      },
    };
    props.setModal(modal);
  };

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
        <col style={{ width: "48px" }} />
      </colgroup>
      <thead>
        <tr>
          <th colSpan={17} className="px-2 py-2">
            <div className="row justify-sb">
              <p className="fs-32">
                {position?.position}
                {position?.is_revalidation && " (Revalidation)"}
              </p>
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
        {positionAssessments?.length === 0 ? (
          <>
            <tr>
              <th colSpan={17}>
                <p className="fs-16">You have no assessments</p>
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
              <th>Edit</th>
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
                  <td>
                    <p
                      onClick={() => handleEditButtonClick(element, index)}
                      style={{ cursor: "pointer" }}
                    >
                      Edit
                    </p>
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

export default AssessmentTable;
