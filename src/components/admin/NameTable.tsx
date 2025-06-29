import type { NameCard } from "../../types";

interface NameTableProps {
  names: NameCard[];
  handleView: (nameSlug: string) => void;
  handleEdit: (nameSlug: string) => void;
  handleDelete: (nameSlug: string) => void;
}

export default function NameTable({ names, handleView, handleEdit, handleDelete }: NameTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>NameInEnglish</th>
          <th>Gender</th>
          <th>description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {names.map((name) => (
          <tr key={name.slug}>
            <td>{name.name}</td>
            <td>{name.nameInEnglish}</td>
            <td>{name.gender}</td>
            <td>{name.description}</td>
            <td>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleView(name.slug!);
                }}
              >
                view
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(name.slug!);
                }}
              >
                edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(name.slug!);
                }}
              >
                delete
              </button>
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
