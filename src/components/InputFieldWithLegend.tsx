import React from "react";

import { ReactComponent as Warning } from "../assets/icons/warning.svg";

const InputFieldWithLegend = (props: any) => {
  return (
    <div className="input__container">
      <div className="input__login__legend row gap-8">
        <span className="">{props.placeholder}</span>
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
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputFieldWithLegend;
