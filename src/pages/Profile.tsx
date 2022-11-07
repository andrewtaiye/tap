import React, { useState } from "react";

import Header from "../components/generic/Header";
import Modal, { ModalState } from "../components/generic/Modal";
import Create from "../components/profile/Create";
import Main from "../components/profile/Main";

interface Props {
  hasProfile: boolean;
  userId: number;
}

const Profile = (props: Props) => {
  const [positionModal, setPositionModal] = useState<ModalState>({});

  return (
    <>
      <Header />
      {props.hasProfile ? (
        <Main userId={props.userId} setModal={setPositionModal} />
      ) : (
        <Create />
      )}
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
