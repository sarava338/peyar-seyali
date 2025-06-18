import { type JSX } from "react";

import NameManager from "./NameManager";
import TagManager from "./TagManager";
import CategoryManager from "./CategoryManager";
import CommentManager from "./CommentManager";

import type { FieldKey } from "../../types";
import SideBar from "../../components/SideBar";

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
        <SideBar fields={fields} />
        <section>{selectedManager}</section>
      </main>
    </>
  );
}
