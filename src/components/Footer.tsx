import { Box } from "@mui/material";
import { FooterLogo } from "./Logo";

export default function Footer() {
  return (
    <Box sx={{  }}>
      <footer>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-around", alignItems: "center", padding: "20px" }}>
          <FooterLogo />
          <div>பெயர்கள்</div>
        </Box>
      </footer>
    </Box>
  );
}
