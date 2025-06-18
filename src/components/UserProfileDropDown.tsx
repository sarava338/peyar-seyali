import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAuthActions } from "../store/hooks";

import defaultProfilePicture from "../assets/default_profilr_picture.jpg";

export default function UserProfileDropDown() {
  const user = useAppSelector((state) => state.user.currentUser);
  const { logout } = useAuthActions();

  const [show, setShow] = useState(false);

  function handleShowClick() {
    setShow(!show);
  }

  return !user ? null : (
    <div>
      <div>
        <img
          onClick={handleShowClick}
          src={user.imageUrl || defaultProfilePicture}
          alt={`${user.name} profile picture`}
          width={40}
        />
      </div>

      {show && (
        <div>
          {user.isAdmin && (
            <ul>
              {["names", "tags", "categories", "comments"].map((field) => (
                <li onClick={handleShowClick} key={`${field}-link`}>
                  <Link to={`/admin/${field}`}>{field}</Link>
                </li>
              ))}
            </ul>
          )}

          <button onClick={logout}>logout</button>
        </div>
      )}
    </div>
  );
}
