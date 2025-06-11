import { useState } from "react";

import Input from "../Input";

import { NAME_INPUT_DATA } from "../../data";
import type { NameDetail, NameFormType } from "../../types";

interface NameEditProps {
  nameDetail: NameDetail;
  onSubmitEditForm: (nameDetail: NameFormType) => void;
  onCancelEditForm: () => void;
}

export default function NameEditForm({
  nameDetail,
  onSubmitEditForm,
  onCancelEditForm,
}: NameEditProps) {
  const { comments, createdAt, updatedAt, author, ...nameData } = nameDetail;
  const [form, setForm] = useState(nameData);

  console.log("comments", comments);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    const { checked } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]: name === "active" ? checked : value,
    }));
  }

  return (
    <main>
      <h4>Name Edit - {nameDetail.name}</h4>
      <p>
        created by <b>{author}</b>
      </p>
      <p>name created at : {createdAt}</p>
      <p>name last updated at : {updatedAt}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitEditForm(form);
        }}
      >
        {NAME_INPUT_DATA.map((field) => (
          <Input
            key={`input-${field.inputName}`}
            inputType={field.inputType}
            inputName={field.inputName}
            inputValue={
              form[field.inputName as keyof typeof form] ??
              (field.inputType === "checkbox" ? false : "")
            }
            onChange={handleChange}
            placeHolder={field.inputName}
          />
        ))}

        <button type="submit">submit</button>
        <button onClick={onCancelEditForm}>cancel</button>
      </form>
    </main>
  );
}
