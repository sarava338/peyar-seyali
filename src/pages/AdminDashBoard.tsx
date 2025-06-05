// src/pages/AdminDashboard.tsx
import { useState } from "react";

import Sidebar from "../components/SideBar";
import NameManager from "./admin_pages/NameManager";

const AdminDashboard = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const renderContent = () => {
    switch (selected) {
      case "name":
        return <NameManager />;
      default:
        return <NameManager />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelect={setSelected} />
      <div style={{ flex: 1 }}>{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
