/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import GlobalVariables from "../../context/GlobalVariables";
import Button from "../generic/Button";
import { fetchCall } from "../generic/utility";

interface EditState {
  index: number;
  rank: string;
}

const Ranks = () => {
  const { accessToken } = useContext(GlobalVariables);
  const [ranks, setRanks] = useState<string[]>([]);
  const [addNew, setAddNew] = useState(false);
  const [isEdit, setIsEdit] = useState<EditState>({
    index: -1,
    rank: "",
  });

  const defaultValues = {
    rank: isEdit.rank,
  };
  const { register, handleSubmit, reset } = useForm<{ rank: string }>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [isEdit.index]);

  useEffect(() => {
    (async () => {
      try {
        const url = process.env.REACT_APP_API_ENDPOINT + `admin/get/ranks`;
        let res = await fetchCall(url, accessToken.current);

        if (res.status === "authErr") {
          res = await fetchCall(url, localStorage.refreshToken);
          accessToken.current = res.data.access;
        }

        if (!res.data) {
          setRanks([]);
          return;
        }

        setRanks(res.data.ranks);
      } catch (err: any) {
        console.error(err);
      }
    })();
  }, []);

  const toggleAddNew = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddNew(!addNew);
  };

  const onSubmit: SubmitHandler<{ rank: string }> = async (data) => {
    try {
      if (addNew) {
        const url = process.env.REACT_APP_API_ENDPOINT + `admin/put/rank`;
        const body = { rank: data.rank };
        let res = await fetchCall(url, accessToken.current, "PUT", body);

        if (res.status === "authErr") {
          res = await fetchCall(url, localStorage.refreshToken, "PUT", body);
          accessToken.current = res.data.access;
        }

        if (res.status !== "ok") {
          console.error(res);
          return;
        }

        setRanks((prevState) => {
          const array = [...prevState];
          array.push(data.rank);
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
        process.env.REACT_APP_API_ENDPOINT + `admin/patch/ranks/${isEdit.rank}`;
      const body = {
        newRank: data.rank,
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

      setRanks((prevState) => {
        const array = [...prevState];
        array.splice(isEdit.index, 1, data.rank);
        array.sort((a, b) => {
          if (a < b) return -1;
          if (a < b) return 1;
          return 0;
        });
        return array;
      });

      setIsEdit({
        index: -1,
        rank: "",
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onDelete = async (rank: string, index: number) => {
    try {
      const url =
        process.env.REACT_APP_API_ENDPOINT + `admin/delete/ranks/${rank}`;
      let res = await fetchCall(url, accessToken.current, "DELETE");

      if (res.status === "authErr") {
        res = await fetchCall(url, localStorage.refreshToken);
        accessToken.current = res.data.access;
      }

      if (res.status !== "ok") {
        console.error(res);
        return;
      }

      setRanks((prevState) => {
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
              <th>Rank</th>
              <th>Amend</th>
            </tr>
          </thead>
          <tbody>
            {ranks.length > 0 ? (
              ranks.map((element, index) => {
                return (
                  <Row
                    key={index}
                    index={index}
                    rank={element}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    register={register}
                    onDelete={onDelete}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No ranks in database</td>
              </tr>
            )}
            <tr>
              {addNew ? (
                <>
                  <td>{ranks.length + 1}</td>
                  <td>
                    <input type="text" {...register("rank")} />
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
                      Add new rank
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
  rank: string;
  index: number;
  register: any;
  isEdit: EditState;
  setIsEdit: (state: EditState) => void;
  onDelete: (rank: string, index: number) => void;
}

const Row = (props: Props) => {
  const toggleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.name === "edit") {
      props.setIsEdit({
        index: props.index,
        rank: props.rank,
      });
    }

    if (event.currentTarget.name === "cancel") {
      props.setIsEdit({
        index: -1,
        rank: "",
      });
    }
  };

  return (
    <tr>
      <td>{props.index + 1}</td>
      {props.isEdit.index === props.index ? (
        <td>
          <input type="text" {...props.register("rank")} />
        </td>
      ) : (
        <td>{props.rank}</td>
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
              onClick={() => props.onDelete(props.rank, props.index)}
            >
              Delete
            </Button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default Ranks;
