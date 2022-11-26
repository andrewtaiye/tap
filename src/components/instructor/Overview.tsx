/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useState } from "react";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";

interface TraineeObject {
  cat_upgrade: string;
  full_name: string;
  position: string;
  position_category: string;
  rank: string;
  start_date: number;
  user_id: string;
  user_position_id: string;
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
      const res = await fetchCall(url, accessToken.current);

      const trainees = res.data.trainees;
      console.log(trainees);

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
    <>
      <div>
        Overview
        {JSON.stringify(catCTrainees)}
        {JSON.stringify(catBTrainees)}
        {JSON.stringify(catATrainees)}
      </div>
      <div className="col">
        <p>Instructor Dashboard</p>
        <p>
          Current Number of Trainees:{" "}
          {catCTrainees.length + catBTrainees.length + catATrainees.length}
        </p>
      </div>
      <div className="grid gc-3 px-8 gap-32">
        <div className="col">
          <p>CAT C Upgrades:</p>
          <div>Aggregated Chart</div>
          <div className="grid gc-2 gap-16">
            <div className="col">Trainees</div>
            <div className="col">% Complete</div>
          </div>
        </div>
        <div className="col">
          <p>CAT B Upgrades:</p>
          <div>Aggregated Chart</div>
          <div className="grid gc-2 gap-16">
            <div className="col">Trainees</div>
            <div className="col">% Complete</div>
          </div>
        </div>
        <div className="col">
          <p>CAT A Upgrades:</p>
          <div>Aggregated Chart</div>
          <div className="grid gc-2 gap-16">
            <div className="col">Trainees</div>
            <div className="col">% Complete</div>
            {catATrainees.map((element, index) => {
              return (
                <Fragment key={index}>
                  <p>{`${element.rank} ${element.full_name}`}</p>
                  <p>xxx%</p>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
