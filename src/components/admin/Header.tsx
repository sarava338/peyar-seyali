import { useState } from "react";

import { IconButton, styled, Toolbar, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import UserMenu from "../header/UserMenu";

interface HeaderProps {
  open: boolean;
  drawerWidth: number;
  handleDrawerOpen: () => void;
}

export default function Header({
  open,
  handleDrawerOpen,
  drawerWidth,
}: HeaderProps) {
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setUserAnchor(e.currentTarget);
  };

  const handleUserMenuClose = () => setUserAnchor(null);

  return (
    <>
      <AppBar
        position="fixed"
        component="header"
        open={open}
        drawerWidth={drawerWidth}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              display: open ? "none" : "block",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="h1">
            பெயர் செயலி - நிர்வாகி தளம்
          </Typography>

          <UserMenu
            userAnchor={userAnchor}
            onUserMenuOpen={handleUserMenuOpen}
            onUserMenuClose={handleUserMenuClose}
          />
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
