import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { fetchNames } from "../../store/namesSlice";

import {
  addName,
  deleteName,
  updateName,
} from "../../firebase/services/nameService";

import NameTable from "../../components/names/NameTable";
import NameAddForm from "../../components/names/NameAddForm";
import NameEditForm from "../../components/names/NameEditForm";

import type { NameDetail, NameFormType } from "../../types";

type NameManagerAction = "view" | "edit" | "add";

export default function NameManager() {
  const [nameManagerAction, setNameManagerAction] =
    useState<NameManagerAction>("view");
  const [selectedName, setSelectedName] = useState<NameDetail | null>(null);

  const dispatch = useAppDispatch();
  const { data: names, status, error } = useAppSelector((state) => state.names);
  const user = useAppSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchNames());
  }, [dispatch]);

  const handleEditClick = (nameSlug: string) => {
    const name = names.find((n) => n.slug === nameSlug);
    if (name) {
      setSelectedName(name);
      setNameManagerAction("edit");
    }
  };

  const handleSubmitNameAddForm = async (nameDetail: NameFormType) => {
    try {
      await addName({ ...nameDetail, author: user?.name } as NameDetail);
      dispatch(fetchNames());
      setNameManagerAction("view");
    } catch (err) {
      const error = err as Error;
      alert(`Error updaing name ${nameDetail.slug} : ${error.message}`);
      console.log(`Error updaing name ${nameDetail.slug}`, error);
    }
  };

  const handleSubmitEditForm = async (nameDetail: NameFormType) => {
    try {
      await updateName(nameDetail.slug!, nameDetail as NameDetail);
      dispatch(fetchNames());
      setNameManagerAction("view");
      setSelectedName(null);
    } catch (err) {
      const error = err as Error;
      alert(`Error updaing name ${nameDetail.slug} : ${error.message}`);
      console.log(`Error updaing name ${nameDetail.slug}`, error);
    }
  };

  const handleCancelFormAction = () => {
    setNameManagerAction("view");
    setSelectedName(null);
  };

  const handleDeleteClick = async (nameSlug: string) => {
    try {
      await deleteName(nameSlug);
    } catch (error) {
      alert(`Error deleting name ${nameSlug} : ${error}`);
    }
  };

  if (status === "loading") return <p>loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <section>
      <h3>Name Manager</h3>

      <button onClick={() => setNameManagerAction("add")}>Add new Name</button>

      {nameManagerAction === "view" ? (
        <NameTable
          names={names}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      ) : nameManagerAction === "edit" ? (
        <NameEditForm
          nameDetail={selectedName!}
          onSubmitEditForm={handleSubmitEditForm}
          onCancelEditForm={handleCancelFormAction}
        />
      ) : (
        <NameAddForm
          onNameSubmit={handleSubmitNameAddForm}
          onCancelSubmit={handleCancelFormAction}
        />
      )}
    </section>
  );
}
