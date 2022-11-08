import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { fetchCall } from "../components/generic/utility";
import GlobalVariables from "../context/GlobalVariables";

import InputFieldWithLegend from "../components/generic/InputFieldWithLegend";
import Button from "../components/generic/Button";

import { ReactComponent as Logo } from "../assets/logos/image.svg";

const Login = () => {
  const { setUserId, setHasProfile } = useContext(GlobalVariables);

  interface Inputs {
    username: string;
    password: string;
  }
  const { register, handleSubmit } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (!data.username || !data.password) {
        setErrorMessage("Invalid Username or Password");
        return;
      } else {
        setErrorMessage("");
      }

      // User Login API Call
      const url = `http://127.0.0.1:5001/user/login`;
      const res = await fetchCall(url, "POST");

      if (res.status === "ok") {
        console.log(res);
        setUserId?.(1);
        setHasProfile?.(true);
        navigate("/assessments");
      } else {
        console.error(res);
      }
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
          register={register}
        />
        <InputFieldWithLegend
          type="password"
          className="input__login fs-32 mb-1"
          inputName="password"
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
