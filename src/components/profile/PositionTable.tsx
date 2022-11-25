import React, { useContext } from "react";
import dayjs from "dayjs";

import { ModalState } from "../generic/Modal";
import GlobalVariables from "../../context/GlobalVariables";

import Button from "../generic/Button";

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

  const handleEditButtonClick = (element: {}, index: number) => {
    const modal = {
      type: "position",
      subtype: "edit",
      data: { ...element, index: index },
    };
    props.setModal(modal);
  };

  return (
    <table className="table__positions">
      <colgroup>
        <col style={{ width: "8.325%" }} />
        <col style={{ width: "33.34%" }} />
        <col style={{ width: "16.67%" }} />
        <col style={{ width: "16.67%" }} />
        <col style={{ width: "16.67%" }} />
        <col style={{ width: "8.325%" }} />
      </colgroup>
      <thead>
        <tr>
          <th colSpan={7} className="px-2 py-2">
            <div className="row justify-sb">
              <p className="fs-32">Positions</p>
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
              <th colSpan={6}>
                <p className="fs-16">You have no positions</p>
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
              <th>Edit</th>
            </tr>
            {userPositions?.map((element, index) => {
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

export default PositionTable;
