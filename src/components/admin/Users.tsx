/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";

interface User {
  full_name: string;
  id: string;
  is_admin: boolean;
  rank: string;
  username: string;
}

const Users = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const url = process.env.REACT_APP_API_ENDPOINT + `admin/get/users`;
        const res = await fetchCall(url, accessToken.current);

        if (!res.data) {
          setUsers([]);
          return;
        }

        setUsers(res.data.users);
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
            <th>Username</th>
            <th>Password</th>
            <th>Admin</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((element, index) => {
              return <Row user={element} index={index} key={index} />;
            })
          ) : (
            <tr>
              <td colSpan={8}>No users in database</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

interface Props {
  user: User;
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
        <td>{props.user.rank}</td>
      )}

      {isEdit ? (
        <td>
          <input type="text" className="table__input" />
        </td>
      ) : (
        <td>{props.user.full_name}</td>
      )}

      {isEdit ? (
        <td>
          <input type="text" className="table__input" />
        </td>
      ) : (
        <td>{props.user.username}</td>
      )}

      {isEdit ? (
        <td>
          <input type="text" className="table__input" />
        </td>
      ) : (
        <td>●●●●●●●●</td>
      )}

      <td>{props.user.is_admin ? "Yes" : "No"}</td>

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

export default Users;
