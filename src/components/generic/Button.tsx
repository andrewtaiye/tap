import React from "react";

interface Props {
  children: string;
  className: string;
  mode: string;
  style?: {};
  type: "button" | "submit" | "reset";
  onClick?: (event: any) => void;
  name?: string;
  ref?: any;
}

const Active = (props: Props) => {
  return (
    <button
      type={props.type}
      className={`button__active ${props.className}`}
      style={props.style}
      onClick={props.onClick}
      name={props.name}
    >
      {props.children}
    </button>
  );
};

const Disabled = (props: Props) => {
  return (
    <button
      type={props.type}
      className={`button__disabled ${props.className}`}
      style={props.style}
      onClick={props.onClick}
      name={props.name}
      disabled
    >
      {props.children}
    </button>
  );
};

const Outline = (props: Props) => {
  return (
    <button
      type={props.type}
      className={`button__outline ${props.className}`}
      style={props.style}
      onClick={props.onClick}
      name={props.name}
    >
      {props.children}
    </button>
  );
};

const Nav = (props: Props) => {
  return (
    <button
      type={props.type}
      className={`button__nav ${props.className}`}
      style={props.style}
      onClick={props.onClick}
      name={props.name}
    >
      {props.children}
    </button>
  );
};

const Button = (props: Props) => {
  return (
    <>
      {props.mode === "active" && <Active {...props} />}

      {props.mode === "disabled" && <Disabled {...props} />}

      {props.mode === "outline" && <Outline {...props} />}

      {props.mode === "nav" && <Nav {...props} />}
    </>
  );
};

export default Button;
