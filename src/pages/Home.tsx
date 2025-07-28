import { useEffect, useState } from "react";

import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import SearchBox from "../components/SearchBox";
import NameList from "../components/names/NameList";
import type { NameCardType } from "../types/types";
import { fetchNames } from "../store/namesSlice";

export default function Home() {
  const { publicNames, status, error } = useAppSelector((state) => state.names);
  const dispatch = useAppDispatch();

  const [names, setNames] = useState<NameCardType[]>([]);

  useEffect(() => {
    dispatch(fetchNames());
  }, [dispatch]);

  if (error) console.error("Error fetching names:", error);

  const handlSearchResults = (newNames: NameCardType[]) => {
    setNames((prevNames) =>
      prevNames.length === newNames.length && prevNames.every((n, i) => n.slug === newNames[i].slug) ? prevNames : newNames
    );
  };

  return (
    <Box sx={{ mx: { md: 2, xs: 1 } }}>
      <Box component="article">
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center" mb={3}>
          <Typography component="h1" variant="h2" sx={{ textAlign: { xs: "center", md: "left" } }}>
            பெயர் செயலி
          </Typography>

          <SearchBox onResults={handlSearchResults} />
        </Stack>

        <Typography component="h2" variant="h5" sx={{ textAlign: "center" }}>
          மொத்த பெயர்கள் :{" "}
          <Typography component="span" variant="h3" color="primary">
            {status === "loading" ? <CircularProgress size={30} /> : publicNames.length}
          </Typography>
        </Typography>
        
        <NameList names={names.length === 0 ? publicNames : names} />
      </Box>
    </Box>
  );
}
