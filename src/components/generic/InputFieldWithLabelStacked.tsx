import React from "react";

import { capitaliseFirstLetter } from "./utility";

import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

interface Props {
  className: string;
  inputName: string;
  register: any;
  type: string;
  warning?: boolean;
}

const InputFieldWithLabelStacked = (props: Props) => {
  return (
    <div className="col input__container">
      <div className="row gap-8 mb-1" style={{ alignSelf: "flex-start" }}>
        <p className="fs-24 fw-600">{capitaliseFirstLetter(props.inputName)}</p>
        {props.warning && (
          <Warning
            className="error"
            style={{ height: "20px", width: "20px" }}
          />
        )}
      </div>
      <input
        type={props.type}
        className={`${props.className}`}
        {...props.register(props.inputName)}
        autoComplete="off"
      />
    </div>
  );
};

export default InputFieldWithLabelStacked;
