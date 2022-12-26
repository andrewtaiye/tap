/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useState } from "react";

import GlobalVariables from "../../context/GlobalVariables";
import { capitaliseFirstLetter, fetchCall } from "../generic/utility";

interface TraineeObject {
  cat_upgrade: string;
  full_name: string;
  position: string;
  position_category: string;
  rank: string;
  start_date: number;
  user_id: string;
  user_position_id: string;
  percentage: number;
}

const Overview = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [catCTrainees, setCatCTrainees] = useState<TraineeObject[]>([]);
  const [catBTrainees, setCatBTrainees] = useState<TraineeObject[]>([]);
  const [catATrainees, setCatATrainees] = useState<TraineeObject[]>([]);

  useEffect(() => {
    (async () => {
      const url =
        process.env.REACT_APP_API_ENDPOINT + `instructor/get/trainees`;
      let res = await fetchCall(url, accessToken.current);

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res.message);
        return;
      }

      const trainees = res.data.trainees;

      const catC = [];
      const catB = [];
      const catA = [];

      for (const trainee of trainees) {
        if (trainee.cat_upgrade === "C") {
          catC.push(trainee);
        }
        if (trainee.cat_upgrade === "B") {
          catB.push(trainee);
        }
        if (trainee.cat_upgrade === "A") {
          catA.push(trainee);
        }
      }

      setCatCTrainees(catC);
      setCatBTrainees(catB);
      setCatATrainees(catA);
    })();
  }, []);

  return (
    <div className="row section__container-light">
      <div className="instructor__overview__container">
        <div className="col mb-4">
          <p className="bebas fs-48">Instructor Dashboard</p>
          <p className="fs-24 fw-600">
            Current Number of Trainees:{" "}
            <span className="fw-400">
              {catCTrainees.length + catBTrainees.length + catATrainees.length}
            </span>
          </p>
        </div>
        <div className="grid gc-3 px-8 gap-32 fs-24">
          <div className="col gap-16">
            <p className="fw-600">
              CAT C Upgrades:{" "}
              <span className="fw-400">{catCTrainees.length}</span>
            </p>
            {/* <div
              className="row"
              style={{
                aspectRatio: "16 / 9",
                width: "100%",
                border: "1px solid black",
              }}
            >
              Aggregated Chart
            </div> */}
            <div className="grid gc-2 gap-16">
              <div className="fw-600">Trainees</div>
              <div className="fw-600">% Complete</div>
            </div>
            <div className="grid gc-2">
              {catCTrainees.length === 0 ? (
                <p style={{ gridColumn: "span 2" }}>No Trainees</p>
              ) : (
                <>
                  {catCTrainees.map((element, index) => {
                    return (
                      <Fragment key={index}>
                        <p>{`${element.rank} ${capitaliseFirstLetter(
                          element.full_name
                        )}`}</p>
                        <p>{element.percentage}%</p>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className="col gap-16">
            <p className="fw-600">
              CAT B Upgrades:{" "}
              <span className="fw-400">{catBTrainees.length}</span>
            </p>
            {/* <div
              className="row"
              style={{
                aspectRatio: "16 / 9",
                width: "100%",
                border: "1px solid black",
              }}
            >
              Aggregated Chart
            </div> */}
            <div className="grid gc-2 gap-16">
              <div className="fw-600">Trainees</div>
              <div className="fw-600">% Complete</div>
            </div>
            <div className="grid gc-2">
              {catBTrainees.length === 0 ? (
                <p style={{ gridColumn: "span 2" }}>No Trainees</p>
              ) : (
                <>
                  {catBTrainees.map((element, index) => {
                    return (
                      <Fragment key={index}>
                        <p>{`${element.rank} ${capitaliseFirstLetter(
                          element.full_name
                        )}`}</p>
                        <p>{element.percentage}%</p>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <div className="col gap-16">
            <p className="fw-600">
              CAT A Upgrades:{" "}
              <span className="fw-400">{catATrainees.length}</span>
            </p>
            {/* <div
              className="row"
              style={{
                aspectRatio: "16 / 9",
                width: "100%",
                border: "1px solid black",
              }}
            >
              Aggregated Chart
            </div> */}
            <div className="grid gc-2 gap-16">
              <div className="fw-600">Trainees</div>
              <div className="fw-600">% Complete</div>
            </div>
            <div className="grid gc-2">
              {catATrainees.length === 0 ? (
                <p style={{ gridColumn: "span 2" }}>No Trainees</p>
              ) : (
                <>
                  {catATrainees.map((element, index) => {
                    return (
                      <Fragment key={index}>
                        <p>{`${element.rank} ${capitaliseFirstLetter(
                          element.full_name
                        )}`}</p>
                        <p>{element.percentage}%</p>
                      </Fragment>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
