// src/components/NameManager.tsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
} from "firebase/firestore";

import { db } from "../../firebase";

type NameType = {
  id?: string;
  name: string;
  gender: string;
  description: string;
};

export default function NameManager() {
  const [names, setNames] = useState<NameType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NameType>({
    name: "",
    gender: "",
    description: "",
  });

  const fetchNames = async () => {
    const snapshot = await getDocs(collection(db, "name"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as NameType[];
    setNames(data);
  };

  useEffect(() => {
    fetchNames();
  }, []);

  const handleChange = (field: keyof NameType, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.gender) return alert("Name and gender required");

    try {
      if (editingId) {
        await updateDoc(doc(db, "name", editingId), {
          name: form.name,
          gender: form.gender,
          description: form.description,
        });
      } else {
        await addDoc(collection(db, "name"), form);
      }

      setForm({ name: "", gender: "", description: "" });
      setEditingId(null);
      fetchNames();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (n: NameType) => {
    setEditingId(n.id || null);
    setForm({ name: n.name, gender: n.gender, description: n.description });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await deleteDoc(doc(db, "name", id));
    fetchNames();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Manage Names</h2>

      <div style={{ marginBottom: "1rem" }}>
        <form onSubmit={handleSave}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <input
            placeholder="Gender"
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <button onClick={handleSave}>
            {editingId ? "Update" : "Add"} Name
          </button>
        </form>
      </div>

      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {names.map((n) => (
            <tr key={n.id}>
              <td>{n.name}</td>
              <td>{n.gender}</td>
              <td>{n.description}</td>
              <td>
                <button onClick={() => handleEdit(n)}>Edit</button>
                <button onClick={() => handleDelete(n.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
