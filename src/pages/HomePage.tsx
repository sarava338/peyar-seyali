import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNames } from "../store/namesSlice";

import NameList from "../components/NameList";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { data: names, status } = useAppSelector((state) => state.names);

  useEffect(() => {
    dispatch(fetchNames());
  }, [dispatch]);

  return (
    <>
      <h1>பெயர் செயலி</h1>
      <p>Welcome to the home page!</p>

      {status === "loading" ? (
        <p>Loading Names...</p>
      ) : (
        <section>
          <p>Total Names : {names.length}</p>

          <NameList names={names} />
        </section>
      )}
    </>
  );
}
