/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import GlobalVariables from "../../context/GlobalVariables";
import { fetchCall } from "../generic/utility";

import Button from "../generic/Button";

interface EditState {
  index: number;
  cat: string;
}

const Cats = () => {
  const { accessToken, cats, setCats } = useContext(GlobalVariables);
  const [addNew, setAddNew] = useState(false);
  const [isEdit, setIsEdit] = useState<EditState>({
    index: -1,
    cat: "",
  });

  const defaultValues = {
    cat: isEdit.cat,
  };
  const { register, handleSubmit, reset } = useForm<{ cat: string }>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit.index]);

  const toggleAddNew = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddNew(!addNew);
  };

  const onSubmit: SubmitHandler<{ cat: string }> = async (data) => {
    try {
      if (addNew) {
        const url = process.env.REACT_APP_API_ENDPOINT + `admin/put/cat`;
        const body = { cat: data.cat.toUpperCase() };
        let res = await fetchCall(url, accessToken.current, "PUT", body);

        if (res.status === "authErr") {
          res = await fetchCall(url, localStorage.refreshToken, "PUT", body);
          accessToken.current = res.data.access;
        }

        if (res.status !== "ok") {
          console.error(res);
          return;
        }

        setCats?.((prevState) => {
          const array = [...prevState];
          array.push(data.cat);
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
        process.env.REACT_APP_API_ENDPOINT + `admin/patch/cats/${isEdit.cat}`;
      const body = {
        newCat: data.cat.toUpperCase(),
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

      setCats?.((prevState) => {
        const array = [...prevState];
        array.splice(isEdit.index, 1, data.cat);
        array.sort((a, b) => {
          if (a < b) return -1;
          if (a < b) return 1;
          return 0;
        });
        return array;
      });

      setIsEdit({
        index: -1,
        cat: "",
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onDelete = async (cat: string, index: number) => {
    try {
      const url =
        process.env.REACT_APP_API_ENDPOINT + `admin/delete/cats/${cat}`;
      let res = await fetchCall(url, accessToken.current, "DELETE");

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      setCats?.((prevState) => {
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
              <th>CAT</th>
              <th>Amend</th>
            </tr>
          </thead>
          <tbody>
            {cats!.length > 0 ? (
              cats?.map((element, index) => {
                return (
                  <Row
                    key={index}
                    index={index}
                    cat={element}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    register={register}
                    onDelete={onDelete}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No CATs in database</td>
              </tr>
            )}
            <tr>
              {addNew ? (
                <>
                  <td>{cats!.length + 1}</td>
                  <td>
                    <input type="text" {...register("cat")} />
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
                      Add new CAT
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
  cat: string;
  index: number;
  register: any;
  isEdit: EditState;
  setIsEdit: (state: EditState) => void;
  onDelete: (cat: string, index: number) => void;
}

const Row = (props: Props) => {
  const toggleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.name === "edit") {
      props.setIsEdit({
        index: props.index,
        cat: props.cat,
      });
    }

    if (event.currentTarget.name === "cancel") {
      props.setIsEdit({
        index: -1,
        cat: "",
      });
    }
  };

  return (
    <tr>
      <td>{props.index + 1}</td>
      {props.isEdit.index === props.index ? (
        <td>
          <input type="text" {...props.register("cat")} />
        </td>
      ) : (
        <td>{props.cat}</td>
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
              onClick={() => props.onDelete(props.cat, props.index)}
            >
              Delete
            </Button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default Cats;
