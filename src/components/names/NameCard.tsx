import { Link } from "react-router-dom";

import type { NameDetail } from "../../types";

type NameCardProps = {
  nameDetail: NameDetail;
  styles?: object;
};

export default function NameCard({ nameDetail, styles }: NameCardProps) {
  return (
    <article style={styles}>
      <h3>{nameDetail.name}</h3>
      <p>{nameDetail.description}</p>
      <Link to={`/names/${nameDetail.slug}`}>view more</Link>
    </article>
  );
}
