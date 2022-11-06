import React from "react";

import { capitaliseFirstLetter } from "./utility";

import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

interface Props {
  className: string;
  inputName: string;
  inputWidth: string;
  labelWidth: string;
  register: any;
  type: string;
  warning?: boolean;
}

const InputFieldWithLabelInline = (props: Props) => {
  return (
    <div className="row input__container">
      <div
        className="row justify-fe gap-8 pr-4 py-1"
        style={{ textAlign: "right", width: props.labelWidth }}
      >
        <p className="fs-24 fw-600">{capitaliseFirstLetter(props.inputName)}</p>

        {props.warning && (
          <Warning
            className="error"
            style={{ width: "20px", height: "20px" }}
          />
        )}
      </div>

      <input
        type={props.type}
        style={{ textAlign: "left", width: props.inputWidth }}
        className={`${props.className}`}
        {...props.register(props.inputName)}
        autoComplete="off"
      />
    </div>
  );
};

export default InputFieldWithLabelInline;
