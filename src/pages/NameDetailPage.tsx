import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { fetchNameById } from "../store/nameDetailSlice";

export default function NameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    data: nameDetail,
    status,
    error,
  } = useAppSelector((state) => state.nameDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchNameById(id));
    }
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading Name Details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!nameDetail) return <p>No name details found.</p>;

  return (
    <main>
      <h2>Name - {nameDetail.name}</h2>
      <p>Created At : {nameDetail.createdAt}</p>
      <p>Updated At : {nameDetail.updatedAt}</p>

      <p>Authored by - {nameDetail.author}</p>
    </main>
  );
}
