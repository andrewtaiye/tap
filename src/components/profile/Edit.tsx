import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { UserProfile } from "./Main";
import { capitaliseFirstLetter, fetchCall } from "../generic/utility";
import GlobalVariables from "../../context/GlobalVariables";

import Button from "../generic/Button";
import InputFieldWithLabelInline from "../generic/InputFieldWithLabelInline";
import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

interface Props {
  toggleModal: () => void;
  isEditing: boolean;
  data: UserProfile;
}

const Edit = (props: Props) => {
  const { flights, cats } = useContext(GlobalVariables);
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
      "id number": props.data.id_number,
      "date of birth": props.data.date_of_birth?.split("T")[0],
      "date accepted": props.data.date_accepted?.split("T")[0],
      "reporting date": props.data.reporting_date?.split("T")[0],
      flight: props.data.flight,
      cat: props.data.cat,
    },
  });
  const allValues = watch();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (
        !data["id number"] ||
        !data["date of birth"] ||
        !data["date accepted"] ||
        !data["reporting date"] ||
        !data["password"] ||
        !data["confirm password"]
      ) {
        setErrorMessage("Please fill in all required fields");
        return;
      } else {
        setErrorMessage("");
      }

      if (data["password"] !== data["confirm password"]) {
        setErrorMessage("Passwords do not match");
        return;
      } else {
        setErrorMessage("");
      }

      // Profile Update API Call
      const url = `http://127.0.0.1:5001/profile/update`;
      const res = await fetchCall(url, "PATCH");

      if (res.status === "ok") {
        console.log(res);
        props.toggleModal();
      } else {
        console.error(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row justify-sb gap-64 px-8 mb-2">
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
            {props.data.username}
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
            {`${capitaliseFirstLetter(props.data.rank)}
            ${capitaliseFirstLetter(props.data.full_name)}`}
          </p>
        </div>
      </div>

      <div className="row justify-sb gap-64 px-8 mb-2">
        {/* ID Number Input */}
        <div className="w-100 row justify-fe">
          <InputFieldWithLabelInline
            inputName="id number"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "250px" }}
            inputWidth={{ width: "300px" }}
            type="text"
            register={register}
            warning={allValues["id number"] ? false : true}
          />
        </div>

        {/* DOB Input */}
        <div className="w-100 row justify-fs">
          <InputFieldWithLabelInline
            inputName="date of birth"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "250px" }}
            inputWidth={{ width: "300px", height: "52px" }}
            type="date"
            register={register}
            warning={allValues["date of birth"] ? false : true}
          />
        </div>
      </div>

      <div className="row justify-sb gap-64 px-8 mb-2">
        {/* Enlistment Date Input */}
        <div className="w-100 row justify-fe">
          <InputFieldWithLabelInline
            inputName="date accepted"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "250px" }}
            inputWidth={{ width: "300px", height: "52px" }}
            type="date"
            register={register}
            warning={allValues["date accepted"] ? false : true}
          />
        </div>

        {/* Post-In Date Input */}
        <div className="w-100 row justify-fs">
          <InputFieldWithLabelInline
            inputName="reporting date"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "250px" }}
            inputWidth={{ width: "300px", height: "52px" }}
            type="date"
            register={register}
            warning={allValues["reporting date"] ? false : true}
          />
        </div>
      </div>

      <div className="row justify-sb gap-64 px-8">
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
      </div>

      <div className="row justify-sb gap-64 px-8 mt-2">
        {/* Password Input */}
        <div className="w-100 row justify-fe">
          <InputFieldWithLabelInline
            inputName="password"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "250px" }}
            inputWidth={{ width: "300px" }}
            type="password"
            register={register}
            warning={allValues["password"] ? false : true}
          />
        </div>

        {/* Confirm Password Input */}
        <div className="w-100 row justify-fs">
          <InputFieldWithLabelInline
            inputName="confirm password"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "250px" }}
            inputWidth={{ width: "300px" }}
            type="password"
            register={register}
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
