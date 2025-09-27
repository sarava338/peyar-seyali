import { Button, type SxProps, type Theme } from "@mui/material";

import ClickIcon from "@mui/icons-material/AdsClick";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ButtonProps {
  onClick: () => void;
  sx?: SxProps<Theme>;
}

export const ViewButton = ({ onClick, sx = {} }: ButtonProps) => {
  return (
    <Button size="small" onClick={onClick} sx={sx}>
      <ClickIcon />
    </Button>
  );
};

export const EditButton = ({ onClick, sx = {} }: ButtonProps) => {
  return (
    <Button size="small" color="primary" onClick={onClick} sx={sx}>
      <EditIcon />
    </Button>
  );
};

export const DeleteButton = ({ onClick, sx = {} }: ButtonProps) => {
  return (
    <Button size="small" color="error" onClick={onClick} sx={sx}>
      <DeleteIcon />
    </Button>
  );
};
