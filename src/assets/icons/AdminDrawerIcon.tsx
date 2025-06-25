import { IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

interface AdminDrawerIconProps {
  isDrawerOpen: boolean;
  onClick: () => void;
}

export default function AdminDrawerIcon({ isDrawerOpen, onClick }: AdminDrawerIconProps) {
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onClick}
        edge="start"
        sx={{
          marginRight: 5,
          display: isDrawerOpen ? "none" : "block",
        }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
