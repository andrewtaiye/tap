import React from "react";

import { UserProfile } from "./Main";
import { capitaliseFirstLetter } from "../generic/utility";

import Button from "../generic/Button";

interface Props {
  toggleModal: () => void;
  isEditing: boolean;
  data: UserProfile;
}

const Display = (props: Props) => {
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
            {props.data.username}
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
            {`${capitaliseFirstLetter(props.data.rank)}
            ${capitaliseFirstLetter(props.data.full_name)}`}
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
            {props.data.id_number}
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
            {props.data.date_of_birth
              ?.split("T")[0]
              .split("-")
              .reverse()
              .join(".")}
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
            {props.data.date_accepted
              ?.split("T")[0]
              .split("-")
              .reverse()
              .join(".")}
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
            {props.data.reporting_date
              ?.split("T")[0]
              .split("-")
              .reverse()
              .join(".")}
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
            {capitaliseFirstLetter(props.data.flight?.toLowerCase())}
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
            {props.data.cat}
          </p>
        </div>
      </div>
      <div className="row mt-8">
        <Button
          mode="active"
          type="button"
          className="fs-24"
          onClick={props.toggleModal}
        >
          Edit Profile
        </Button>
      </div>
    </>
  );
};

export default Display;
