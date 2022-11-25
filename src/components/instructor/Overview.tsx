/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";

const Overview = () => {
  const { accessToken } = useContext(GlobalVariables);

  useEffect(() => {
    (async () => {
      const url =
        process.env.REACT_APP_API_ENDPOINT + `instructor/get/trainees`;
      const res = await fetchCall(url, accessToken.current);

      console.log(res);
    })();
  }, []);

  return <div>Overview</div>;
};

export default Overview;
