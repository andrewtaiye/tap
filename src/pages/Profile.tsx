import React, { useState } from "react";

import Header from "../components/generic/Header";
import Modal from "../components/generic/Modal";
import Create from "../components/profile/Create";
import Main from "../components/profile/Main";

interface Props {
  hasProfile: boolean;
  userId: number;
}

const Profile = (props: Props) => {
  const [positionModal, setPositionModal] = useState(false);

  return (
    <>
      <Header />
      {props.hasProfile ? (
        <Main userId={props.userId} setPositionModal={setPositionModal} />
      ) : (
        <Create />
      )}
      {positionModal && (
        <>
          <div id="modal-root"></div>
          <Modal type="position" setModal={setPositionModal} />
        </>
      )}
    </>
  );
};

export default Profile;
