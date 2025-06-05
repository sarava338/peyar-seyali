// src/components/Sidebar.tsx
type SidebarProps = {
  onSelect: (section: string) => void;
};

const Sidebar = ({ onSelect }: SidebarProps) => {
  return (
    <div
      style={{
        width: "200px",
        background: "#222",
        color: "#fff",
        height: "100vh",
        padding: "1rem",
      }}
    >
      <h3>Dashboard</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li
          onClick={() => onSelect("name")}
          style={{ cursor: "pointer", margin: "10px 0" }}
        >
          👤 Names
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
