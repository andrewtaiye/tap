import React from "react";
import Button from "../generic/Button";

import { ModalState } from "../generic/Modal";
import { UserPositions } from "./Main";

interface Props {
  userPositions: Array<UserPositions>;
  setModal: (state: ModalState) => void;
}

const PositionTable = (props: Props) => {
  const handleAddButtonClick = () => {
    const modal = {
      type: "position",
      subtype: "add",
      data: {},
    };
    props.setModal(modal);
  };

  const handleEditButtonClick = (element: {}) => {
    const modal = {
      type: "position",
      subtype: "edit",
      data: { ...element },
    };
    props.setModal(modal);
  };

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
                <Button
                  mode="active"
                  type="button"
                  className="fs-24"
                  onClick={handleAddButtonClick}
                >
                  Add Position
                </Button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.userPositions.length === 0 ? (
            <>
              <tr>
                <th colSpan={7}>
                  <p className="fs-16">You have no positions</p>
                </th>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <th>S/N</th>
                <th>Position</th>
                <th>Revalidation</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Approval Date</th>
                <th>Edit</th>
              </tr>
              {props.userPositions.map((element, index) => {
                return (
                  <tr key={element.id}>
                    <td>{index + 1}</td>
                    <td>{element.position}</td>
                    <td>{element.is_revalidation ? "Yes" : "No"}</td>
                    <td>{element.start_date}</td>
                    <td>{element.end_date}</td>
                    <td>{element.approval_date}</td>
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
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PositionTable;
