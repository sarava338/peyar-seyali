import { useState } from "react";
import { AppBar, Box, Stack, Toolbar } from "@mui/material";

import { HeaderLogo, MobileHeaderLogo } from "../common/Logo";
import UserMenu from "../header/UserMenu";
import AdminDrawerIcon from "../../assets/icons/AdminDrawerIcon";
import SearchBox from "../SearchBox";

interface HeaderProps {
  open: boolean;
  drawerWidth: number;
  handleDrawerOpen: () => void;
}

export default function Header({ open, handleDrawerOpen, drawerWidth }: HeaderProps) {
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setUserAnchor(e.currentTarget);
  };

  const handleUserMenuClose = () => setUserAnchor(null);

  return (
    <AppBar
      position="fixed"
      component="header"
      sx={{
        backgroundColor: "white",
        color: "black",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) =>
          theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        ...(open && drawerWidth
          ? {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: (theme) =>
                theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }
          : {}),
      }}
    >
      <Toolbar>
        <AdminDrawerIcon isDrawerOpen={open} onClick={handleDrawerOpen} />
        <Stack direction="row" alignItems="center" justifyItems="end">
          {/* Logo - Laptop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <HeaderLogo />
          </Box>

          {/* Logo - Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <MobileHeaderLogo />
          </Box>

          <SearchBox />
          <UserMenu userAnchor={userAnchor} onUserMenuOpen={handleUserMenuOpen} onUserMenuClose={handleUserMenuClose} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
