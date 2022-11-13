/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import GlobalVariables from "../../context/GlobalVariables";
import Button from "../generic/Button";
import { fetchCall } from "../generic/utility";

const Ranks = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [ranks, setRanks] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const url = process.env.REACT_APP_API_ENDPOINT + `admin/get/ranks`;
        const res = await fetchCall(url, accessToken.current);

        if (!res.data) {
          setRanks([]);
          return;
        }

        setRanks(res.data.ranks);
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
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {ranks.length > 0 ? (
            ranks.map((element, index) => {
              return <Row rank={element} index={index} key={index} />;
            })
          ) : (
            <tr>
              <td colSpan={4}>No ranks in database</td>
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
                  Add new rank
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
  rank: string;
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
            defaultValue={props.rank}
          />
        </td>
      ) : (
        <td>{props.rank}</td>
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

export default Ranks;
