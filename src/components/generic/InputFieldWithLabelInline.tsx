import React from "react";

import { capitaliseFirstLetter } from "./utility";

import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

interface Props {
  className: string;
  inputName: string;
  inputWidth: {};
  labelWidth: string;
  register: any;
  type: string;
  warning?: boolean;
}

const InputFieldWithLabelInline = (props: Props) => {
  return (
    <div className="row">
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

      <span style={{ display: "block", ...props.inputWidth }}>
        <input
          type={props.type}
          style={{ textAlign: "left", width: "100%" }}
          className={`${props.className}`}
          {...props.register(props.inputName)}
          autoComplete="off"
        />
      </span>
    </div>
  );
};

export default InputFieldWithLabelInline;
