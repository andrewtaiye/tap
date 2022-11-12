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
        const res = await fetchCall(url, accessToken);

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
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.rank}</td>
                  <td>{element.full_name}</td>
                  <td>{element.username}</td>
                  <td>●●●●●●●●</td>
                  <td>{element.is_admin ? "Yes" : "No"}</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              );
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

export default Users;
