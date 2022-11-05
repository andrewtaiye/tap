import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import InputFieldWithLabelStacked from "../InputFieldWithLabelStacked";
import Button from "../Button";

const Create = () => {
  interface Inputs {
    salutation: string;
    "full name": string;
    "date of birth": string;
    "identification number": string;
    "date accepted": string;
    "reporting date": string;
  }
  const { register, handleSubmit } = useForm<Inputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({ data });
    if (
      !data["salutation"] ||
      !data["full name"] ||
      !data["date of birth"] ||
      !data["identification number"] ||
      !data["date accepted"] ||
      !data["reporting date"]
    ) {
      setErrorMessage("Invalid Username or Password");
      return;
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="section__container--light">
      <p className="bebas fs-48 mb-2">Create Profile</p>
      <form
        className="grid gc-2"
        style={{ width: "848px", marginInline: "auto", columnGap: "48px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFieldWithLabelStacked
          className="input__profile__create fs-24 fw-400 mb-2"
          inputName="salutation"
          register={register}
          type="text"
        />
        <InputFieldWithLabelStacked
          className="input__profile__create fs-24 fw-400 mb-2"
          inputName="full name"
          register={register}
          type="text"
        />
        <InputFieldWithLabelStacked
          className="input__profile__create fs-24 fw-400 mb-2"
          inputName="date of birth"
          register={register}
          type="text"
        />
        <InputFieldWithLabelStacked
          className="input__profile__create fs-24 fw-400 mb-2"
          inputName="identification number"
          register={register}
          type="text"
        />
        <InputFieldWithLabelStacked
          className="input__profile__create fs-24 fw-400 mb-1"
          inputName="date accepted"
          register={register}
          type="text"
        />
        <InputFieldWithLabelStacked
          className="input__profile__create fs-24 fw-400 mb-1"
          inputName="reporting date"
          register={register}
          type="text"
        />

        {errorMessage && (
          <p
            className="error fs-24"
            style={{ alignSelf: "flex-start", textAlign: "left" }}
          >{`Error: ${errorMessage}`}</p>
        )}

        <div
          className="mt-8"
          style={{ gridColumn: "1 / span 2", marginInline: "auto" }}
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
