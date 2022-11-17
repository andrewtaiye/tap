/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";

import GlobalVariables from "../../context/GlobalVariables";
import { capitaliseFirstLetter, fetchCall } from "../generic/utility";

import InputFieldWithLabelStacked from "../generic/InputFieldWithLabelStacked";
import Button from "../generic/Button";
import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

const Create = () => {
  const { accessToken, setHasProfile, userId, ranks, flights, cats } =
    useContext(GlobalVariables);

  interface Inputs {
    rank: string;
    "full name": string;
    "date of birth": string;
    "identification number": string;
    "date accepted": string;
    "reporting date": string;
    warning: boolean;
    flight: string;
    cat: string;
  }
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const allValues = watch();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      allValues["rank"] === "default" ||
      !allValues["rank"] ||
      !allValues["full name"] ||
      !allValues["date of birth"] ||
      !allValues["identification number"] ||
      !allValues["date accepted"] ||
      !allValues["reporting date"] ||
      allValues["flight"] === "default" ||
      !allValues["flight"] ||
      allValues["cat"] === "default" ||
      !allValues["cat"]
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
    setErrorMessage("");
  }, [
    allValues["rank"],
    allValues["full name"],
    allValues["date of birth"],
    allValues["identification number"],
    allValues["date accepted"],
    allValues["reporting date"],
    allValues["flight"],
    allValues["cat"],
  ]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // Profile Create API Call
      const url = process.env.REACT_APP_API_ENDPOINT + `profile/create`;
      const body = {
        userId: userId,
        rank: data["rank"],
        full_name: data["full name"],
        date_of_birth: dayjs(data["date of birth"]).unix(),
        id_number: data["identification number"],
        enlistmentDate: dayjs(data["date accepted"]).unix(),
        postInDate: dayjs(data["reporting date"]).unix(),
        flight: data["flight"],
        cat: data["cat"],
      };
      let res = await fetchCall(url, accessToken.current, "PUT", body);

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken, "PUT", body);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
      }
      setErrorMessage("");
      setHasProfile?.(true);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="section__container-light">
      {/* Title */}
      <p className="bebas fs-48 mb-2">Create Profile</p>

      {/* Start of Form */}
      <form
        className="grid gc-2"
        style={{ width: "848px", marginInline: "auto", columnGap: "48px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Rank Input */}
        <div className="col">
          <div className="row justify-fe alignSelf-start gap-8 mb-1">
            <p className="fs-24 fw-600">Rank</p>

            {(allValues["rank"] === "default" || !allValues["rank"]) && (
              <Warning
                className="error"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </div>
          <select
            className={`fs-24 px-4 py-1 mb-2${
              allValues["rank"] === "default" || !allValues["rank"]
                ? " placeholder"
                : ""
            }`}
            style={{
              width: "100%",
              textAlign: "left",
              appearance: "none",
            }}
            {...register("rank")}
            defaultValue="default"
          >
            <option value="default" disabled>
              - Select Rank -
            </option>
            {ranks?.map((element, index) => {
              return (
                <option key={index} value={element}>
                  {element}
                </option>
              );
            })}
          </select>
        </div>

        {/* Name Input */}
        <InputFieldWithLabelStacked
          className="input__profile-create fs-24 fw-400 mb-2"
          inputName="full name"
          register={register}
          type="text"
          warning={allValues["full name"] ? false : true}
        />

        {/* DOB Input */}
        <InputFieldWithLabelStacked
          className={`input__profile-create fs-24 fw-400 mb-2${
            !allValues["date of birth"] ? " placeholder" : ""
          }`}
          inputName="date of birth"
          register={register}
          type="date"
          warning={allValues["date of birth"] ? false : true}
        />

        {/* ID Number Input */}
        <InputFieldWithLabelStacked
          className="input__profile-create fs-24 fw-400 mb-2"
          inputName="identification number"
          register={register}
          type="text"
          warning={allValues["identification number"] ? false : true}
        />

        {/* Enlistment Date Input */}
        <InputFieldWithLabelStacked
          className={`input__profile-create fs-24 fw-400 mb-2${
            !allValues["date accepted"] ? " placeholder" : ""
          }`}
          inputName="date accepted"
          register={register}
          type="date"
          warning={allValues["date accepted"] ? false : true}
        />

        {/* Post-In Date Input */}
        <InputFieldWithLabelStacked
          className={`input__profile-create fs-24 fw-400 mb-2${
            !allValues["reporting date"] ? " placeholder" : ""
          }`}
          inputName="reporting date"
          register={register}
          type="date"
          warning={allValues["reporting date"] ? false : true}
        />

        {/* Flight Input */}
        <div className="col">
          <div className="row justify-fe alignSelf-start gap-8 mb-1">
            <p className="fs-24 fw-600">Flight</p>

            {(allValues["flight"] === "default" || !allValues["flight"]) && (
              <Warning
                className="error"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </div>
          <select
            className={`fs-24 px-4 py-1 mb-2${
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
        </div>

        {/* CAT Input */}
        <div className="col">
          <div className="row justify-fe alignSelf-start gap-8 mb-1">
            <p className="fs-24 fw-600">Ops Cat</p>

            {(allValues["cat"] === "default" || !allValues["cat"]) && (
              <Warning
                className="error"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </div>
          <select
            className={`fs-24 px-4 py-1 mb-2${
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
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <p
            className="error fs-24"
            style={{
              alignSelf: "flex-start",
              textAlign: "left",
              gridColumn: "span 2",
            }}
          >{`Error: ${errorMessage}`}</p>
        )}

        {/* Submit Button */}
        <div
          className="mt-8"
          style={{ gridColumn: "span 2", marginInline: "auto" }}
        >
          <Button mode="active" type="submit" className="fs-32 fw-400">
            Create Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create;
