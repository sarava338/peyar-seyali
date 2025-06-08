import { Link } from "react-router-dom";

import type { IName } from "../types";

type NameCardProps = {
  nameDetail: IName;
  styles?: object;
};

export default function NameCard({ nameDetail, styles }: NameCardProps) {
  return (
    <article style={styles}>
      <h3>{nameDetail.name}</h3>
      <p>{nameDetail.description}</p>
      <Link to={`/names/${nameDetail.id}`}>view more</Link>
    </article>
  );
}
