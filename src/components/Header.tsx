import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";
import NavBar from "./NavBar";
import UserProfileDropDown from "./UserProfileDropDown";
import { PUBLIC_PATHS } from "../data";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function handleNavClick(path: string): void {
    setIsOpen(false);
    navigate(path);
  }

  return (
    <header className="shadow-md px-4 py-2 flex items-center justify-between relative z-50">
      {/* Hamburger Button - visible only on small screens */}
      <div className="z-50 sm:hidden" ref={menuRef}>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "✖" : "☰"}</button>
      </div>

      {/* Brand Logo */}
      <div className="flex-1 text-center sm:text-left text-xl font-bold">
        <Logo />
      </div>

      <UserProfileDropDown />

      {/** Sliding Nav Bar */}
      <div
        className={`absolute left-0 right-0 top-full bg-white shadow-md overflow-hidden transition-all duration-300 sm:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <NavBar onNavClick={handleNavClick} paths={PUBLIC_PATHS} />
      </div>
    </header>
  );
}
