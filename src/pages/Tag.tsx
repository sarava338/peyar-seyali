import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNamesWithTag } from "../store/namesSlice";

import Loading from "./Loading";
import Error from "./Error";

import NameList from "../components/names/NameList";

export default function Tag() {
  const { tagSlug } = useParams();

  const dispatch = useAppDispatch();
  const { tagNames: names, status, error } = useAppSelector((state) => state.names);

  useEffect(() => {
    if (tagSlug) dispatch(fetchNamesWithTag(tagSlug));
  }, [tagSlug, dispatch]);

  if (status === "loading") return <Loading />;
  if (error) return <Error code={500} messege={error} />;
  if (!names || names.length === 0) return <Error code={404} messege={`No Names Found for tag: ${tagSlug}`} />;

  return (
    <>
      <p>Tag Page - {tagSlug}</p>
      <NameList names={names} />
    </>
  );
}
