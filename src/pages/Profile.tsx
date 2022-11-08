import React, { useContext, useState } from "react";

import GlobalVariables from "../context/GlobalVariables";

import Header from "../components/generic/Header";
import Modal, { ModalState } from "../components/generic/Modal";
import Create from "../components/profile/Create";
import Main from "../components/profile/Main";

const Profile = () => {
  const { hasProfile } = useContext(GlobalVariables);
  const [positionModal, setPositionModal] = useState<ModalState>({});

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
