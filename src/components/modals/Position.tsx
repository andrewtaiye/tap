/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../generic/Button";

import { fetchCall } from "../generic/utility";
import GlobalVariables, { UserPositions } from "../../context/GlobalVariables";
import { ModalState } from "../generic/Modal";

import InputFieldWithLabelInline from "../generic/InputFieldWithLabelInline";
import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

interface Props {
  setModal: (state: ModalState) => void;
  subtype?: string;
  data?: UserPositions;
}

const Position = (props: Props) => {
  const { userId, positions, setUserPositions } = useContext(GlobalVariables);

  interface PositionInputs {
    position: string;
    "start date": string;
    "end date"?: string;
    "approval date"?: string;
    revalidation: boolean;
  }

  let defaultValues = {};
  if (props.subtype === "edit") {
    defaultValues = {
      position: props.data?.position,
      "start date": props.data?.start_date,
      "end date": props.data?.end_date,
      "approval date": props.data?.approval_date,
      revalidation: props.data?.is_revalidation,
    };
  }

  const { register, handleSubmit, watch } = useForm<PositionInputs>({
    defaultValues,
  });
  const allValues = watch();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      !allValues["position"] ||
      allValues["position"] === "default" ||
      !allValues["start date"]
    ) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    if (
      allValues["end date"] &&
      allValues["end date"] < allValues["start date"]
    ) {
      setErrorMessage("End Date cannot be before Start Date");
      return;
    }

    if (allValues["approval date"] && !allValues["end date"]) {
      setErrorMessage("End Date must be specified if Approval Date is entered");
      return;
    }

    if (
      allValues["approval date"] &&
      allValues["end date"] &&
      allValues["approval date"] < allValues["end date"]
    ) {
      setErrorMessage("Approval Date cannot be before End Date");
      return;
    }

    setErrorMessage("");
  }, [
    allValues["position"],
    allValues["start date"],
    allValues["end date"],
    allValues["approval date"],
  ]);

  const onSubmit: SubmitHandler<PositionInputs> = async (data) => {
    try {
      if (errorMessage) return;

      // Position Create and Update API Call
      const url = `http://127.0.0.1:5001/position/${
        props.subtype === "edit" ? `update/${props.data?.id}` : "create"
      }`;
      const body: UserPositions = {
        user_id: userId,
        position: data["position"],
        start_date: data["start date"],
        end_date: data["end date"],
        approval_date: data["approval date"],
        is_revalidation: data["revalidation"],
      };
      const res = await fetchCall(
        url,
        `${props.subtype === "edit" ? "PATCH" : "PUT"}`,
        body
      );

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      body.id = res.data.id;
      body.is_instructor = false;

      setUserPositions?.((prevState: UserPositions[]): UserPositions[] => {
        return [...prevState, body];
      });

      props.setModal({});
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onDelete = async () => {
    try {
      // Position Delete API Call
      const url = `http://127.0.0.1:5001/position/delete`;
      const res = await fetchCall(url, "DELETE");

      if (res.status === "ok") {
        console.log(res);
        props.setModal({});
      } else {
        console.error(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="modal__position-container">
      <p className="bebas fs-48 mb-2">
        {props.subtype === "edit" ? "Edit Position" : "Add New Position"}
      </p>
      <form className="modal__position-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-2 px-4">
          <div
            className="row justify-fe gap-8 pr-4 py-1"
            style={{ textAlign: "right", width: "176px" }}
          >
            <p className="fs-24 fw-600">Position</p>

            {(allValues["position"] === "default" ||
              !allValues["position"]) && (
              <Warning
                className="error"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </div>
          <span style={{ display: "inline-block", flex: "1 1 auto" }}>
            <select
              className={`fs-24 px-4 py-1${
                allValues["position"] === "default" || !allValues["position"]
                  ? " placeholder"
                  : ""
              }`}
              style={{
                width: "100%",
                textAlign: "left",
                appearance: "none",
              }}
              {...register("position")}
              defaultValue="default"
            >
              <option value="default" disabled>
                - Select Position -
              </option>
              {positions?.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
          </span>
        </div>
        <div className="row justify-sb gap-64 mb-2 px-4">
          <InputFieldWithLabelInline
            inputName="start date"
            className={`px-4 py-1 fs-24${
              allValues["start date"] === "default" || !allValues["start date"]
                ? " placeholder"
                : ""
            }`}
            labelWidth={{ width: "176px" }}
            inputWidth={{ width: "278px", height: "52px" }}
            type="date"
            register={register}
            warning={allValues["start date"] ? false : true}
          />
          <InputFieldWithLabelInline
            inputName="end date"
            className={`px-4 py-1 fs-24${
              allValues["end date"] === "default" || !allValues["end date"]
                ? " placeholder"
                : ""
            }`}
            labelWidth={{ width: "176px" }}
            inputWidth={{ width: "278px", height: "52px" }}
            type="date"
            register={register}
          />
        </div>
        <div className="row justify-sb gap-64 mb-2 px-4">
          <InputFieldWithLabelInline
            inputName="approval date"
            className={`px-4 py-1 fs-24${
              allValues["approval date"] === "default" ||
              !allValues["approval date"]
                ? " placeholder"
                : ""
            }`}
            labelWidth={{ width: "176px" }}
            inputWidth={{ width: "278px", height: "52px" }}
            type="date"
            register={register}
          />

          <div className="row w-100">
            <p
              className="fs-24 fw-600 py-1 pr-4"
              style={{ width: "176px", textAlign: "right" }}
            >
              Revalidation
            </p>
            <div className="row justify-fs" style={{ flex: "1 1 auto" }}>
              <label htmlFor="reval-checkbox" className="visually-hidden" />
              <input
                type="checkbox"
                id="reval-checkbox"
                className="modal__position-reval-checkbox"
                {...register("revalidation")}
              />
            </div>
          </div>
        </div>
        <div className="row justify-sb px-4">
          <p className="error fs-24" style={{ paddingLeft: "176px" }}>
            {errorMessage ? `Error: ${errorMessage}` : null}
          </p>
          <div className="row gap-32">
            <Button mode="active" type="submit" className="fs-24">
              {props.subtype === "edit" ? "Update" : "Submit"}
            </Button>
            {props.subtype === "edit" && (
              <Button
                mode="outline"
                type="button"
                className="button__delete fs-24"
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Position;
