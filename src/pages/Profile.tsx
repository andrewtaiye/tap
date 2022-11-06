import React, { useState } from "react";

import Header from "../components/Header";
import Create from "../components/profile/Create";
import Main from "../components/profile/Main";

const Profile = () => {
  const [hasProfile, setHasProfile] = useState(true);

  return (
    <>
      <Header />
      {hasProfile ? <Main /> : <Create />}
    </>
  );
};

export default Profile;
