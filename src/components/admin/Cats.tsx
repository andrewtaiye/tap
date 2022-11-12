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
        const res = await fetchCall(url, accessToken);

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
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element}</td>
                  <td>Edit</td>
                  <td>Delete</td>
                </tr>
              );
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

export default Cats;
