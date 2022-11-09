/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

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

export interface UserProfile {
  user_id?: string;
  username?: string;
  rank?: string;
  full_name?: string;
  date_of_birth?: string;
  id_number?: string;
  date_accepted?: string;
  reporting_date?: string;
  flight?: string;
  cat?: string;
}

export interface UserPositions {
  id?: string;
  user_id?: string;
  position?: string;
  start_date?: string;
  end_date?: string;
  approval_date?: string;
  is_revalidation?: boolean;
  is_instructor?: boolean;
}

const Main = (props: Props) => {
  const { userId } = useContext(GlobalVariables);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [userPositions, setUserPositions] = useState<Array<UserPositions>>([]);
  const [isEditing, setIsEditing] = useState(false);

  const toggleModal = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    (async () => {
      // Profile Get API Call
      const url = `http://127.0.0.1:5001/profile/get/${userId}`;
      const res = await fetchCall(url);

      if (res.status !== "ok") {
        console.error(res.message);
        return;
      }
      setUserProfile(res.data);
    })();

    (async () => {
      // Position Get API Call
      const url = `http://127.0.0.1:5001/position/get/${userId}`;
      const res = await fetchCall(url);

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      if (!res.data) return;

      setUserPositions(res.data);
    })();
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
            data={userProfile}
            isEditing={isEditing}
            toggleModal={toggleModal}
          />
        ) : (
          <Display
            data={userProfile}
            isEditing={isEditing}
            toggleModal={toggleModal}
          />
        )}
      </div>
      <div className="section__container-dark">
        <PositionTable
          userPositions={userPositions}
          setModal={props.setModal}
        />
      </div>
      {isEditing && (
        <div className="section__container-light col">
          <Button
            mode="outline"
            type="button"
            className="button__delete fs-24"
            onClick={onDelete}
          >
            Delete User
          </Button>
        </div>
      )}
    </>
  );
};

export default Main;
