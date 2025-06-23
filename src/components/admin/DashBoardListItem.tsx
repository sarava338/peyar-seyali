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
}

export default function DashBoardListItem({
  open,
  path,
  pageName,
}: DashBoardListItemProps) {
  const navigate = useNavigate();

  return (
    <>
      <ListItem
        disablePadding
        sx={{ display: "block" }}
        onClick={() => navigate(path)}
      >
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
