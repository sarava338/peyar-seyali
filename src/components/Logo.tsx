import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

import peyarkal_logo_side_name_tamil_and_english from "../assets/logos/peyarkal_logo_side_name_tamil_and_english.png";
import peyarkal_logo_with_name from "../assets/logos/peyarkal_logo_with_name.png";
import peyarkal_logo from "../assets/logos/peyarkal_logo.png";

export function HeaderLogo() {
  return (
    <Link component={RouterLink} to="/" sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, width: "150px" }}>
      <img
        src={peyarkal_logo_side_name_tamil_and_english}
        alt="Peyarkal Logo"
        loading="lazy"
        style={{ minWidth: "150px", maxWidth: "30%" }}
      />
    </Link>
  );
}

export function FooterLogo() {
  return (
    <Link component={RouterLink} to="/" sx={{ width: "200px" }}>
      <img src={peyarkal_logo_with_name} alt="Peyarkal Logo" loading="lazy" style={{ maxWidth: "200px" }} />
    </Link>
  );
}

export function MobileHeaderLogo() {
  return (
    <Link component={RouterLink} to="/" sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <img src={peyarkal_logo} alt="Peyarkal Logo" loading="lazy" style={{ minWidth: "60px", maxWidth: "10%" }} />
    </Link>
  );
}