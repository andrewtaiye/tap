/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";

import { capitaliseFirstLetter, fetchCall } from "../generic/utility";
import GlobalVariables, { UserProfile } from "../../context/GlobalVariables";

import Button from "../generic/Button";
import InputFieldWithLabelInline from "../generic/InputFieldWithLabelInline";
import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

interface Props {
  toggleMode: () => void;
  isEditing: boolean;
}

const Edit = (props: Props) => {
  const { accessToken, userId, flights, cats, userProfile, setUserProfile } =
    useContext(GlobalVariables);
  interface Inputs {
    "full name": string;
    "date of birth": string;
    "id number": string;
    "date accepted": string;
    "reporting date": string;
    password: string;
    "confirm password": string;
    warning: boolean;
    flight: string;
    cat: string;
  }
  const { register, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      "id number": userProfile?.id_number,
      "date of birth": dayjs
        .unix(userProfile?.date_of_birth as number)
        .format("YYYY-MM-DD"),
      "date accepted": dayjs
        .unix(userProfile?.date_accepted as number)
        .format("YYYY-MM-DD"),
      "reporting date": dayjs
        .unix(userProfile?.reporting_date as number)
        .format("YYYY-MM-DD"),
      flight: userProfile?.flight,
      cat: userProfile?.cat,
    },
  });
  const allValues = watch();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      !allValues["id number"] ||
      !allValues["date of birth"] ||
      !allValues["date accepted"] ||
      !allValues["reporting date"] ||
      !allValues["flight"] ||
      !allValues["cat"] ||
      !allValues["password"] ||
      !allValues["confirm password"]
    ) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    if (allValues["date accepted"] < allValues["date of birth"]) {
      setErrorMessage("Date Accepted cannot be before Date of Birth");
      return;
    }

    if (allValues["reporting date"] < allValues["date accepted"]) {
      setErrorMessage("Reporting Date cannot be before Date Accepted");
      return;
    }

    if (allValues["password"] !== allValues["confirm password"]) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage("");
  }, [
    allValues["id number"],
    allValues["date of birth"],
    allValues["date accepted"],
    allValues["reporting date"],
    allValues["flight"],
    allValues["cat"],
    allValues["password"],
    allValues["confirm password"],
  ]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (errorMessage) return;

      // Profile Update API Call
      const url =
        process.env.REACT_APP_API_ENDPOINT + `profile/update/${userId}`;
      const body: UserProfile = {
        date_of_birth: dayjs(data["date of birth"]).unix(),
        id_number: data["id number"],
        date_accepted: dayjs(data["date accepted"]).unix(),
        reporting_date: dayjs(data["reporting date"]).unix(),
        flight: data["flight"],
        cat: data["cat"],
      };
      let res = await fetchCall(url, accessToken.current, "PATCH", {
        ...body,
        password: data["password"],
        confirm_password: data["confirm password"],
      });

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken, "PATCH", {
          ...body,
          password: data["password"],
          confirm_password: data["confirm password"],
        });
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res.message);
        return;
      }

      setUserProfile?.((prevState) => {
        return { ...prevState, ...body };
      });
      props.toggleMode();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gc-2 gap-16">
        {/* Username Display */}
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Username
          </p>
          <p
            className="px-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {userProfile?.username}
          </p>
        </div>

        {/* Rank and Name Display */}
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Full Name
          </p>
          <p
            className="pl-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {`${capitaliseFirstLetter(userProfile?.rank)}
            ${capitaliseFirstLetter(userProfile?.full_name)}`}
          </p>
        </div>

        {/* ID Number Input */}
        <div className="w-100 row justify-fe">
          <InputFieldWithLabelInline
            inputName="id number"
            register={register}
            type="text"
            label={true}
            className="px-4 py-1 fs-24"
            labelWidth="250px"
            inputWidth="300px"
            warning={allValues["id number"] ? false : true}
          />
        </div>

        {/* DOB Input */}
        <div className="w-100 row justify-fs">
          <InputFieldWithLabelInline
            inputName="date of birth"
            register={register}
            type="date"
            label={true}
            className="px-4 py-1 fs-24"
            labelWidth="250px"
            inputWidth="300px"
            inputHeight="52px"
            warning={allValues["date of birth"] ? false : true}
          />
        </div>

        {/* Enlistment Date Input */}
        <div className="w-100 row justify-fe">
          <InputFieldWithLabelInline
            inputName="date accepted"
            register={register}
            type="date"
            label={true}
            className="px-4 py-1 fs-24"
            labelWidth="250px"
            inputWidth="300px"
            inputHeight="52px"
            warning={allValues["date accepted"] ? false : true}
          />
        </div>

        {/* Post-In Date Input */}
        <div className="w-100 row justify-fs">
          <InputFieldWithLabelInline
            inputName="reporting date"
            register={register}
            type="date"
            label={true}
            className="px-4 py-1 fs-24"
            labelWidth="250px"
            inputWidth="300px"
            inputHeight="52px"
            warning={allValues["reporting date"] ? false : true}
          />
        </div>

        {/* Flight Input */}
        <div className="w-100 row">
          <div
            className="row justify-fe gap-8 pr-4 py-1"
            style={{ textAlign: "right", width: "250px" }}
          >
            <p className="fs-24 fw-600">Flight</p>

            {(allValues["flight"] === "default" || !allValues["flight"]) && (
              <Warning
                className="error"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </div>
          <span style={{ display: "inline-block", width: "300px" }}>
            <select
              className={`fs-24 px-4 py-1${
                allValues["flight"] === "default" || !allValues["flight"]
                  ? " placeholder"
                  : ""
              }`}
              style={{
                width: "100%",
                textAlign: "left",
                appearance: "none",
              }}
              {...register("flight")}
              defaultValue="default"
            >
              <option value="default" disabled>
                - Select Flight -
              </option>
              {flights?.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {capitaliseFirstLetter(element.toLowerCase())}
                  </option>
                );
              })}
            </select>
          </span>
        </div>

        {/* CAT Input */}
        <div className="w-100 row">
          <div
            className="row justify-fe gap-8 pr-4 py-1"
            style={{ textAlign: "right", width: "250px" }}
          >
            <p className="fs-24 fw-600">Ops CAT</p>

            {(allValues["cat"] === "default" || !allValues["cat"]) && (
              <Warning
                className="error"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </div>
          <span style={{ display: "inline-block", width: "300px" }}>
            <select
              className={`fs-24 px-4 py-1${
                allValues["cat"] === "default" || !allValues["cat"]
                  ? " placeholder"
                  : ""
              }`}
              style={{
                width: "100%",
                textAlign: "left",
                appearance: "none",
              }}
              {...register("cat")}
              defaultValue="default"
            >
              <option value="default" disabled>
                - Select CAT -
              </option>
              {cats?.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
          </span>
        </div>

        {/* Password Input */}
        <div className="w-100 row justify-fe">
          <InputFieldWithLabelInline
            inputName="password"
            register={register}
            type="password"
            label={true}
            className="px-4 py-1 fs-24"
            labelWidth="250px"
            inputWidth="300px"
            warning={allValues["password"] ? false : true}
          />
        </div>

        {/* Confirm Password Input */}
        <div className="w-100 row justify-fs">
          <InputFieldWithLabelInline
            inputName="confirm password"
            register={register}
            type="password"
            label={true}
            className="px-4 py-1 fs-24"
            labelWidth="250px"
            inputWidth="300px"
            warning={allValues["confirm password"] ? false : true}
          />
        </div>
      </div>

      {errorMessage && (
        <p className="error fs-24 mt-1">{`Error: ${errorMessage}`}</p>
      )}
      <div className="row mt-8">
        <Button mode="active" type="submit" className="fs-24">
          Save
        </Button>
      </div>
    </form>
  );
};

export default Edit;
