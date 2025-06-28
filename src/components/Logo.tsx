import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

import peyarkal_logo_english from "../assets/logos/peyarkal_logo_side_name_tamil_and_english.png";

export function HeaderLogo() {
  return (
    <Link component={RouterLink} to="/" sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, width: "150px" }}>
      <img src={peyarkal_logo_english} alt="Peyarkal Logo" loading="lazy" style={{ minWidth: "150px", maxWidth: "30%" }} />
    </Link>
  );
}
