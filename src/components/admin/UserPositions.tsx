/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";

import GlobalVariables from "../../context/GlobalVariables";
import { capitaliseFirstLetter, fetchCall } from "../generic/utility";

import Button from "../generic/Button";

interface UserPosition {
  approval_date: number;
  full_name: string;
  id: string;
  is_instructor: boolean;
  position: string;
  rank: string;
}

interface EditState {
  index: number;
  userPosition: UserPosition;
}

const UserPositions = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);
  const [isEdit, setIsEdit] = useState<EditState>({
    index: -1,
    userPosition: {
      full_name: "",
      id: "",
      is_instructor: false,
      rank: "string",
      position: "",
      approval_date: 0,
    },
  });

  interface Inputs {
    approval_date: string;
    is_instructor: boolean;
    position: string;
  }

  const defaultValues = {
    position: isEdit.userPosition.position,
    approval_date: isEdit.userPosition.approval_date
      ? dayjs.unix(isEdit.userPosition.approval_date).format("YYYY-MM-DD")
      : "",
    is_instructor: isEdit.userPosition.is_instructor,
  };
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit.index]);

  useEffect(() => {
    (async () => {
      try {
        const url =
          process.env.REACT_APP_API_ENDPOINT + `admin/get/user_positions`;
        let res = await fetchCall(url, accessToken.current);

        if (res.status === "authErr") {
          res = await fetchCall(url, localStorage.refreshToken);
          accessToken.current = res.data.access;
        }

        if (!res.data) {
          setUserPositions([]);
          return;
        }

        res.data.userPositions.sort((a: UserPosition, b: UserPosition) => {
          if (a.full_name < b.full_name) {
            return -1;
          }
          if (a.full_name > b.full_name) {
            return 1;
          }

          if (a.position < b.position) {
            return -1;
          }
          if (a.position > b.position) {
            return 1;
          }
          return 0;
        });
        setUserPositions(res.data.userPositions);
      } catch (err: any) {
        console.error(err);
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // Admin Update User API Call
      const url =
        process.env.REACT_APP_API_ENDPOINT +
        `admin/patch/user_positions/${isEdit.userPosition.id}`;
      const body = {
        position: data.position,
        approval_date: dayjs(data.approval_date).unix(),
        is_instructor: data.is_instructor,
      };
      let res = await fetchCall(url, accessToken.current, "PATCH", body);

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken, "PATCH", body);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      const userPosition = {
        ...res.data.userPosition,
        rank: isEdit.userPosition.rank,
        full_name: isEdit.userPosition.full_name,
      };

      setUserPositions((prevState) => {
        const array = [...prevState];
        array.splice(isEdit.index, 1, userPosition);
        array.sort((a, b) => {
          if (a.full_name < b.full_name) {
            return -1;
          }
          if (a.full_name > b.full_name) {
            return 1;
          }

          if (a.approval_date < b.approval_date) {
            return 1;
          }
          if (a.approval_date > b.approval_date) {
            return -1;
          }
          return 0;
        });
        return array;
      });

      setIsEdit({
        index: -1,
        userPosition: {
          full_name: "",
          id: "",
          is_instructor: false,
          rank: "string",
          position: "",
          approval_date: 0,
        },
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onDelete = async (positionId: string, index: number) => {
    try {
      const url =
        process.env.REACT_APP_API_ENDPOINT +
        `admin/delete/user_positions/${positionId}`;
      let res = await fetchCall(url, accessToken.current, "DELETE");

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      setUserPositions((prevState) => {
        const array = [...prevState];
        array.splice(index, 1);
        array.sort((a, b) => {
          if (a.full_name < b.full_name) {
            return -1;
          }
          if (a.full_name > b.full_name) {
            return 1;
          }

          if (a.position < b.position) {
            return -1;
          }
          if (a.position > b.position) {
            return 1;
          }
          return 0;
        });
        return array;
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table__admin">
          <colgroup>
            <col />
            <col style={{ width: "82px" }} />
            <col style={{ width: "221px" }} />
            <col style={{ width: "221px" }} />
            <col style={{ width: "221px" }} />
            <col style={{ width: "64px" }} />
            <col style={{ width: "160px" }} />
          </colgroup>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Rank</th>
              <th>Name</th>
              <th>Position</th>
              <th>Approval Date</th>
              <th>Instructor</th>
              <th>Amend</th>
            </tr>
          </thead>
          <tbody>
            {userPositions.length > 0 ? (
              userPositions.map((element, index) => {
                return (
                  <Row
                    key={index}
                    index={index}
                    userPosition={element}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    register={register}
                    onDelete={onDelete}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={8}>No user positions in database</td>
              </tr>
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
};

interface Props {
  userPosition: UserPosition;
  index: number;
  register: any;
  isEdit: EditState;
  setIsEdit: (state: EditState) => void;
  onDelete: (positionId: string, index: number) => void;
}

const Row = (props: Props) => {
  const { positions } = useContext(GlobalVariables);

  const toggleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.name === "edit") {
      props.setIsEdit({
        index: props.index,
        userPosition: { ...props.userPosition },
      });
    }

    if (event.currentTarget.name === "cancel") {
      props.setIsEdit({
        index: -1,
        userPosition: {
          full_name: "",
          id: "",
          is_instructor: false,
          rank: "string",
          position: "",
          approval_date: 0,
        },
      });
    }
  };

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.userPosition.rank}</td>
      <td>{capitaliseFirstLetter(props.userPosition.full_name)}</td>

      {props.isEdit.index === props.index ? (
        <td>
          <select {...props.register("position")}>
            {positions?.map((element, index) => {
              return (
                <option key={index} value={element}>
                  {element}
                </option>
              );
            })}
          </select>
        </td>
      ) : (
        <td>{props.userPosition.position}</td>
      )}

      {props.isEdit.index === props.index ? (
        <td>
          <input type="date" {...props.register("approval_date")} />
        </td>
      ) : (
        <td>
          {props.userPosition.approval_date
            ? dayjs.unix(props.userPosition.approval_date).format("DD.MM.YYYY")
            : "-"}
        </td>
      )}

      {props.isEdit.index === props.index ? (
        <td>
          <div className="row">
            <label
              htmlFor="table__admin-checkbox"
              className="visually-hidden"
            />
            <input
              type="checkbox"
              id="table__admin-checkbox"
              className="table__admin-checkbox"
              {...props.register("is_instructor")}
            />
          </div>
        </td>
      ) : (
        <td>{props.userPosition.is_instructor ? "Yes" : "No"}</td>
      )}

      {props.isEdit.index === props.index ? (
        <td>
          <div className="row gap-8">
            <Button mode="active" type="submit" className="fs-16" name="save">
              Save
            </Button>
            <Button
              mode="active"
              type="button"
              className="fs-16"
              onClick={toggleEdit}
              name="cancel"
            >
              Cancel
            </Button>
          </div>
        </td>
      ) : (
        <td>
          <div className="row gap-8">
            <Button
              mode="active"
              type="button"
              className="fs-16"
              onClick={toggleEdit}
              name="edit"
            >
              Edit
            </Button>
            <Button
              mode="active"
              type="button"
              className="fs-16"
              name="edit"
              onClick={() => props.onDelete(props.userPosition.id, props.index)}
            >
              Delete
            </Button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default UserPositions;
