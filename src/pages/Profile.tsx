/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GlobalVariables from "../context/GlobalVariables";

import Header from "../components/generic/Header";
import Modal, { ModalState } from "../components/generic/Modal";
import Create from "../components/profile/Create";
import Main from "../components/profile/Main";

const Profile = () => {
  const { userId, hasProfile } = useContext(GlobalVariables);
  const [positionModal, setPositionModal] = useState<ModalState>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
  }, [userId]);

  return (
    <>
      <Header />
      {hasProfile ? <Main setModal={setPositionModal} /> : <Create />}
      <div id="modal-root"></div>
      {positionModal.type && (
        <Modal
          type={positionModal.type}
          subtype={positionModal.subtype}
          data={positionModal.data}
          setModal={setPositionModal}
        />
      )}
    </>
  );
};

export default Profile;
