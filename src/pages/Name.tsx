import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNameById } from "../store/nameDetailSlice";

export default function Name() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { data: nameDetail, status, error } = useAppSelector((state) => state.nameDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchNameById(id));
    }
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading Name Details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!nameDetail) return <p>No name details found.</p>;

  return (
    <>
      <Helmet>
        <title>{nameDetail.name} - பெயர்கள்</title>
        <meta name="description" content={nameDetail.name} />
      </Helmet>

      <article>
        <h2>Name - {nameDetail.name}</h2>
        <p>Created At : {nameDetail.createdAt}</p>
        <p>Updated At : {nameDetail.updatedAt}</p>

        <p>Authored by - {nameDetail.author}</p>
      </article>
    </>
  );
}
