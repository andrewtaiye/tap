/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../generic/Button";
import Display from "./Display";
import Edit from "./Edit";
import PositionTable from "./PositionTable";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";
import { ModalState } from "../generic/Modal";

interface Props {
  setModal: (state: ModalState) => void;
}

const Main = (props: Props) => {
  const {
    accessToken,
    userId,
    setUserId,
    setHasProfile,
    setUserProfile,
    setUserPositions,
    setPositionAssessments,
    setIsAdmin,
  } = useContext(GlobalVariables);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const toggleMode = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    (async () => {
      // Profile Get API Call
      const url = process.env.REACT_APP_API_ENDPOINT + `profile/get/${userId}`;
      let res = await fetchCall(url, accessToken.current);

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res.message);
        return;
      }
      setUserProfile?.(res.data.profile);
    })();

    (async () => {
      // Position Get API Call
      const url =
        process.env.REACT_APP_API_ENDPOINT + `user_position/get/${userId}`;
      let res = await fetchCall(url, accessToken.current);

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      if (!res.data) {
        setUserPositions?.([]);
        return;
      }

      setUserPositions?.(res.data.positions);
    })();
  }, [userId]);

  const onDelete = async () => {
    try {
      // User Delete API Call
      const url = process.env.REACT_APP_API_ENDPOINT + `user/delete/${userId}`;
      let res = await fetchCall(url, accessToken.current, "DELETE");

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken, "DELETE");
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      localStorage.removeItem("refreshToken");
      setUserId?.("");
      setHasProfile?.(false);
      setUserProfile?.({});
      setUserPositions?.([]);
      setPositionAssessments?.([]);
      setIsAdmin?.(false);

      toggleMode();
      navigate("/login");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="row section__container-light">
        <div className="col">
          <p className="bebas fs-48 mb-2">Profile</p>
          {isEditing ? (
            <Edit isEditing={isEditing} toggleMode={toggleMode} />
          ) : (
            <Display isEditing={isEditing} toggleMode={toggleMode} />
          )}
        </div>
      </div>
      <div className="row section__container-dark">
        <div className="row container">
          <PositionTable setModal={props.setModal} />
        </div>
      </div>
      {isEditing && (
        <div className="row section__container-light">
          <div className="row container">
            <Button
              mode="outline"
              type="button"
              className="button__delete fs-24"
              onClick={onDelete}
            >
              Delete User
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
