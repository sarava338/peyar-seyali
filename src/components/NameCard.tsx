import { Link } from "react-router-dom";
import type { IName } from "../types";

type NameCardProps = {
  nameDetail: IName;
};

export default function NameCard({ nameDetail }: NameCardProps) {
  return (
    <article>
      <h3>{nameDetail.name}</h3>
      <p>{nameDetail.description}</p>
      <Link to={`/names/${nameDetail.id}`}>view</Link>
    </article>
  );
}
