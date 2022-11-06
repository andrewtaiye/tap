import React from "react";

import Header from "../components/generic/Header";
import Create from "../components/profile/Create";
import Main from "../components/profile/Main";

interface Props {
  hasProfile: boolean;
  userId: number;
}

const Profile = (props: Props) => {
  return (
    <>
      <Header />
      {props.hasProfile ? <Main userId={props.userId} /> : <Create />}
    </>
  );
};

export default Profile;
