import React from "react";

import Button from "../Button";
import { capitaliseFirstLetter } from "../utility";

interface Props {
  handleButtonClick: any;
  isEditing: boolean;
  data: any;
}

const Display = (props: Props) => {
  return (
    <>
      <div className="row justify-sb gap-64 px-8 mb-2">
        <div className="w-100 row justify-fe">
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
            {props.data.username}
          </p>
        </div>
        <div className="w-100 row justify-fs">
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
            {capitaliseFirstLetter(props.data.fullName)}
          </p>
        </div>
      </div>
      <div className="row justify-sb gap-64 px-8 mb-2">
        <div className="w-100 row justify-fe">
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
            {props.data.idNumber}
          </p>
        </div>
        <div className="w-100 row justify-fs">
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
            {props.data.dateOfBirth}
          </p>
        </div>
      </div>
      <div className="row justify-sb gap-64 px-8">
        <div className="w-100 row justify-fe">
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
            {props.data.dateAccepted}
          </p>
        </div>
        <div className="w-100 row justify-fs">
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
            {props.data.reportingDate}
          </p>
        </div>
      </div>
      <div className="row mt-8">
        <Button
          mode="active"
          type="button"
          className="fs-24"
          onClick={props.handleButtonClick}
        >
          Edit Profile
        </Button>
      </div>
    </>
  );
};

export default Display;
