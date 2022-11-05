import React from "react";

import { ReactComponent as Logo } from "../assets/logos/image.svg";
import InputFieldWithLegend from "../components/InputFieldWithLegend";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="login-register__container">
      <Logo style={{ height: "350px" }} className="mb-6" />
      <p className="bebas fs-72 mb-6">Trainee Assessment Portal</p>
      <form className="col" style={{ width: "500px", display: "inline-block" }}>
        <InputFieldWithLegend
          type="text"
          className="input__login fs-32 mb-4"
          placeholder="Username"
        />
        <InputFieldWithLegend
          type="password"
          className="input__login fs-32 mb-1"
          placeholder="Password"
        />
        <p
          className="error fs-24 mb-8"
          style={{ alignSelf: "flex-start", textAlign: "left" }}
        >
          Error: Invalid Username or Password
        </p>
      </form>
      <div className="row gap-32">
        <Button
          mode="active"
          type="submit"
          className="fs-32"
          style={{ width: "136px" }}
        >
          Login
        </Button>
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

export default Login;
