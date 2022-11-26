import React from "react";

import { capitaliseFirstLetter } from "./utility";

import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

interface Props {
  className: string;
  inputName: string;
  register: any;
  type: string;
  label: boolean;
  labelText?: string;
  inputWidth?: string;
  inputHeight?: string;
  labelWidth?: string;
  warning?: boolean;
  selected?: boolean;
  min?: number;
  max?: number;
  inputTextAlign?: string;
}

const InputFieldWithLabelInline = (props: Props) => {
  return (
    <div className="row">
      {props.label && (
        <div
          className="row justify-fe gap-8 pr-4 py-1"
          style={{ textAlign: "right", width: props.labelWidth || "auto" }}
        >
          <p className="fs-24 fw-600">
            {capitaliseFirstLetter(props.labelText || props.inputName) || ""}
          </p>

          {props.warning && (
            <Warning
              className="error"
              style={{ width: "20px", height: "20px" }}
            />
          )}
        </div>
      )}

      <span
        style={{
          display: "block",
          width: props.inputWidth || "auto",
          height: props.inputHeight || "auto",
          flex: 1,
        }}
      >
        <input
          type={props.type}
          style={{
            textAlign: props.inputTextAlign || "left",
            width: "100%",
          }}
          className={`${props.className}`}
          {...props.register(props.inputName)}
          autoComplete="off"
          min={props.min}
          max={props.max}
        />
      </span>
    </div>
  );
};

export default InputFieldWithLabelInline;
