/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import jwt_decode from "jwt-decode";

import GlobalVariables from "../../context/GlobalVariables";
import { capitaliseFirstLetter, fetchCall } from "../generic/utility";

import Button from "../generic/Button";

interface User {
  full_name: string;
  id: string;
  is_admin: boolean;
  rank: string;
  username: string;
}

interface EditState {
  index: number;
  user: User;
}

const Users = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [users, setUsers] = useState<User[]>([]);
  const [isEdit, setIsEdit] = useState<EditState>({
    index: -1,
    user: {
      full_name: "",
      id: "",
      is_admin: false,
      rank: "string",
      username: "",
    },
  });

  interface Inputs {
    rank: string;
    full_name: string;
    username: string;
    password: string;
    is_admin: boolean;
  }

  const defaultValues = {
    rank: isEdit.user.rank,
    full_name: isEdit.user.full_name,
    username: isEdit.user.username,
    is_admin: isEdit.user.is_admin,
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
        const url = process.env.REACT_APP_API_ENDPOINT + `admin/get/users`;
        let res = await fetchCall(url, accessToken.current);

        if (res.status === "authErr") {
          res = await fetchCall(url, localStorage.refreshToken);
          accessToken.current = res.data.access;
        }

        if (!res.data) {
          setUsers([]);
          return;
        }

        setUsers(res.data.users);
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
        `admin/patch/users/${isEdit.user.id}`;
      const body = {
        rank: data.rank,
        full_name: data.full_name.toLowerCase(),
        username: data.username.toLowerCase(),
        password: data.password,
        is_admin: data.is_admin,
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

      setUsers((prevState) => {
        const array = [...prevState];
        array.splice(isEdit.index, 1, res.data.user);
        return array;
      });

      setIsEdit({
        index: -1,
        user: {
          full_name: "",
          id: "",
          is_admin: false,
          rank: "string",
          username: "",
        },
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onDelete = async (userId: string, index: number) => {
    try {
      const url =
        process.env.REACT_APP_API_ENDPOINT + `admin/delete/users/${userId}`;
      let res = await fetchCall(url, accessToken.current, "DELETE");

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      setUsers((prevState) => {
        const array = [...prevState];
        array.splice(index, 1);
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
              <th>Username</th>
              <th>Password</th>
              <th>Admin</th>
              <th>Amend</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((element, index) => {
                return (
                  <Row
                    key={index}
                    index={index}
                    user={element}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    register={register}
                    onDelete={onDelete}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={8}>No users in database</td>
              </tr>
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
};

interface Props {
  user: User;
  index: number;
  register: any;
  isEdit: EditState;
  setIsEdit: (state: EditState) => void;
  onDelete: (userId: string, index: number) => void;
}

const Row = (props: Props) => {
  const { accessToken, ranks } = useContext(GlobalVariables);

  const decoded: any = jwt_decode(accessToken.current);

  const toggleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.name === "edit") {
      props.setIsEdit({
        index: props.index,
        user: { ...props.user },
      });
    }

    if (event.currentTarget.name === "cancel") {
      props.setIsEdit({
        index: -1,
        user: {
          full_name: "",
          id: "",
          is_admin: false,
          rank: "string",
          username: "",
        },
      });
    }
  };

  return (
    <tr>
      <td>{props.index + 1}</td>
      {props.isEdit.index === props.index ? (
        <td>
          <select {...props.register("rank")}>
            {ranks?.map((element, index) => {
              return (
                <option key={index} value={element}>
                  {element}
                </option>
              );
            })}
          </select>
        </td>
      ) : (
        <td>{props.user.rank}</td>
      )}

      {props.isEdit.index === props.index ? (
        <td>
          <input type="text" {...props.register("full_name")} />
        </td>
      ) : (
        <td>{capitaliseFirstLetter(props.user.full_name)}</td>
      )}

      {props.isEdit.index === props.index ? (
        <td>
          <input type="text" {...props.register("username")} />
        </td>
      ) : (
        <td>{props.user.username}</td>
      )}

      {props.isEdit.index === props.index ? (
        <td>
          <input
            type="password"
            placeholder="●●●●●●●●●●"
            {...props.register("password")}
          />
        </td>
      ) : (
        <td>●●●●●●●●●●</td>
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
              {...props.register("is_admin")}
            />
          </div>
        </td>
      ) : (
        <td>{props.user.is_admin ? "Yes" : "No"}</td>
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
              mode={props.user.id === decoded.userId ? "disabled" : "active"}
              type="button"
              className="fs-16"
              name="edit"
              onClick={() => props.onDelete(props.user.id, props.index)}
            >
              Delete
            </Button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default Users;
