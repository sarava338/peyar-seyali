import { Link } from "react-router-dom";

import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { PUBLIC_PATHS } from "../../data";

interface NavMenuProps {
  navAnchor: HTMLElement | null;
  onNavOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onNavClose: () => void;
}

export default function NavMenu({
  navAnchor,
  onNavOpen,
  onNavClose,
}: NavMenuProps) {
  return (
    <>
      {/* Mobile Nav Menu  */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton onClick={onNavOpen} color="inherit">
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={navAnchor}
          open={Boolean(navAnchor)}
          onClose={onNavClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          keepMounted
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {PUBLIC_PATHS.map((p) => (
            <MenuItem key={p.name} onClick={onNavClose}>
              <Link to={p.path}>{p.name}</Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Desktop Nav Menu */}
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-end",
          mr: 1,
        }}
      >
        {PUBLIC_PATHS.map((p) => (
          <Button key={p.path} sx={{ my: 2, color: "white", display: "block" }}>
            <Link to={p.path}>{p.name}</Link>
          </Button>
        ))}
      </Box>
    </>
  );
}
