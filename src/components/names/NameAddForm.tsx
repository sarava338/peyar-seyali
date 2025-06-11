import { useState } from "react";

import Input from "../Input";

import { NAME_INPUT_DATA } from "../../data";
import type { NameFormType } from "../../types";

type NameAddProps = {
  onNameSubmit: (nameDetail: NameFormType) => void;
  onCancelSubmit: () => void;
};

export default function NameAddForm({
  onNameSubmit,
  onCancelSubmit,
}: NameAddProps) {
  const [form, setForm] = useState({
    name: "",
    nameInEnglish: "",
    meaning: "",
    description: "",
    gender: "",
    origin: "",
    slug: "",
    literatureEvidence: "",
    epigraphEvidence: "",
    otherNames: "",
    relatedNames: "",
    categories: "",
    tags: "",
    reference: "",
    active: true,
    createdAt: "",
    updatedAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const { checked } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]: name === "active" ? checked : value,
    }));
  };

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNameSubmit(form);
        }}
      >
        {NAME_INPUT_DATA.map((field) => (
          <Input
            key={`input-${field.inputName}`}
            inputType={field.inputType}
            inputName={field.inputName}
            inputValue={
              form[field.inputName as keyof typeof form] ??
              (field.inputType === "checkbox" ? true : false)
            }
            onChange={handleChange}
            placeHolder={field.inputName}
          />
        ))}

        <button type="submit">submit</button>
        <button onClick={onCancelSubmit}>cancel</button>
      </form>
    </main>
  );
}
