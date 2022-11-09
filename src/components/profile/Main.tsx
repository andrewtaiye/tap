/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import Button from "../generic/Button";
import Display from "./Display";
import Edit from "./Edit";
import PositionTable from "./PositionTable";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";
import { ModalState } from "../generic/Modal";

import { positions } from "../../temp/positionData";
import { profiles } from "../../temp/profileData";

interface Props {
  setModal: (state: ModalState) => void;
}

const Main = (props: Props) => {
  const { userId } = useContext(GlobalVariables);
  const [userData, setUserData] = useState(() => {
    const data = profiles.find((element) => element.id === userId);
    return data;
  });
  const [isEditing, setIsEditing] = useState(false);

  const toggleModal = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    (async () => {
      // Profile Get API Call
      const url = `http://127.0.0.1:5001/profile/get/${userId}`;
      const res = await fetchCall(url);

      if (res.status === "ok") {
        // setUserData(res.data)
        console.log(res);
      } else {
        console.error(res);
      }
    })();
    // (async () => {
    //   // Position Get API Call
    //   const url = `http://127.0.0.1:5001/position/get/${userId}`;
    //   const res = await fetchCall(url);

    //   if (res.status === "ok") {
    //     // setUserData(res.data)
    //     console.log(res);
    //   } else {
    //     console.error(res);
    //   }
    // })();
  }, [userId]);

  const onDelete = async () => {
    try {
      // User Delete API Call
      const urlUser = `http://127.0.0.1:5001/user/delete`;
      const resUser = await fetchCall(urlUser, "DELETE");

      if (resUser.status !== "ok") {
        console.error(resUser);
        return;
      }

      // Profile Delete API Call
      const urlProfile = `http://127.0.0.1:5001/profile/delete`;
      const resProfile = await fetchCall(urlProfile, "DELETE");

      if (resProfile.status !== "ok") {
        console.error(resProfile);
        return;
      }

      // Position Delete API Call
      const urlPosition = `http://127.0.0.1:5001/position/delete`;
      const resPosition = await fetchCall(urlPosition, "DELETE");

      if (resPosition.status !== "ok") {
        console.error(resPosition);
        return;
      }

      // Assessment Delete API Call
      const urlAssessment = `http://127.0.0.1:5001/assessment/delete`;
      const resAssessment = await fetchCall(urlAssessment, "DELETE");

      if (resAssessment.status !== "ok") {
        console.error(resAssessment);
        return;
      }

      console.log({ resUser, resProfile, resPosition, resAssessment });
      props.setModal({});
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="section__container-light">
        <p className="bebas fs-48 mb-2">Profile</p>
        {isEditing ? (
          <Edit
            data={userData}
            isEditing={isEditing}
            toggleModal={toggleModal}
          />
        ) : (
          <Display
            data={userData}
            isEditing={isEditing}
            toggleModal={toggleModal}
          />
        )}
      </div>
      <div className="section__container-dark">
        <PositionTable data={positions} setModal={props.setModal} />
      </div>
      {isEditing && (
        <div className="section__container-light col">
          <Button mode="outline" type="button" className="button__delete fs-24">
            Delete User
          </Button>
        </div>
      )}
    </>
  );
};

export default Main;
