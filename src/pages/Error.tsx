import { useLocation } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { useAppSelector } from "../store/hooks";

interface ErrorProps {
  code: number;
  error?: string;
  messege: string;
}

export default function Error({ code, error = "", messege }: ErrorProps) {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const isAdminPage = location.pathname.includes("/admin");

  if (isAdminPage && !user?.isAdmin) {
    code = 403;
    error = "Forbidden";
    messege = "Please contact the site administrator if you believe this is an error. Or login with an admin account.";
  }

  return (
    <Box sx={{ height: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography component="h1" variant="h1" color="red">
        <strong>{code}</strong>
      </Typography>

      <Typography component="h2" variant="h2">
        {error}
      </Typography>

      <Typography component="p" variant="h6" textAlign="center" sx={{ maxWidth: 600, mt: 2 }}>
        {messege}
      </Typography>
    </Box>
  );
}
