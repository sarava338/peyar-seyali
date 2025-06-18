import { Link } from "react-router-dom";

import UserProfileDropDown from "./UserProfileDropDown";

export default function Header() {
  return (
    <header>
      <p>
        <Link to="/">பெயர் செயலி</Link>
      </p>

      <h1>பெயர் செயலி</h1>

      <nav className="header-nav">
        <Link to="/">முகப்பு</Link>
        <Link to="/names">பெயர்கள்</Link>
        {<UserProfileDropDown />}
      </nav>
    </header>
  );
}
