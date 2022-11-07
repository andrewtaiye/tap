import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { ModalState } from "../generic/Modal";

import InputFieldWithLabelInline from "../generic/InputFieldWithLabelInline";
import InputField from "../generic/InputField";
import Button from "../generic/Button";

import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

interface Props {
  setModal: (state: ModalState) => void;
  subtype?: string;
  data?: any;
}

const Assessment = (props: Props) => {
  interface PositionInputs {
    position: string;
    "assessment no": string;
    instructor: string;
    date: string;
    intensity: number;
    objective1: string;
    objective2: string;
    objective3: string;
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: number;
    h: number;
    i: number;
    j: number;
    safety: string;
    remarks: string;
  }

  let defaultValues = {};
  if (props.subtype === "edit") {
    defaultValues = {
      position: props.data.position,
      "assessment no": props.data.id,
      instructor: props.data.instructor,
      date: props.data.date,
      intensity: props.data.intensity,
      objective1: props.data.objective1,
      objective2: props.data.objective2,
      objective3: props.data.objective3,
      a: props.data.a,
      b: props.data.b,
      c: props.data.c,
      d: props.data.d,
      e: props.data.e,
      f: props.data.f,
      g: props.data.g,
      h: props.data.h,
      i: props.data.i,
      j: props.data.j,
      safety: props.data.safety,
      remarks: props.data.remarks,
    };
  }

  const { register, handleSubmit, watch } = useForm<PositionInputs>({
    defaultValues,
  });
  const allValues = watch();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<PositionInputs> = (data) => {
    if (
      !data["position"] ||
      !data["assessment no"] ||
      !data["instructor"] ||
      !data["date"] ||
      !data["intensity"] ||
      !data["objective1"] ||
      !data["a"] ||
      !data["b"] ||
      !data["c"] ||
      !data["d"] ||
      !data["e"] ||
      !data["f"] ||
      !data["g"] ||
      !data["h"] ||
      !data["i"] ||
      !data["j"] ||
      !data["safety"] ||
      !data["remarks"]
    ) {
      setErrorMessage("Please fill in all required fields");
      return;
    } else {
      setErrorMessage("");
    }

    props.setModal({});
  };

  const onDelete = () => {
    props.setModal({});
  };
  return (
    <div className="modal__assessments-container">
      <div className="modal__assessments-scrollarea">
        <p className="bebas fs-48 mb-2">
          {props.subtype === "edit" ? "Edit Assessment" : "Add New Assessment"}
        </p>
        <form
          className="modal_assessments-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="position"
              className="px-4 py-1 fs-24"
              labelWidth="164px"
              inputWidth={{ width: "496px" }}
              type="text"
              register={register}
              warning={allValues["position"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="assessment no"
              className="px-4 py-1 fs-24"
              labelWidth="215px"
              inputWidth={{ width: "192px" }}
              type="text"
              register={register}
              warning={allValues["assessment no"] ? false : true}
            />
          </div>
          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="instructor"
              className="px-4 py-1 fs-24"
              labelWidth="164px"
              inputWidth={{ width: "496px" }}
              type="text"
              register={register}
              warning={allValues["instructor"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="date"
              className="px-4 py-1 fs-24"
              labelWidth="215px"
              inputWidth={{ width: "192px" }}
              type="text"
              register={register}
              warning={allValues["date"] ? false : true}
            />
          </div>
          <div className="row justify-fe mb-2">
            <InputFieldWithLabelInline
              inputName="intensity"
              className="px-4 py-1 fs-24"
              labelWidth="215px"
              inputWidth={{ width: "192px" }}
              type="text"
              register={register}
              warning={allValues["intensity"] ? false : true}
            />
          </div>
          <InputFieldWithLabelInline
            inputName="objective1"
            className="px-4 py-1 fs-24 mb-2"
            labelWidth="164px"
            inputWidth={{ flex: "1 1 auto" }}
            type="text"
            register={register}
            warning={allValues["objective1"] ? false : true}
          />
          <div className="row justify-fe mb-2">
            <InputField
              className="px-4 py-1 fs-24"
              inputName="objective2"
              inputWidth={{ width: "calc(100% - 164px)" }}
              register={register}
              type="text"
            />
          </div>
          <div className="row justify-fe mb-2">
            <InputField
              className="px-4 py-1 fs-24"
              inputName="objective3"
              inputWidth={{ width: "calc(100% - 164px)" }}
              register={register}
              type="text"
            />
          </div>
          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="a"
              className="px-4 py-1 fs-24"
              labelWidth="164px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["a"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="b"
              className="px-4 py-1 fs-24"
              labelWidth="74px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["b"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="c"
              className="px-4 py-1 fs-24"
              labelWidth="74px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["c"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="d"
              className="px-4 py-1 fs-24"
              labelWidth="74px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["d"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="e"
              className="px-4 py-1 fs-24"
              labelWidth="74px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["e"] ? false : true}
            />
          </div>
          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="f"
              className="px-4 py-1 fs-24"
              labelWidth="164px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["f"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="g"
              className="px-4 py-1 fs-24"
              labelWidth="74px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["g"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="h"
              className="px-4 py-1 fs-24"
              labelWidth="74px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["h"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="i"
              className="px-4 py-1 fs-24"
              labelWidth="74px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["i"] ? false : true}
            />
            <InputFieldWithLabelInline
              inputName="j"
              className="px-4 py-1 fs-24"
              labelWidth="74px"
              inputWidth={{ width: "86px" }}
              type="text"
              register={register}
              warning={allValues["j"] ? false : true}
            />
          </div>
          <div className="row justify-fs mb-2">
            <div
              className="row justify-fe gap-8 pr-4 py-1"
              style={{ textAlign: "right", width: "164px" }}
            >
              <p className="fs-24 fw-600">Safety</p>

              {!allValues["safety"] && (
                <Warning
                  className="error"
                  style={{ width: "20px", height: "20px" }}
                />
              )}
            </div>
            <div className="row justify-fs gap-16 pr-4">
              <input
                className="modal__position-reval-checkbox"
                type="radio"
                id="safety-radio-pass"
                value="pass"
                {...register("safety")}
              />
              <label className="fs-24" htmlFor="safety-radio-pass">
                Pass
              </label>
            </div>
            <div className="row justify-fs gap-16">
              <input
                className="modal__position-reval-checkbox"
                type="radio"
                id="safety-radio-fail"
                value="fail"
                {...register("safety")}
              />
              <label className="fs-24" htmlFor="safety-radio-fail">
                Fail
              </label>
            </div>
          </div>
          <div className="row mb-2">
            <div
              className="row justify-fe gap-8 pr-4 py-1"
              style={{ textAlign: "right", width: "164px" }}
            >
              <p className="fs-24 fw-600">Remarks</p>

              {!allValues["remarks"] && (
                <Warning
                  className="error"
                  style={{ width: "20px", height: "20px" }}
                />
              )}
            </div>
            <textarea
              className="fs-24 px-4 py-1"
              style={{ flex: "1 1 auto" }}
              rows={5}
              {...register("remarks")}
            ></textarea>
          </div>
          <div className="row justify-sb">
            <p className="error fs-24" style={{ paddingLeft: "164px" }}>
              {errorMessage ? `Error: ${errorMessage}` : null}
            </p>
            <div className="row gap-32">
              <Button mode="active" type="submit" className="fs-24">
                Submit
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
    </div>
  );
};

export default Assessment;
