import { useEffect } from "react";

import { fetchNames } from "../store/namesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import NameList from "../components/names/NameList";

export default function Names() {
  const dispatch = useAppDispatch();
  const { publicNames: names, status, error } = useAppSelector((state) => state.names);

  useEffect(() => {
    dispatch(fetchNames());
  }, [dispatch]);

  if (status === "loading") return <p>பெயர்கள் ஏற்றப்படுகிறது...</p>;
  if (error) return <p>பிழை: {error}</p>;
  if (!names || names.length === 0) return <p>பெயர்கள் இல்லை.</p>;

  return (
    <>
      <h2>பெயர்கள் பட்டியல்</h2>
      <NameList names={names} />
    </>
  );
}