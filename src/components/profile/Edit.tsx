import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { capitaliseFirstLetter, fetchCall } from "../generic/utility";

import Button from "../generic/Button";
import InputFieldWithLabelInline from "../generic/InputFieldWithLabelInline";

interface Props {
  toggleModal: () => void;
  isEditing: boolean;
  data: {
    id: number;
    username: string;
    password: string;
    rank: string;
    fullName: string;
    idNumber: string;
    dateOfBirth: string;
    dateAccepted: string;
    reportingDate: string;
  };
}

const Edit = (props: Props) => {
  interface Inputs {
    "full name": string;
    "date of birth": string;
    "id number": string;
    "date accepted": string;
    "reporting date": string;
    password: string;
    "confirm password": string;
    warning: boolean;
  }
  const { register, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      "id number": props.data.idNumber,
      "date of birth": props.data.dateOfBirth,
      "date accepted": props.data.dateAccepted,
      "reporting date": props.data.reportingDate,
      password: props.data.password,
      "confirm password": props.data.password,
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
        <div className="w-100 row justify-fe">
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
        <div className="w-100 row justify-fs">
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
            {`${capitaliseFirstLetter(
              props.data.rank
            )}. ${capitaliseFirstLetter(props.data.fullName)}`}
          </p>
        </div>
      </div>
      <div className="row justify-sb gap-64 px-8 mb-2">
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
        <div className="w-100 row justify-fs">
          <InputFieldWithLabelInline
            inputName="date of birth"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "250px" }}
            inputWidth={{ width: "300px" }}
            type="text"
            register={register}
            warning={allValues["date of birth"] ? false : true}
          />
        </div>
      </div>
      <div className="row justify-sb gap-64 px-8">
        <div className="w-100 row justify-fe">
          <InputFieldWithLabelInline
            inputName="date accepted"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "250px" }}
            inputWidth={{ width: "300px" }}
            type="text"
            register={register}
            warning={allValues["date accepted"] ? false : true}
          />
        </div>
        <div className="w-100 row justify-fs">
          <InputFieldWithLabelInline
            inputName="reporting date"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "250px" }}
            inputWidth={{ width: "300px" }}
            type="text"
            register={register}
            warning={allValues["reporting date"] ? false : true}
          />
        </div>
      </div>
      <div className="row justify-sb gap-64 px-8 mt-2">
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
