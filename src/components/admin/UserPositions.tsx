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
        const res = await fetchCall(url, accessToken);

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
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.rank}</td>
                  <td>{element.full_name}</td>
                  <td>{element.position}</td>
                  <td>
                    {element.approval_date
                      ? dayjs.unix(element.approval_date).format("DD.MM.YYYY")
                      : "-"}
                  </td>
                  <td>{element.is_instructor ? "Yes" : "No"}</td>
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

export default UserPositions;
