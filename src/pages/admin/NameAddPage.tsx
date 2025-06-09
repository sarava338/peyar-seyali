import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";

import { addName } from "../../firebase/services/nameService";

import { useAppSelector } from "../../store/hooks";

export default function NameAddPage() {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.currentUser);

  const [form, setForm] = useState({
    name: "",
    nameInEnglish: "",
    description: "",
    gender: "",
    origin: "",
    slug: "",
    literatureEvidence: "",
    epigraphEvidence: "",
    relatedNames: "",
    comments: "",
    categories: "",
    tags: "",
    author: user?.name ?? "",
    active: true,
  });

  if (!user) navigate("/login");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "active") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addName(form);
      navigate("/admin/names");
    } catch (err) {
      const error = err as Error;
      console.error("Failed to add name:", error);
      alert(
        `failed to add name. check console for more error details.\nError : ${error.message}`
      );
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <Input
          inputName="name"
          inputType="text"
          inputValue={form.name}
          onChange={handleChange}
        />
        <Input
          inputName="nameInEnglish"
          inputType="text"
          inputValue={form.nameInEnglish}
          onChange={handleChange}
        />
        <Input
          inputName="gender"
          inputType="text"
          inputValue={form.gender}
          onChange={handleChange}
        />
        <Input
          inputName="origin"
          inputType="text"
          inputValue={form.origin}
          onChange={handleChange}
        />
        <Input
          inputName="slug"
          inputType="text"
          inputValue={form.slug}
          onChange={handleChange}
        />
        <Input
          inputName="author"
          inputType="text"
          inputValue={form.author}
          onChange={handleChange}
        />

        <Input
          inputName="literatureEvidence"
          inputValue={form.literatureEvidence}
          onChange={handleChange}
        />
        <Input
          inputName="epigraphEvidence"
          inputValue={form.epigraphEvidence}
          onChange={handleChange}
        />

        <Input
          inputName="relatedNames"
          inputValue={form.relatedNames}
          onChange={handleChange}
        />

        <Input
          inputName="categories"
          inputValue={form.categories}
          onChange={handleChange}
        />

        <Input
          inputName="tags"
          inputValue={form.tags}
          onChange={handleChange}
        />

        <Input
          inputName="active"
          inputType="checkbox"
          inputValue={form.active}
          onChange={handleChange}
        />

        <button type="submit">submit</button>
      </form>
    </main>
  );
}
