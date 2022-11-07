import React from "react";

interface Props {
  className: string;
  inputName: string;
  inputWidth: {};
  register: any;
  type: string;
}

const InputFieldWithLabelInline = (props: Props) => {
  return (
    <span style={{ display: "block", ...props.inputWidth }}>
      <input
        type={props.type}
        style={{ textAlign: "left", width: "100%" }}
        className={`${props.className}`}
        {...props.register(props.inputName)}
        autoComplete="off"
      />
    </span>
  );
};

export default InputFieldWithLabelInline;
