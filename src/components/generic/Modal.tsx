import React from "react";
import ReactDOM from "react-dom";
import Position from "../modals/Position";

interface Props {
  setModal: any;
  subtype?: string;
  data?: {};
}

interface Main extends Props {
  type: string;
}

const Modal = (props: Main) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          type={props.type}
          subtype={props.subtype}
          data={props.data}
          setModal={props.setModal}
        />,
        document.querySelector<any>("#modal-root")
      )}
    </>
  );
};

const Overlay = (props: Main) => {
  const closeModal = (event: any) => {
    if (event.target === event.currentTarget) {
      props.setModal("");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      {props.type === "position" && (
        <Position
          subtype={props.subtype}
          data={props.data}
          setModal={props.setModal}
        />
      )}
    </div>
  );
};

export default Modal;
