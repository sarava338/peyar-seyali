import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchNameByIdForAdmin } from "../../store/nameSlice";

import LoadingScreen from "../../components/LoadingScreen";

import Error from "../Error";

export default function Name() {
  const { nameSlug } = useParams<{ nameSlug: string }>();
  const dispatch = useAppDispatch();
  const { data: name, status, error } = useAppSelector((state) => state.name);

  useEffect(() => {
    if (nameSlug) {
      dispatch(fetchNameByIdForAdmin(nameSlug));
    }
  }, [nameSlug, dispatch]);

  if (status === "loading") return <LoadingScreen />;
  if (error) return <Error code={500} messege={error} />;
  if (!name) return <Error code={404} messege={`Name not found for ${nameSlug}`} />;

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
