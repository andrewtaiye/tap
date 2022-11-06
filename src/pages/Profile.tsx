import React from "react";

import Header from "../components/Header";
import Create from "../components/profile/Create";
import Main from "../components/profile/Main";

interface Props {
  hasProfile: boolean;
}

const Profile = (props: Props) => {
  return (
    <>
      <Header />
      {props.hasProfile ? <Main /> : <Create />}
    </>
  );
};

export default Profile;
