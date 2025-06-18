import type { JSX } from "react";
import { Link } from "react-router-dom";

import type { FieldKey } from "../types";

type SideBarProps = {
  fields: Record<FieldKey, JSX.Element>;
};

export default function SideBar({ fields }: SideBarProps) {
  return (
    <>
      <aside>
        <ul>
          {Object.keys(fields).map((field) => (
            <li key={`field-${field}`}>
              <Link to={`/admin/${field}`}>{field}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
