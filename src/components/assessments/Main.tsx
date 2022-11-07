import React from "react";

import Summary from "./Summary";
import AssessmentTable from "./AssessmentTable";

import { ModalState } from "../generic/Modal";

interface Props {
  setModal: (state: ModalState) => void;
}

const Main = (props: Props) => {
  return (
    <>
      <div className="section__container-light">
        <p className="bebas fs-48 mb-2">Assessments</p>
        <Summary />
      </div>

      <div className="section__container-dark">
        <AssessmentTable setModal={props.setModal} />
      </div>
    </>
  );
};

export default Main;
