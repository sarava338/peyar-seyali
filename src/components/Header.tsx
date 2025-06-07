import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import DropDown from "./DropDown";

export default function Header() {
  const user = useAppSelector((state) => state.user.currentUser);

  return (
    <header>
      <p>
        <Link to="/">பெயர் செயலி</Link>
      </p>
      <nav>
        <Link to="/">முகப்பு</Link>
        <Link to="/names">பெயர்கள்</Link>
        {user && <DropDown />}
      </nav>
    </header>
  );
}
