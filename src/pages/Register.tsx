/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import jwt_decode from "jwt-decode";

import GlobalVariables from "../context/GlobalVariables";
import { LoginToken } from "../App";
import { fetchCall } from "../components/generic/utility";

import InputFieldWithLegend from "../components/generic/InputFieldWithLegend";
import Button from "../components/generic/Button";

import { ReactComponent as Logo } from "../assets/logos/image.svg";

const Register = () => {
  const { accessToken, setUserId } = useContext(GlobalVariables);

  interface Inputs {
    username: string;
    password: string;
    "confirm password": string;
  }
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const allValues = watch();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      !allValues["username"] ||
      !allValues["password"] ||
      !allValues["confirm password"]
    ) {
      setErrorMessage("Please fill in all the required fields");
      return;
    }

    if (allValues["password"] !== allValues["confirm password"]) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage("");
  }, [
    allValues["username"],
    allValues["password"],
    allValues["confirm password"],
  ]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (errorMessage) return;

      // User Create API Call
      const url = process.env.REACT_APP_API_ENDPOINT + `user/create`;
      const body = {
        username: data["username"],
        password: data["password"],
        confirm_password: data["confirm password"],
      };
      const res = await fetchCall(url, "", "PUT", body);

      if (res.status !== "ok") {
        console.error(res);
        setErrorMessage(res.message);
        return;
      }

      localStorage.setItem("refreshToken", res.data.refresh);
      accessToken.current = res.data.access;
      const decoded: LoginToken = jwt_decode(res.data.access);

      setErrorMessage("");
      setUserId?.(decoded.userId);
      navigate("/profile");
    } catch (err: any) {
      console.error(err.message);
    }
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
          warning={allValues["username"] ? false : true}
          register={register}
        />
        <InputFieldWithLegend
          type="password"
          className="input__login fs-32 mb-4"
          inputName="password"
          warning={allValues["password"] ? false : true}
          register={register}
        />
        <InputFieldWithLegend
          type="password"
          className="input__login fs-32 mb-1"
          inputName="confirm password"
          warning={allValues["confirm password"] ? false : true}
          register={register}
        />

        {errorMessage && (
          <p
            className="error fs-24"
            style={{ alignSelf: "flex-start", textAlign: "left" }}
          >
            {`Error: ${errorMessage}`}
          </p>
        )}

        <div className="row gap-32 mt-8">
          <NavLink to="/login">
            <Button
              mode="outline"
              type="button"
              className="fs-32"
              style={{ width: "136px" }}
            >
              Login
            </Button>
          </NavLink>
          <Button
            mode="active"
            type="submit"
            className="fs-32"
            style={{ width: "136px" }}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
