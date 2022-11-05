import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "../assets/logos/image.svg";
import InputFieldWithLegend from "../components/InputFieldWithLegend";
import Button from "../components/Button";

const Register = () => {
  return (
    <div className="login-register__container">
      <Logo style={{ height: "350px" }} className="mb-6" />
      <p className="bebas fs-72 mb-6">Trainee Assessment Portal</p>
      <form className="col" style={{ width: "500px", display: "inline-block" }}>
        <InputFieldWithLegend
          type="text"
          className="input__login fs-32 mb-4"
          placeholder="Username"
          warning={true}
        />
        <InputFieldWithLegend
          type="password"
          className="input__login fs-32 mb-4"
          placeholder="Password"
          warning={true}
        />
        <InputFieldWithLegend
          type="password"
          className="input__login fs-32 mb-1"
          placeholder="Confirm Password"
          warning={true}
        />
        <p
          className="error fs-24 mb-8"
          style={{ alignSelf: "flex-start", textAlign: "left" }}
        >
          Error: Passwords do not match
        </p>
      </form>
      <div className="row gap-32">
        <NavLink to="/login">
          <Button
            mode="active"
            type="submit"
            className="fs-32"
            style={{ width: "136px" }}
          >
            Login
          </Button>
        </NavLink>
        <Button
          mode="outline"
          type="button"
          className="fs-32"
          style={{ width: "136px" }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
