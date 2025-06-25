import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function Logo() {
  return (
    <h1>
      <Link to="/">
        <Typography variant="h5" noWrap component="p">
          பெயர் செயலி
        </Typography>
      </Link>
    </h1>
  );
}
