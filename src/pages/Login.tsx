import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ReactComponent as Logo } from "../assets/logos/image.svg";
import InputFieldWithLegend from "../components/InputFieldWithLegend";
import Button from "../components/Button";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: {}) => {
    console.log({ data });
  };

  return (
    <div className="login-register__container">
      <Logo style={{ height: "350px" }} className="mb-6" />
      <p className="bebas fs-72 mb-6">Trainee Assessment Portal</p>
      <form
        className="col"
        style={{ width: "500px", display: "inline-block" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFieldWithLegend
          type="text"
          className="input__login fs-32 mb-4"
          inputName="username"
          register={register}
        />
        <InputFieldWithLegend
          type="password"
          className="input__login fs-32 mb-1"
          inputName="password"
          register={register}
        />
        <p
          className="error fs-24 mb-8"
          style={{ alignSelf: "flex-start", textAlign: "left" }}
        >
          Error: Invalid Username or Password
        </p>

        <div className="row gap-32">
          <Button
            mode="active"
            type="submit"
            className="fs-32"
            style={{ width: "136px" }}
          >
            Login
          </Button>
          <NavLink to="/register">
            <Button
              mode="outline"
              type="button"
              className="fs-32"
              style={{ width: "136px" }}
            >
              Register
            </Button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
