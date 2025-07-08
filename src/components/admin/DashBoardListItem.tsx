import { useNavigate } from "react-router-dom";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";

interface DashBoardListItemProps {
  open: boolean;
  path: string | URL;
  pageName: string;
  handleDrawerClose: () => void;
}

export default function DashBoardListItem({ open, path, pageName, handleDrawerClose }: DashBoardListItemProps) {
  const navigate = useNavigate();

  const handleClcik = () => {
    handleDrawerClose();
    navigate(path);
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }} onClick={handleClcik}>
        <ListItemButton
          sx={{
            minHeight: 48,
            px: 2.5,
            justifyContent: open ? "initial" : "center",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              mr: open ? 3 : "auto",
            }}
          >
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={pageName} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
