// components/LoadingScreen.tsx
import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" mt={2}>
        Loading, please wait…
      </Typography>
    </Box>
  );
}
