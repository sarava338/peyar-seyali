import { useState } from "react";
import { Toolbar, Container, Box, AppBar } from "@mui/material";

import Logo from "../Logo";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";

export default function Header() {
  const [navAnchor, setNavAnchor] = useState<null | HTMLElement>(null);
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  const handleNavMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setUserAnchor(null);
    setNavAnchor(e.currentTarget);
  };

  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setNavAnchor(null);
    setUserAnchor(e.currentTarget);
  };

  const handleNavMenuClose = () => setNavAnchor(null);
  const handleUserMenuClose = () => setUserAnchor(null);

  return (
    <>
      <AppBar position="fixed" component="header" sx={{}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/** Logo - Desktop */}
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
              <Logo />
            </Box>

            <NavMenu navAnchor={navAnchor} onNavOpen={handleNavMenuOpen} onNavClose={handleNavMenuClose} />

            {/* Logo - Mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Logo />
            </Box>

            <UserMenu userAnchor={userAnchor} onUserMenuOpen={handleUserMenuOpen} onUserMenuClose={handleUserMenuClose} />
          </Toolbar>
        </Container>
      </AppBar>

      <div style={{ minHeight: "80px" }}></div>
    </>
  );
}