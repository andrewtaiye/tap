/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";

import GlobalVariables, {
  PositionAssessment,
} from "../../context/GlobalVariables";
import { capitaliseFirstLetter, fetchCall } from "../generic/utility";
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
  const { setPositionAssessments } = useContext(GlobalVariables);

  interface PositionInputs {
    position: string;
    "assessment no": number;
    instructor: string;
    date: string;
    intensity: number;
    objectives: string;
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
    simulator: boolean;
    remarks: string;
  }

  let defaultValues = {};
  if (props.subtype === "edit") {
    defaultValues = {
      position: props.data.position,
      "assessment no": props.data.assessment_number,
      instructor: props.data.instructor,
      date: dayjs.unix(props.data.date).format("YYYY-MM-DD"),
      intensity: props.data.intensity,
      objectives: props.data.objective1,
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
      safety: props.data.safety ? "pass" : "fail",
      simulator: props.data.is_simulator,
      remarks: props.data.remarks,
    };
  } else if (props.subtype === "add") {
    defaultValues = {
      position: props.data.position,
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
      !allValues["assessment no"] ||
      !allValues["instructor"] ||
      !allValues["date"] ||
      !allValues["intensity"] ||
      !allValues["objectives"] ||
      !allValues["a"] ||
      !allValues["b"] ||
      !allValues["c"] ||
      !allValues["d"] ||
      !allValues["e"] ||
      !allValues["f"] ||
      !allValues["g"] ||
      !allValues["h"] ||
      !allValues["i"] ||
      !allValues["j"] ||
      !allValues["safety"] ||
      !allValues["remarks"]
    ) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    if (allValues["objective3"] && !allValues["objective2"]) {
      setErrorMessage("Please fill in your second objective first");
      return;
    }

    if (
      allValues["a"] > 10 ||
      allValues["b"] > 10 ||
      allValues["c"] > 10 ||
      allValues["d"] > 10 ||
      allValues["e"] > 10 ||
      allValues["f"] > 10 ||
      allValues["g"] > 10 ||
      allValues["h"] > 10 ||
      allValues["i"] > 10 ||
      allValues["j"] > 10
    ) {
      setErrorMessage("Individual grades cannot be more than 10");
      return;
    }

    setErrorMessage("");
  }, [
    allValues["position"],
    allValues["assessment no"],
    allValues["instructor"],
    allValues["date"],
    allValues["intensity"],
    allValues["objectives"],
    allValues["a"],
    allValues["b"],
    allValues["c"],
    allValues["d"],
    allValues["e"],
    allValues["f"],
    allValues["g"],
    allValues["h"],
    allValues["i"],
    allValues["j"],
    allValues["safety"],
    allValues["remarks"],
  ]);

  const onSubmit: SubmitHandler<PositionInputs> = async (data) => {
    try {
      if (errorMessage) return;

      if (props.subtype === "add") {
        // Assessment Create API Call
        const url = `http://127.0.0.1:5001/assessment/create`;
        const body: PositionAssessment = {
          user_position_id: props.data.positionId,
          assessment_number: data["assessment no"],
          instructor: data["instructor"],
          date: dayjs(data["date"]).unix(),
          intensity: data["intensity"],
          objective1: data["objectives"],
          objective2: data["objective2"],
          objective3: data["objective3"],
          a: data["a"],
          b: data["b"],
          c: data["c"],
          d: data["d"],
          e: data["e"],
          f: data["f"],
          g: data["g"],
          h: data["h"],
          i: data["i"],
          j: data["j"],
          safety: data["safety"] === "pass",
          is_simulator: data["simulator"],
          remarks: data["remarks"],
        };
        const res = await fetchCall(url, "PUT", body);

        if (res.status !== "ok") {
          console.error(res);
          return;
        }

        body.id = res.data.assessment_id;
        body.grade = res.data.grade;

        setPositionAssessments?.((prevState) => {
          const array = [...prevState, body];
          array.sort((a, b) => {
            if (a.date! < b.date!) {
              return -1;
            }

            if (a.date! > b.date!) {
              return 1;
            }

            return 0;
          });

          return array;
        });

        props.setModal({});
      }

      if (props.subtype === "edit") {
        // Assessment Update API Call
        const url = `http://127.0.0.1:5001/assessment/update/${props.data.id}`;
        const body: PositionAssessment = {
          user_position_id: props.data.user_position_id,
          assessment_number: data["assessment no"],
          instructor: data["instructor"],
          date: dayjs(data["date"]).unix(),
          intensity: data["intensity"],
          objective1: data["objectives"],
          objective2: data["objective2"],
          objective3: data["objective3"],
          a: data["a"],
          b: data["b"],
          c: data["c"],
          d: data["d"],
          e: data["e"],
          f: data["f"],
          g: data["g"],
          h: data["h"],
          i: data["i"],
          j: data["j"],
          safety: data["safety"] === "pass",
          is_simulator: data["simulator"],
          remarks: data["remarks"],
        };
        const res = await fetchCall(url, "PATCH", body);

        if (res.status !== "ok") {
          console.error(res);
          return;
        }

        body.id = props.data.id;
        body.grade = res.data.grade;

        setPositionAssessments?.((prevState) => {
          const array = [...prevState];
          array.splice(props.data.index, 1, body);
          array.sort((a, b) => {
            if (a.date! < b.date!) {
              return -1;
            }

            if (a.date! > b.date!) {
              return 1;
            }

            return 0;
          });

          return array;
        });

        props.setModal({});
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onDelete = async () => {
    try {
      // Assessment Delete API Call
      const url = `http://127.0.0.1:5001/assessment/delete/${props.data.id}`;
      const res = await fetchCall(url, "DELETE");

      if (res.status !== "ok") {
        console.error(res);
      }

      setPositionAssessments?.((prevState) => {
        const array = [...prevState];
        array.splice(props.data.index, 1);
        array.sort((a, b) => {
          if (a.date! < b.date!) {
            return -1;
          }

          if (a.date! > b.date!) {
            return 1;
          }

          return 0;
        });

        return array;
      });

      props.setModal({});
    } catch (err: any) {
      console.error(err.message);
    }
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
            {/* Position Input */}
            <div className="row w-100">
              <div
                className="row justify-fe gap-8 pr-4 py-1"
                style={{ textAlign: "right", width: "164px" }}
              >
                <p className="fs-24 fw-600">
                  {capitaliseFirstLetter("position")}
                </p>
              </div>

              <span style={{ display: "block", width: "496px" }}>
                <input
                  type="text"
                  style={{
                    textAlign: "left",
                    width: "100%",
                  }}
                  className="px-4 py-1 fs-24"
                  {...register("position")}
                  autoComplete="off"
                  defaultValue={props.data.position}
                  disabled
                />
              </span>
            </div>

            {/* Assessment Number Input */}
            <div className="row justify-fe w-100">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="assessment no"
                  className="px-4 py-1 fs-24"
                  labelWidth={{ width: "215px" }}
                  inputWidth={{ width: "250px" }}
                  type="number"
                  register={register}
                  warning={allValues["assessment no"] ? false : true}
                />
              </div>
            </div>
          </div>

          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="instructor"
              className="px-4 py-1 fs-24"
              labelWidth={{ width: "164px" }}
              inputWidth={{ width: "496px" }}
              type="text"
              register={register}
              warning={allValues["instructor"] ? false : true}
            />

            {/* Date Input */}
            <div className="row justify-fe w-100">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="date"
                  className={`px-4 py-1 fs-24${
                    !allValues["date"] ? " placeholder" : ""
                  }`}
                  labelWidth={{ width: "215px" }}
                  inputWidth={{ width: "250px", height: "52px" }}
                  type="date"
                  register={register}
                  warning={allValues["date"] ? false : true}
                />
              </div>
            </div>
          </div>
          <div className="row justify-sb mb-2">
            {/* Simulator Input */}
            <div className="row">
              <p
                className="fs-24 fw-600 py-1 pr-4"
                style={{ width: "164px", textAlign: "right" }}
              >
                Simulator
              </p>
              <div className="row justify-fs" style={{ width: "250px" }}>
                <label htmlFor="reval-checkbox" className="visually-hidden" />
                <input
                  type="checkbox"
                  id="reval-checkbox"
                  className="modal__position-reval-checkbox"
                  {...register("simulator")}
                />
              </div>
            </div>

            {/* Intensity Input */}
            <div className="row">
              <InputFieldWithLabelInline
                inputName="intensity"
                className="px-4 py-1 fs-24"
                labelWidth={{ width: "215px" }}
                inputWidth={{ width: "250px" }}
                type="number"
                register={register}
                warning={allValues["intensity"] ? false : true}
              />
            </div>
          </div>
          {/* Objectives Inputs */}
          <InputFieldWithLabelInline
            inputName="objectives"
            className="px-4 py-1 fs-24 mb-2"
            labelWidth={{ width: "164px" }}
            inputWidth={{ flex: "1 1 auto" }}
            type="text"
            register={register}
            warning={allValues["objectives"] ? false : true}
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

          {/* Grades Inputs */}
          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="a"
              className="px-4 py-1 fs-24"
              labelWidth={{ width: "164px" }}
              inputWidth={{ width: "86px" }}
              type="number"
              register={register}
              warning={allValues["a"] ? false : true}
            />
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="b"
                  className="px-4 py-1 fs-24"
                  labelWidth={{ width: "74px" }}
                  inputWidth={{ width: "86px" }}
                  type="number"
                  register={register}
                  warning={allValues["b"] ? false : true}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="c"
                  className="px-4 py-1 fs-24"
                  labelWidth={{ width: "74px" }}
                  inputWidth={{ width: "86px" }}
                  type="number"
                  register={register}
                  warning={allValues["c"] ? false : true}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="d"
                  className="px-4 py-1 fs-24"
                  labelWidth={{ width: "74px" }}
                  inputWidth={{ width: "86px" }}
                  type="number"
                  register={register}
                  warning={allValues["d"] ? false : true}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="e"
                  className="px-4 py-1 fs-24"
                  labelWidth={{ width: "74px" }}
                  inputWidth={{ width: "86px" }}
                  type="number"
                  register={register}
                  warning={allValues["e"] ? false : true}
                />
              </div>
            </div>
          </div>
          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="f"
              className="px-4 py-1 fs-24"
              labelWidth={{ width: "164px" }}
              inputWidth={{ width: "86px" }}
              type="number"
              register={register}
              warning={allValues["f"] ? false : true}
            />
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="g"
                  className="px-4 py-1 fs-24"
                  labelWidth={{ width: "74px" }}
                  inputWidth={{ width: "86px" }}
                  type="number"
                  register={register}
                  warning={allValues["g"] ? false : true}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="h"
                  className="px-4 py-1 fs-24"
                  labelWidth={{ width: "74px" }}
                  inputWidth={{ width: "86px" }}
                  type="number"
                  register={register}
                  warning={allValues["h"] ? false : true}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="i"
                  className="px-4 py-1 fs-24"
                  labelWidth={{ width: "74px" }}
                  inputWidth={{ width: "86px" }}
                  type="number"
                  register={register}
                  warning={allValues["i"] ? false : true}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="j"
                  className="px-4 py-1 fs-24"
                  labelWidth={{ width: "74px" }}
                  inputWidth={{ width: "86px" }}
                  type="number"
                  register={register}
                  warning={allValues["j"] ? false : true}
                />
              </div>
            </div>
          </div>

          {/* Safety Input */}
          <div className="row justify-sb mb-2">
            <div className="row">
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
          </div>

          {/* Remarks Input */}
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
