/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";

import Button from "../generic/Button";

const Positions = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const url = process.env.REACT_APP_API_ENDPOINT + `admin/get/positions`;
        const res = await fetchCall(url, accessToken.current);

        if (!res.data) {
          setPositions([]);
          return;
        }

        setPositions(res.data.positions);
      } catch (err: any) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="row">
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Position</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {positions.length > 0 ? (
            positions.map((element, index) => {
              return <Row position={element} index={index} key={index} />;
            })
          ) : (
            <tr>
              <td colSpan={4}>No positions in database</td>
            </tr>
          )}
          <tr>
            <td colSpan={4}>
              <div className="row">
                <Button
                  mode="active"
                  type="button"
                  className=""
                  onClick={() => {}}
                >
                  Add new position
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

interface Props {
  position: string;
  index: number;
}

const Row = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <tr>
      <td>{props.index + 1}</td>
      {isEdit ? (
        <td>
          <input
            type="text"
            className="table__input"
            defaultValue={props.position}
          />
        </td>
      ) : (
        <td>{props.position}</td>
      )}

      {isEdit ? (
        <td>
          <p onClick={toggleEdit} style={{ cursor: "pointer" }}>
            Save
          </p>
        </td>
      ) : (
        <td>
          <p onClick={toggleEdit} style={{ cursor: "pointer" }}>
            Edit
          </p>
        </td>
      )}
      <td>Delete</td>
    </tr>
  );
};

export default Positions;
