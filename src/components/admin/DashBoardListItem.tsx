import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { Button, ListItem, ListItemText, Stack } from "@mui/material";

interface DashBoardListItemProps {
  open: boolean;
  path: string | URL;
  pageName: string;
  handleDrawerClose: () => void;
  icon: ReactNode;
}

export default function DashBoardListItem({ open, path, pageName, handleDrawerClose, icon }: DashBoardListItemProps) {
  const navigate = useNavigate();

  const handleClcik = () => {
    handleDrawerClose();
    navigate(path);
  };

  return (
    <>
      <ListItem
        sx={{
          display: "block",
          "&:hover": {
            backgroundColor: "#ddd",
            cursor: "pointer",
          },
        }}
        onClick={handleClcik}
      >
        <Stack direction="row">
          <Button
            startIcon={icon}
            sx={{
              justifyContent: "initial",
            }}
          ></Button>
          <ListItemText
            primary={pageName}
            sx={{
              display: open ? "block" : "none",
              marginLeft: 1,
            }}
          />
        </Stack>
      </ListItem>
    </>
  );
}
