import { useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchNames } from "../store/namesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import type { IName } from "../types";

export default function NameTable() {
  const dispatch = useAppDispatch();
  const { data: names, status, error } = useAppSelector((state) => state.names);

  useEffect(() => {
    dispatch(fetchNames());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!names || names.length === 0) return <p>No names found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>NameInEnglish</th>
          <th>Gender</th>
          <th>view</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name: IName) => (
          <tr key={name.id}>
            <td>{name.name}</td>
            <td>{name.nameInEnglish}</td>
            <td>{name.gender}</td>
            <td>
              <Link to={`/names/${name.id}`}>view more</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
