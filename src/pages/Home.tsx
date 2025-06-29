import { useEffect } from "react";

import { Box, CircularProgress, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNames } from "../store/namesSlice";

import NameList from "../components/names/NameList";

export default function Home() {
  const dispatch = useAppDispatch();
  const { publicNames: names, status } = useAppSelector((state) => state.names);

  useEffect(() => {
    dispatch(fetchNames());
  }, [dispatch]);

  return (
    <Box sx={{ mx: { md: 2, xs: 1 } }}>
      <Box component="article">
        <Typography component="h1" variant="h2" sx={{ textAlign: "center" }}>
          பெயர் செயலி
        </Typography>

        <Typography component="h2" variant="h5" sx={{ textAlign: "center" }}>
          மொத்த பெயர்கள் :{" "}
          <Typography component="span" variant="h3" color="primary">
            {status === "loading" ? <CircularProgress size={30} /> : names.length}
          </Typography>
        </Typography>

        <NameList names={names} />
      </Box>
    </Box>
  );
}
