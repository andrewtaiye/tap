import React from "react";

import { capitaliseFirstLetter } from "./utility";

import { ReactComponent as Warning } from "../assets/icons/warning.svg";

const InputFieldWithLegend = (props: any) => {
  return (
    <div className="input__container">
      <div className="input__login__legend row gap-8">
        <span className="">{capitaliseFirstLetter(props.inputName)}</span>
        {props.warning && (
          <Warning
            className="error"
            style={{ height: "12px", width: "12px" }}
          />
        )}
      </div>
      <input
        type={`${props.type}`}
        className={`${props.className}`}
        placeholder={capitaliseFirstLetter(props.inputName)}
        {...props.register(props.inputName)}
      />
    </div>
  );
};

export default InputFieldWithLegend;
