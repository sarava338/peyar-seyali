import { Box, Typography } from "@mui/material";

interface ErrorProps {
  code: number;
  messege: string;
}

export default function Error({ code, messege }: ErrorProps) {
  return (
    <Box sx={{ height: "50vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography component="h1" variant="h1" color="red">
        <strong>{code}</strong>
      </Typography>

      <Typography component="p" variant="h2">
        {messege}
      </Typography>
    </Box>
  );
}
