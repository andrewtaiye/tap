import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../generic/Button";

import { fetchCall } from "../generic/utility";
import { ModalState } from "../generic/Modal";

import InputFieldWithLabelInline from "../generic/InputFieldWithLabelInline";

interface Props {
  setModal: (state: ModalState) => void;
  subtype?: string;
  data?: any;
}

const Position = (props: Props) => {
  interface PositionInputs {
    position: string;
    "start date": string;
    "end date"?: string;
    "approval date"?: string;
    revalidation?: boolean;
  }

  let defaultValues = {};
  if (props.subtype === "edit") {
    defaultValues = {
      position: props.data.position,
      "start date": props.data.startDate,
      "end date": props.data.endDate,
      "approval date": props.data.approvalDate,
      revalidation: props.data.revalidation,
    };
  }

  const { register, handleSubmit, watch } = useForm<PositionInputs>({
    defaultValues,
  });
  const allValues = watch();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<PositionInputs> = async (data) => {
    try {
      if (!data["position"] || !data["start date"]) {
        setErrorMessage("Please fill in all required fields");
        return;
      } else {
        setErrorMessage("");
      }

      // Position Create and Update API Call
      const url = `http://127.0.0.1:5001/position/${
        props.subtype === "edit" ? "update" : "create"
      }`;
      const res = await fetchCall(
        url,
        `${props.subtype === "edit" ? "PATCH" : "PUT"}`
      );

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
        <div className="row mb-2">
          <InputFieldWithLabelInline
            inputName="position"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "176px" }}
            inputWidth={{ width: "624px" }}
            type="text"
            register={register}
            warning={allValues["position"] ? false : true}
          />
        </div>
        <div className="row gap-64 mb-2">
          <InputFieldWithLabelInline
            inputName="start date"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "176px" }}
            inputWidth={{ width: "192px" }}
            type="text"
            register={register}
            warning={allValues["start date"] ? false : true}
          />
          <InputFieldWithLabelInline
            inputName="end date"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "176px" }}
            inputWidth={{ width: "192px" }}
            type="text"
            register={register}
          />
        </div>
        <div className="row gap-64 mb-2">
          <InputFieldWithLabelInline
            inputName="approval date"
            className="px-4 py-1 fs-24"
            labelWidth={{ width: "176px" }}
            inputWidth={{ width: "192px" }}
            type="text"
            register={register}
          />

          <div className="row">
            <p
              className="fs-24 fw-600 py-1 pr-4"
              style={{ width: "176px", textAlign: "right" }}
            >
              Revalidation
            </p>
            <div className="row justify-fs" style={{ width: "192px" }}>
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
        <div className="row justify-sb">
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
