import { useEffect } from "react";

import { fetchNames } from "../store/namesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import NameCard from "../components/names/NameCard";

export default function AllNamesPage() {
  const dispatch = useAppDispatch();
  const { data: names, status, error } = useAppSelector((state) => state.names);

  useEffect(() => {
    dispatch(fetchNames());
  }, [dispatch]);

  if (status === "loading") return <p>பெயர்கள் ஏற்றப்படுகிறது...</p>;
  if (error) return <p>பிழை: {error}</p>;
  if (!names || names.length === 0) return <p>பெயர்கள் இல்லை.</p>;

  return (
    <>
      <h1>பெயர்கள் பட்டியல்</h1>
      <p>இந்தப் பக்கம் அனைத்து பெயர்களையும் காட்டும்.</p>
      <section>
        {names.map((nameDetail) => (
          <NameCard key={nameDetail.slug} nameDetail={nameDetail} />
        ))}
      </section>
    </>
  );
}