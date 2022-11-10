import React, { useContext } from "react";
import Button from "../generic/Button";

import { ModalState } from "../generic/Modal";
import GlobalVariables from "../../context/GlobalVariables";

interface Props {
  setModal: (state: ModalState) => void;
}

const PositionTable = (props: Props) => {
  const { userPositions } = useContext(GlobalVariables);

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
          {userPositions?.length === 0 ? (
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
              {userPositions?.map((element, index) => {
                return (
                  <tr key={element.id}>
                    <td>{index + 1}</td>
                    <td>{element.position}</td>
                    <td>{element.is_revalidation ? "Yes" : "No"}</td>
                    <td>
                      {element.start_date
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join(".")}
                    </td>
                    <td>
                      {element.end_date
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join(".")}
                    </td>
                    <td>
                      {element.approval_date
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join(".")}
                    </td>
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
