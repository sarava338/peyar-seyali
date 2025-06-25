import { useState } from "react";

import { Box, styled, Toolbar, Typography } from "@mui/material";

import MuiAppBar, { type AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import Logo from "../Logo";
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
    <>
      <AppBar position="fixed" component="header" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <AdminDrawerIcon isDrawerOpen={open} onClick={handleDrawerOpen} />

          <UserMenu userAnchor={userAnchor} onUserMenuOpen={handleUserMenuOpen} onUserMenuClose={handleUserMenuClose} />

          <Box sx={{ mx: 4 }}>
            <Logo />
          </Box>

          <Typography variant="h5" noWrap component="p">
            நிர்வாகி தளம்
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
  drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && drawerWidth
    ? {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    : {}),
}));
