import type { NameDetail } from "../../types";

interface NameTableProps {
  names: NameDetail[];
  handleEditClick: (nameSlug: string) => void;
  handleDeleteClick: (nameSlug: string) => void;
}

export default function NameTable({
  names,
  handleEditClick,
  handleDeleteClick,
}: NameTableProps) {
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
        {names.map((name: NameDetail) => (
          <tr key={name.slug}>
            <td>{name.name}</td>
            <td>{name.nameInEnglish}</td>
            <td>{name.gender}</td>
            <td>{name.description}</td>
            <td>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEditClick(name.slug!);
                }}
              >
                edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteClick(name.slug!);
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
