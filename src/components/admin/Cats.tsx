/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";

import Button from "../generic/Button";

const Cats = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [cats, setCats] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const url = process.env.REACT_APP_API_ENDPOINT + `admin/get/cats`;
        const res = await fetchCall(url, accessToken.current);

        if (!res.data) {
          setCats([]);
          return;
        }

        setCats(res.data.cats);
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
            <th>CAT</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cats.length > 0 ? (
            cats.map((element, index) => {
              return <Row cat={element} index={index} key={index} />;
            })
          ) : (
            <tr>
              <td colSpan={4}>No CATs in database</td>
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
                  Add new CAT
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
  cat: string;
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
            defaultValue={props.cat}
          />
        </td>
      ) : (
        <td>{props.cat}</td>
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

export default Cats;
