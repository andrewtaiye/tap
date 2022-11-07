import React from "react";
import ReactDOM from "react-dom";
import Assessment from "../modals/Assessment";
import Position from "../modals/Position";

interface Props {
  setModal: (state: ModalState) => void;
  subtype?: string;
  data?: {};
}

interface Main extends Props {
  type: string;
}

export interface ModalState {
  type?: string;
  subtype?: string;
  data?: any;
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
  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      props.setModal({});
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
      {props.type === "assessment" && (
        <Assessment
          subtype={props.subtype}
          data={props.data}
          setModal={props.setModal}
        />
      )}
    </div>
  );
};

export default Modal;
