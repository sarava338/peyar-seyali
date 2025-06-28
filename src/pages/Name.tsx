import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNameById } from "../store/nameSlice";

export default function Name() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { data: name, status, error } = useAppSelector((state) => state.name);

  useEffect(() => {
    if (id) {
      dispatch(fetchNameById(id));
    }
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading Name Details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!name) return <p>No name details found.</p>;

  return (
    <>
      <Helmet>
        <title>{name.name} - பெயர்கள்</title>
        <meta name="description" content={name.name} />
      </Helmet>

      <article>
        <h2>Name - {name.name}</h2>
        <p>Created At : {name.createdAt}</p>
        <p>Updated At : {name.updatedAt}</p>

        <p>Authored by - {name.author}</p>
      </article>
    </>
  );
}
