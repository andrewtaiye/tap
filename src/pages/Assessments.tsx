/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GlobalVariables from "../context/GlobalVariables";
import Modal, { ModalState } from "../components/generic/Modal";

import Header from "../components/generic/Header";
import Main from "../components/assessments/Main";

const Assessments = () => {
  const { userId, hasProfile } = useContext(GlobalVariables);
  const [assessmentModal, setAssessmentModal] = useState<ModalState>({});
  const [positionModal, setPositionModal] = useState<ModalState>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    if (hasProfile === false) {
      navigate("/profile");
      return;
    }
  }, [userId, hasProfile]);

  return (
    <>
      <Header />
      <Main
        setAssessmentModal={setAssessmentModal}
        setPositionModal={setPositionModal}
      />
      <div id="modal-root"></div>
      {assessmentModal.type && (
        <Modal
          type={assessmentModal.type}
          subtype={assessmentModal.subtype}
          data={assessmentModal.data}
          setModal={setAssessmentModal}
        />
      )}
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

export default Assessments;
