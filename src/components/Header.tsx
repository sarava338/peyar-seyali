import { Link } from "react-router-dom";

import DropDown from "./DropDown";

export default function Header() {
  return (
    <header>
      <p>
        <Link to="/">பெயர் செயலி</Link>
      </p>
      <nav className="header-nav">
        <Link to="/">முகப்பு</Link>
        <Link to="/names">பெயர்கள்</Link>
        {<DropDown />}
      </nav>
    </header>
  );
}
