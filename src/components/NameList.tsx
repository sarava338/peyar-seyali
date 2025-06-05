// src/components/NamesList.tsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import NameCard from "./NameCard";

type NameType = {
  id: string;
  name: string;
  nameInEnglish: string;
};

export default function NamesList() {
  const [names, setNames] = useState<NameType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNames = async () => {
    try {
      const nameCollection = collection(db, "name");
      const snapshot = await getDocs(nameCollection);

      const namesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as NameType[];

      setNames(namesData);
    } catch (err) {
      console.error("Failed to fetch names:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNames();
  }, []);

  console.log(names);

  return loading ? (
    <p>Loading names...</p>
  ) : (
    <div>
      <h2>Names List</h2>
      {names.map((name) => (
        <NameCard key={name.id} name={name} />
      ))}
    </div>
  );
}
