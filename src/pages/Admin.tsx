/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GlobalVariables from "../context/GlobalVariables";

import Main from "../components/admin/Main";
import Header from "../components/generic/Header";

const Admin = () => {
  const { isAdmin } = useContext(GlobalVariables);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
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

export default Admin;
