import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchNameByIdForAdmin } from "../../store/nameSlice";

export default function Name() {
  const { nameSlug } = useParams<{ nameSlug: string }>();
  const dispatch = useAppDispatch();
  const { data: name, status, error } = useAppSelector((state) => state.name);

  useEffect(() => {
    if (nameSlug) {
      dispatch(fetchNameByIdForAdmin(nameSlug));
    }
  }, [nameSlug, dispatch]);

  if (status === "loading") return <p>Loading Name Details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!name) return <p>No name details found.</p>;

  return (
    <>
      <Helmet>
        <title>{name.name} - பெயர் - நிர்வாகம்</title>
        <meta name="description" content={name.name} />
      </Helmet>

      <main>
        <h1>Name - {name.name}</h1>
        <p>Created At: {name.createdAt}</p>
        <p>Updated At: {name.updatedAt}</p>
        <p>Authored by: {name.author}</p>
      </main>
    </>
  );
}
