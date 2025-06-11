import NameCard from "./NameCard";

import type { NameDetail } from "../../types";

type NameListProps = {
  names: NameDetail[];
};

export default function NameList({ names }: NameListProps) {
  return (
    <section>
      <p>Name List</p>
      {names.map((nameDetail) => (
        <NameCard key={nameDetail.slug} nameDetail={nameDetail} />
      ))}
    </section>
  );
}
