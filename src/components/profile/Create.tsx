import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";

import InputFieldWithLabelStacked from "../generic/InputFieldWithLabelStacked";
import Button from "../generic/Button";

const Create = () => {
  const { setHasProfile } = useContext(GlobalVariables);
  interface Inputs {
    rank: string;
    "full name": string;
    "date of birth": string;
    "identification number": string;
    "date accepted": string;
    "reporting date": string;
    warning: boolean;
  }
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const allValues = watch();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (
        !data["rank"] ||
        !data["full name"] ||
        !data["date of birth"] ||
        !data["identification number"] ||
        !data["date accepted"] ||
        !data["reporting date"]
      ) {
        setErrorMessage("Please fill in all required fields");
        return;
      } else {
        setErrorMessage("");
      }

      // Profile Create API Call
      const url = `http://127.0.0.1:5001/profile/create`;
      const res = await fetchCall(url, "PUT");

      if (res.status === "ok") {
        console.log(res);
        setHasProfile?.(true);
      } else {
        console.error(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="section__container-light">
      <p className="bebas fs-48 mb-2">Create Profile</p>
      <form
        className="grid gc-2"
        style={{ width: "848px", marginInline: "auto", columnGap: "48px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFieldWithLabelStacked
          className="input__profile-create fs-24 fw-400 mb-2"
          inputName="rank"
          register={register}
          type="text"
          warning={allValues["rank"] ? false : true}
        />
        <InputFieldWithLabelStacked
          className="input__profile-create fs-24 fw-400 mb-2"
          inputName="full name"
          register={register}
          type="text"
          warning={allValues["full name"] ? false : true}
        />
        <InputFieldWithLabelStacked
          className="input__profile-create fs-24 fw-400 mb-2"
          inputName="date of birth"
          register={register}
          type="text"
          warning={allValues["date of birth"] ? false : true}
        />
        <InputFieldWithLabelStacked
          className="input__profile-create fs-24 fw-400 mb-2"
          inputName="identification number"
          register={register}
          type="text"
          warning={allValues["identification number"] ? false : true}
        />
        <InputFieldWithLabelStacked
          className="input__profile-create fs-24 fw-400 mb-1"
          inputName="date accepted"
          register={register}
          type="text"
          warning={allValues["date accepted"] ? false : true}
        />
        <InputFieldWithLabelStacked
          className="input__profile-create fs-24 fw-400 mb-1"
          inputName="reporting date"
          register={register}
          type="text"
          warning={allValues["reporting date"] ? false : true}
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
