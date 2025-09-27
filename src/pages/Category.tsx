import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNamesWithCategory } from "../store/namesSlice";

import Loading from "./Loading";
import Error from "./Error";

import NameList from "../components/names/NameCards";

export default function Category() {
  const { categorySlug } = useParams();

  const dispatch = useAppDispatch();
  const { categoryNames: names, status, error } = useAppSelector((state) => state.names);

  useEffect(() => {
    if (categorySlug) dispatch(fetchNamesWithCategory(categorySlug));
  }, [categorySlug, dispatch]);

  if (status === "loading") return <Loading />;
  if (error) return <Error code={500} messege={error} />;
  if (!names || names.length === 0) return <Error code={404} messege={`No Names Found for category: ${categorySlug}`} />;

  return (
    <>
      <p>Category Page - {categorySlug}</p>
      <NameList names={names} />
    </>
  );
}
