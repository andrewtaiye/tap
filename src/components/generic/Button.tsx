import React from "react";

interface Props {
  children: string;
  className: string;
  mode: string;
  style: {};
  type: "button" | "submit" | "reset";
  onClick?: any;
}

const Active = (props: Props) => {
  return (
    <button
      type={props.type}
      className={`button__active ${props.className}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

const Disabled = (props: any) => {
  return (
    <button
      type={props.type}
      className={`button__disabled ${props.className}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

const Outline = (props: any) => {
  return (
    <button
      type={props.type}
      className={`button__outline ${props.className}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

const Button = (props: any) => {
  return (
    <>
      {props.mode === "active" && <Active {...props} />}

      {props.mode === "disabled" && <Disabled {...props} />}

      {props.mode === "outline" && <Outline {...props} />}
    </>
  );
};

export default Button;
