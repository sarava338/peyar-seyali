import { useEffect, useRef, useState } from "react";

import { useAppSelector, useAuthActions } from "../store/hooks";

import { USER_PATHS } from "../data";

import NavBar from "./NavBar";

import defaultProfilePicture from "../assets/default_profilr_picture.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function UserProfileDropDown() {
  const user = useAppSelector((state) => state.user.currentUser);
  const { logout } = useAuthActions();

  const [show, setShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  function handleNavClick(path: string) {
    setShow(false);
    navigate(path);
  }

  return !user ? (
    <Link to="/login">Login</Link>
  ) : (
    <div>
      <div ref={menuRef} className="z-50">
        <img
          className="cursor-pointer rounded-full"
          onClick={() => setShow(!show)}
          src={user.imageUrl || defaultProfilePicture}
          alt={`${user.name} profile picture`}
          width={40}
        />
      </div>

      <div
        className={`absolute sm:right-auto sm:left-0 mt-2 bg-white shadow-md rounded-md overflow-hidden transition-all duration-300 z-40 ${
          show ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <NavBar onNavClick={handleNavClick} paths={USER_PATHS} />

        {user.isAdmin && <Link to="/admin">Admin</Link>}

        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
}
