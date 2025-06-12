import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNames } from "../store/namesSlice";

import NameList from "../components/names/NameList";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { data: names, status } = useAppSelector((state) => state.names);

  useEffect(() => {
    dispatch(fetchNames());
  }, [dispatch]);

  return (
    <>
      {status === "loading" ? (
        <p>Loading Names...</p>
      ) : (
        <section>
          <h2>Total Names : {names.length}</h2>

          <NameList names={names} />
        </section>
      )}
    </>
  );
}
