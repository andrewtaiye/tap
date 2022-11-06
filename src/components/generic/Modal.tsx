import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header";

interface Props {
  setModal: any;
}

interface Main extends Props {
  type: string;
}

const Modal = (props: Main) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay type={props.type} setModal={props.setModal} />,
        document.querySelector<any>("#modal-root")
      )}
      <Header />
      Position
    </>
  );
};

const Overlay = (props: Main) => {
  return (
    <div className="modal-overlay">
      {props.type === "position" && <Position setModal={props.setModal} />}
    </div>
  );
};

const Position = (props: Props) => {
  return (
    <div className="modal__position-container">
      <p>Add New Position</p>
      <div className="modal__position-form"></div>
    </div>
  );
};

export default Modal;
