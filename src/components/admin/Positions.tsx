/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";

import Button from "../generic/Button";

interface EditState {
  index: number;
  position: string;
}

const Positions = () => {
  const { accessToken, positions, setPositions } = useContext(GlobalVariables);
  const [addNew, setAddNew] = useState(false);
  const [isEdit, setIsEdit] = useState<EditState>({
    index: -1,
    position: "",
  });

  const defaultValues = {
    position: isEdit.position,
  };
  const { register, handleSubmit, reset } = useForm<{ position: string }>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit.index]);

  const toggleAddNew = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddNew(!addNew);
  };

  const onSubmit: SubmitHandler<{ position: string }> = async (data) => {
    try {
      if (addNew) {
        const url = process.env.REACT_APP_API_ENDPOINT + `admin/put/position`;
        const body = { position: data.position };
        let res = await fetchCall(url, accessToken.current, "PUT", body);

        if (res.status === "authErr") {
          res = await fetchCall(url, localStorage.refreshToken, "PUT", body);
          accessToken.current = res.data.access;
        }

        if (res.status !== "ok") {
          console.error(res);
          return;
        }

        setPositions?.((prevState) => {
          const array = [...prevState];
          array.push(data.position);
          array.sort((a, b) => {
            if (a < b) return -1;
            if (a < b) return 1;
            return 0;
          });
          return array;
        });

        setAddNew(!addNew);
        return;
      }

      // Admin Update User API Call
      const url =
        process.env.REACT_APP_API_ENDPOINT +
        `admin/patch/positions/${isEdit.position}`;
      const body = {
        newPosition: data.position,
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

      setPositions?.((prevState) => {
        const array = [...prevState];
        array.splice(isEdit.index, 1, data.position);
        array.sort((a, b) => {
          if (a < b) return -1;
          if (a < b) return 1;
          return 0;
        });
        return array;
      });

      setIsEdit({
        index: -1,
        position: "",
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onDelete = async (position: string, index: number) => {
    try {
      const url =
        process.env.REACT_APP_API_ENDPOINT +
        `admin/delete/positions/${position}`;
      let res = await fetchCall(url, accessToken.current, "DELETE");

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      setPositions?.((prevState) => {
        const array = [...prevState];
        array.splice(index, 1);
        array.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
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
            <col style={{ width: "221px" }} />
            <col style={{ width: "160px" }} />
          </colgroup>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Position</th>
              <th>Amend</th>
            </tr>
          </thead>
          <tbody>
            {positions!.length > 0 ? (
              positions?.map((element, index) => {
                return (
                  <Row
                    key={index}
                    index={index}
                    position={element}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    register={register}
                    onDelete={onDelete}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No positions in database</td>
              </tr>
            )}
            <tr>
              {addNew ? (
                <>
                  <td>{positions!.length + 1}</td>
                  <td>
                    <input type="text" {...register("position")} />
                  </td>
                  <td>
                    <div className="row gap-8">
                      <Button
                        mode="active"
                        type="submit"
                        className="fs-16"
                        name="save"
                      >
                        Save
                      </Button>
                      <Button
                        mode="active"
                        type="button"
                        className="fs-16"
                        onClick={toggleAddNew}
                        name="cancel"
                      >
                        Cancel
                      </Button>
                    </div>
                  </td>
                </>
              ) : (
                <td colSpan={4}>
                  <div className="row">
                    <Button
                      mode="active"
                      type="button"
                      className="w-fit fs-16"
                      onClick={toggleAddNew}
                    >
                      Add new position
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

interface Props {
  position: string;
  index: number;
  register: any;
  isEdit: EditState;
  setIsEdit: (state: EditState) => void;
  onDelete: (position: string, index: number) => void;
}

const Row = (props: Props) => {
  const toggleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.name === "edit") {
      props.setIsEdit({
        index: props.index,
        position: props.position,
      });
    }

    if (event.currentTarget.name === "cancel") {
      props.setIsEdit({
        index: -1,
        position: "",
      });
    }
  };

  return (
    <tr>
      <td>{props.index + 1}</td>
      {props.isEdit.index === props.index ? (
        <td>
          <input type="text" {...props.register("position")} />
        </td>
      ) : (
        <td>{props.position}</td>
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
              onClick={() => props.onDelete(props.position, props.index)}
            >
              Delete
            </Button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default Positions;
