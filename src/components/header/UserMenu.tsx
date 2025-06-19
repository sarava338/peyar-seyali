import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import { useAppSelector, useAuthActions } from "../../store/hooks";

import { USER_PATHS } from "../../data";

import defaultProfilePicture from "../assets/default_profilr_picture.jpg";

interface UserMenuProps {
  userAnchor: HTMLElement | null;
  onUserMenuOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onUserMenuClose: () => void;
}

export default function UserMenu({
  userAnchor,
  onUserMenuClose,
  onUserMenuOpen,
}: UserMenuProps) {
  const user = useAppSelector((state) => state.user.currentUser);
  const { logout } = useAuthActions();

  const handleLogout = () => {
    onUserMenuClose();
    logout();
  };

  return !user ? (
    <Link to="/login">Login</Link>
  ) : (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={onUserMenuOpen} sx={{ p: 0 }}>
          {user ? (
            <Avatar
              src={user.imageUrl || defaultProfilePicture}
              alt={user.name}
            />
          ) : (
            <Typography color="white">Login</Typography>
          )}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={userAnchor}
        open={Boolean(userAnchor)}
        onClose={onUserMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1.5 }}
      >
        {USER_PATHS.map((p) => (
          <MenuItem key={p.name} onClick={onUserMenuClose}>
            <Typography>
              <Link to={p.path}>{p.name}</Link>
            </Typography>
          </MenuItem>
        ))}

        {user.isAdmin && (
          <MenuItem onClick={onUserMenuClose}>
            <Link to="/admin">Admin</Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
