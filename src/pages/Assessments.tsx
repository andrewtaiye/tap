import React, { useState } from "react";

import Header from "../components/generic/Header";
import Main from "../components/assessments/Main";

import Modal, { ModalState } from "../components/generic/Modal";

const Assessments = () => {
  const [assessmentModal, setAssessmentModal] = useState<ModalState>({});

  return (
    <>
      <Header />
      <Main setModal={setAssessmentModal} />
      <div id="modal-root"></div>
      {assessmentModal.type && (
        <Modal
          type={assessmentModal.type}
          subtype={assessmentModal.subtype}
          data={assessmentModal.data}
          setModal={setAssessmentModal}
        />
      )}
    </>
  );
};

export default Assessments;
