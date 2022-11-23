/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GlobalVariables from "../context/GlobalVariables";

import Main from "../components/instructor/Main";
import Header from "../components/generic/Header";

const Instructor = () => {
  const { isInstructor } = useContext(GlobalVariables);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInstructor) {
      navigate("/assessments");
    }
  }, []);

  return (
    <>
      <Header />
      <Main />
    </>
  );
};

export default Instructor;
