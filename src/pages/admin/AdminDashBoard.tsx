import { type JSX } from "react";
import { Link } from "react-router-dom";

import NameManager from "./NameManager";
import TagManager from "./TagManager";
import CategoryManager from "./CategoryManager";
import CommentManager from "./CommentManager";

import type { FieldKey } from "../../types";

interface AdminDashBoardProps {
  selectedField: FieldKey;
}

export default function AdminDashBoard({ selectedField }: AdminDashBoardProps) {
  const fields: Record<FieldKey, JSX.Element> = {
    names: <NameManager />,
    tags: <TagManager />,
    categories: <CategoryManager />,
    comments: <CommentManager />,
  };

  const selectedManager = fields[selectedField];

  return (
    <>
      <main>
        <h2>Admin DashBoard</h2>
        <aside>
          <ul>
            {Object.keys(fields).map((field) => (
              <li key={`field-${field}-btn`}>
                <Link to={`/admin/${field}`}>{field}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <section>{selectedManager}</section>
      </main>
    </>
  );
}
