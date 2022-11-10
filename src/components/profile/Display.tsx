import React, { useContext } from "react";
import dayjs from "dayjs";

import GlobalVariables from "../../context/GlobalVariables";
import { capitaliseFirstLetter } from "../generic/utility";

import Button from "../generic/Button";

interface Props {
  toggleMode: () => void;
  isEditing: boolean;
}

const Display = (props: Props) => {
  const { userProfile } = useContext(GlobalVariables);

  return (
    <>
      <div className="row justify-sb gap-64 px-8 mb-2">
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Username
          </p>
          <p
            className="pl-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {userProfile?.username}
          </p>
        </div>
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Full Name
          </p>
          <p
            className="pl-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {`${capitaliseFirstLetter(userProfile?.rank)}
            ${capitaliseFirstLetter(userProfile?.full_name)}`}
          </p>
        </div>
      </div>
      <div className="row justify-sb gap-64 px-8 mb-2">
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Id Number
          </p>
          <p
            className="pl-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {userProfile?.id_number}
          </p>
        </div>
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Date Of Birth
          </p>
          <p
            className="pl-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {dayjs
              .unix(userProfile?.date_of_birth as number)
              .format("DD.MM.YYYY")}
          </p>
        </div>
      </div>
      <div className="row justify-sb gap-64 px-8 mb-2">
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Date Accepted
          </p>
          <p
            className="pl-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {dayjs
              .unix(userProfile?.date_accepted as number)
              .format("DD.MM.YYYY")}
          </p>
        </div>
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Reporting Date
          </p>
          <p
            className="pl-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {dayjs
              .unix(userProfile?.reporting_date as number)
              .format("DD.MM.YYYY")}
          </p>
        </div>
      </div>
      <div className="row justify-sb gap-64 px-8">
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Flight
          </p>
          <p
            className="pl-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {capitaliseFirstLetter(userProfile?.flight?.toLowerCase())}
          </p>
        </div>
        <div className="w-100 row">
          <p
            className="pr-4 py-1 fs-24 fw-600"
            style={{ textAlign: "right", width: "250px" }}
          >
            Ops CAT
          </p>
          <p
            className="pl-4 py-1 fs-24"
            style={{ textAlign: "left", width: "300px" }}
          >
            {userProfile?.cat}
          </p>
        </div>
      </div>
      <div className="row mt-8">
        <Button
          mode="active"
          type="button"
          className="fs-24"
          onClick={props.toggleMode}
        >
          Edit Profile
        </Button>
      </div>
    </>
  );
};

export default Display;
