import { useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import { HeaderLogo } from "../Logo";
import UserMenu from "../header/UserMenu";
import AdminDrawerIcon from "../../assets/icons/AdminDrawerIcon";

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

        <UserMenu userAnchor={userAnchor} onUserMenuOpen={handleUserMenuOpen} onUserMenuClose={handleUserMenuClose} />

        <Box sx={{ mx: 4 }}>
          <HeaderLogo />
        </Box>

        <Typography variant="h5" noWrap component="p">
          நிர்வாகி தளம்
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
