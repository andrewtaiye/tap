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
import Button from "../generic/Button";

import { ReactComponent as Warning } from "../../assets/icons/warning.svg";

interface Props {
  setModal: (state: ModalState) => void;
  subtype?: string;
  data?: any;
}

interface Scenarios {
  scenario_number: number;
  id: string;
}

const Assessment = (props: Props) => {
  const { accessToken, positionAssessments, setPositionAssessments } =
    useContext(GlobalVariables);
  const [scenarios, setScenarios] = useState<Scenarios[]>([]);

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
    scenarios: {
      [key: `scenario${number}`]: boolean | string;
    };
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
      scenarios: props.data.scenarios,
    };
  } else if (props.subtype === "add") {
    defaultValues = {
      position: props.data.position,
      "assessment no": positionAssessments!.length + 1,
    };
  }

  const { register, handleSubmit, watch } = useForm<PositionInputs>({
    defaultValues,
  });
  const allValues = watch();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      const url =
        process.env.REACT_APP_API_ENDPOINT +
        `assessment/get/scenarios/${props.data.position}`;
      let res = await fetchCall(url, accessToken.current);

      if (!res.data) {
        return;
      }

      console.log(res.data.scenarios);
      setScenarios(res.data.scenarios);
    })();
  }, []);

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
      allValues["j"] > 10 ||
      allValues["a"] < 1 ||
      allValues["b"] < 1 ||
      allValues["c"] < 1 ||
      allValues["d"] < 1 ||
      allValues["e"] < 1 ||
      allValues["f"] < 1 ||
      allValues["g"] < 1 ||
      allValues["h"] < 1 ||
      allValues["i"] < 1 ||
      allValues["j"] < 1
    ) {
      setErrorMessage("Individual grades must be between 1 and 10");
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
        const url =
          process.env.REACT_APP_API_ENDPOINT +
          `assessment/create/${props.data.positionId}`;
        const body: PositionAssessment = {
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
          scenarios: data["scenarios"],
        };
        let res = await fetchCall(url, accessToken.current, "PUT", body);

        if (res.status === "authErr") {
          res = await fetchCall(url, localStorage.refreshToken, "PUT", body);
          accessToken.current = res.data.access;
        }

        if (res.status !== "ok") {
          console.error(res);
          return;
        }

        body.id = res.data.assessment.id;
        body.user_position_id = props.data.positionId;
        body.grade = res.data.assessment.grade;

        setPositionAssessments?.((prevState) => {
          const array = [...prevState, body];
          array.sort((a, b) => {
            if (a.date < b.date) {
              return -1;
            }

            if (a.date > b.date) {
              return 1;
            }

            if (a.assessment_number < b.assessment_number) {
              return -1;
            }

            if (a.assessment_number > b.assessment_number) {
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
        const url =
          process.env.REACT_APP_API_ENDPOINT +
          `assessment/update/${props.data.id}`;
        const body: PositionAssessment = {
          user_position_id: props.data.user_position_id,
          assessment_number: data["assessment no"],
          instructor: data["instructor"].toLowerCase(),
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
          scenarios: data["scenarios"],
        };
        let res = await fetchCall(url, accessToken.current, "PATCH", body);

        if (res.status === "authErr") {
          res = await fetchCall(url, localStorage.refreshToken, "PATCH", body);
          accessToken.current = res.data.access;
        }

        if (res.status !== "ok") {
          console.error(res);
          return;
        }

        body.id = props.data.id;
        body.grade = res.data.assessment.grade;

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

            if (a.assessment_number < b.assessment_number) {
              return -1;
            }

            if (a.assessment_number > b.assessment_number) {
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
      const url =
        process.env.REACT_APP_API_ENDPOINT +
        `assessment/delete/${props.data.id}`;
      let res = await fetchCall(url, accessToken.current, "DELETE");

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken, "DELETE");
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
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
                  register={register}
                  type="number"
                  label={true}
                  className="px-4 py-1 fs-24"
                  labelWidth="215px"
                  inputWidth="250px"
                  warning={allValues["assessment no"] ? false : true}
                />
              </div>
            </div>
          </div>

          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="instructor"
              register={register}
              type="text"
              label={true}
              className="px-4 py-1 fs-24"
              labelWidth="164px"
              inputWidth="496px"
              warning={allValues["instructor"] ? false : true}
            />

            {/* Date Input */}
            <div className="row justify-fe w-100">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="date"
                  register={register}
                  type="date"
                  label={true}
                  className={`px-4 py-1 fs-24${
                    !allValues["date"] ? " placeholder" : ""
                  }`}
                  labelWidth="215px"
                  inputWidth="250px"
                  inputHeight="52px"
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
                  {...register("simulator")}
                  type="checkbox"
                  id="reval-checkbox"
                  className="input__radio-checkbox"
                />
              </div>
            </div>

            {/* Intensity Input */}
            <div className="row">
              <InputFieldWithLabelInline
                inputName="intensity"
                register={register}
                type="number"
                label={true}
                className="px-4 py-1 fs-24"
                labelWidth="215px"
                inputWidth="250px"
                warning={allValues["intensity"] ? false : true}
              />
            </div>
          </div>

          {/* Objectives Inputs */}
          <InputFieldWithLabelInline
            inputName="objectives"
            register={register}
            type="text"
            label={true}
            className="px-4 py-1 fs-24 mb-2"
            labelWidth="164px"
            warning={allValues["objectives"] ? false : true}
          />
          <InputFieldWithLabelInline
            inputName="objective2"
            register={register}
            type="text"
            label={true}
            labelText=" "
            className="px-4 py-1 fs-24 mb-2"
            labelWidth="164px"
          />
          <InputFieldWithLabelInline
            inputName="objective3"
            register={register}
            type="text"
            label={true}
            labelText=" "
            className="px-4 py-1 fs-24 mb-2"
            labelWidth="164px"
          />

          {/* Grades Inputs */}
          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="a"
              register={register}
              type="number"
              label={true}
              className="px-4 py-1 fs-24"
              labelWidth="164px"
              inputWidth="86px"
              warning={allValues["a"] ? false : true}
              min={1}
              max={10}
            />
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="b"
                  register={register}
                  type="number"
                  label={true}
                  className="px-4 py-1 fs-24"
                  labelWidth="74px"
                  inputWidth="86px"
                  warning={allValues["b"] ? false : true}
                  min={1}
                  max={10}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="c"
                  register={register}
                  type="number"
                  label={true}
                  className="px-4 py-1 fs-24"
                  labelWidth="74px"
                  inputWidth="86px"
                  warning={allValues["c"] ? false : true}
                  min={1}
                  max={10}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="d"
                  register={register}
                  type="number"
                  label={true}
                  className="px-4 py-1 fs-24"
                  labelWidth="74px"
                  inputWidth="86px"
                  warning={allValues["d"] ? false : true}
                  min={1}
                  max={10}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="e"
                  register={register}
                  type="number"
                  label={true}
                  className="px-4 py-1 fs-24"
                  labelWidth="74px"
                  inputWidth="86px"
                  warning={allValues["e"] ? false : true}
                  min={1}
                  max={10}
                />
              </div>
            </div>
          </div>
          <div className="row justify-sb mb-2">
            <InputFieldWithLabelInline
              inputName="f"
              register={register}
              type="number"
              label={true}
              className="px-4 py-1 fs-24"
              labelWidth="164px"
              inputWidth="86px"
              warning={allValues["f"] ? false : true}
              min={1}
              max={10}
            />
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="g"
                  register={register}
                  type="number"
                  label={true}
                  className="px-4 py-1 fs-24"
                  labelWidth="74px"
                  inputWidth="86px"
                  warning={allValues["g"] ? false : true}
                  min={1}
                  max={10}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="h"
                  register={register}
                  type="number"
                  label={true}
                  className="px-4 py-1 fs-24"
                  labelWidth="74px"
                  inputWidth="86px"
                  warning={allValues["h"] ? false : true}
                  min={1}
                  max={10}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="i"
                  register={register}
                  type="number"
                  label={true}
                  className="px-4 py-1 fs-24"
                  labelWidth="74px"
                  inputWidth="86px"
                  warning={allValues["i"] ? false : true}
                  min={1}
                  max={10}
                />
              </div>
            </div>
            <div className="row w-100 justify-fe">
              <div className="row">
                <InputFieldWithLabelInline
                  inputName="j"
                  register={register}
                  type="number"
                  label={true}
                  className="px-4 py-1 fs-24"
                  labelWidth="74px"
                  inputWidth="86px"
                  warning={allValues["j"] ? false : true}
                  min={1}
                  max={10}
                />
              </div>
            </div>
          </div>

          {/* Safety Input */}
          <div className="w-100 row justify-fs mb-2">
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
                className="input__radio-checkbox"
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
                className="input__radio-checkbox"
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

          {/* Scenarios Achieved */}
          <div className="row mb-2">
            <div
              className="row justify-fe gap-8 pr-4 py-1"
              style={{ textAlign: "right", width: "164px" }}
            >
              <p className="fs-24 fw-600">Scenarios</p>
            </div>
            <div className="flex grid gc-10 gap-16">
              {scenarios.map((element, index) => {
                return (
                  <div className="row" key={index}>
                    <label className="row input__assessment-modal__scenario-checkbox">
                      <span>{element.scenario_number}</span>
                      <input
                        style={{ display: "none" }}
                        type="checkbox"
                        value={element.id}
                        {...register(
                          `scenarios.scenario${element.scenario_number}`
                        )}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Error Message and Submit / Update & Delete Buttons */}
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
