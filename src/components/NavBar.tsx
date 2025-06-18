import type { Path } from "../types";

interface NavBarProps {
  paths: Path[];
  onNavClick: (path: string) => void;
}

export default function NavBar({ onNavClick, paths }: NavBarProps) {
  return (
    <>
      <nav className="flex flex-col items-start p-4 gap-4">
        {paths.map((p) => (
          <button
            className="text-lg text-left hover:bg-gray-100 p-2 rounded"
            onClick={() => onNavClick(p.path)}
          >
            {p.name}
          </button>
        ))}
      </nav>
    </>
  );
}
