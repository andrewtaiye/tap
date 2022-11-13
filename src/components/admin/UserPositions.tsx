/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";

interface UserPosition {
  approval_date: number;
  full_name: string;
  id: string;
  is_instructor: boolean;
  position: string;
  rank: string;
}

const UserPositions = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const url =
          process.env.REACT_APP_API_ENDPOINT + `admin/get/user-positions`;
        const res = await fetchCall(url, accessToken.current);

        if (!res.data) {
          setUserPositions([]);
          return;
        }

        setUserPositions(res.data.userPositions);
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
            <th>Rank</th>
            <th>Name</th>
            <th>Position</th>
            <th>Approval Date</th>
            <th>Instructor</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userPositions.length > 0 ? (
            userPositions.map((element, index) => {
              return <Row position={element} index={index} key={index} />;
            })
          ) : (
            <tr>
              <td colSpan={8}>No positions in database</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

interface Props {
  position: UserPosition;
  index: number;
}

const Row = (props: Props) => {
  const { ranks } = useContext(GlobalVariables);
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <tr>
      <td>{props.index + 1}</td>
      {isEdit ? (
        <td>
          <select className="table__select">
            {ranks?.map((element, index) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
        </td>
      ) : (
        <td>{props.position.rank}</td>
      )}

      {isEdit ? (
        <td>
          <input type="text" className="table__input" />
        </td>
      ) : (
        <td>{props.position.full_name}</td>
      )}

      {isEdit ? (
        <td>
          <input type="text" className="table__input" />
        </td>
      ) : (
        <td>{props.position.position}</td>
      )}

      {isEdit ? (
        <td>
          <input type="date" className="table__input" />
        </td>
      ) : (
        <td>
          {props.position.approval_date
            ? dayjs.unix(props.position.approval_date).format("DD.MM.YYYY")
            : "-"}
        </td>
      )}

      <td>{props.position.is_instructor ? "Yes" : "No"}</td>

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

export default UserPositions;
