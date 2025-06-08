import NameCard from "./NameCard";

import type { IName } from "../types";

type NameListProps = {
  names: IName[];
};

export default function NameList({ names }: NameListProps) {
  return (
    <section>
      <p>Name List</p>
      {names.map((nameDetail) => (
        <NameCard key={nameDetail.id} nameDetail={nameDetail} />
      ))}
    </section>
  );
}
