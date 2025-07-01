import { useEffect } from "react";

import { Box, Typography } from "@mui/material";

import { fetchNames } from "../store/namesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import NameList from "../components/names/NameList";
import LoadingScreen from "../components/LoadingScreen";

import Error from "./Error";

export default function Names() {
  const dispatch = useAppDispatch();
  const { publicNames: names, status, error } = useAppSelector((state) => state.names);

  useEffect(() => {
    dispatch(fetchNames());
  }, [dispatch]);

  if (status === "loading") return <LoadingScreen />;
  if (error) return <Error code={500} messege={error} />;
  if (!names || names.length === 0) return <Error code={404} messege="No Names Found" />;

  return (
    <>
      <Box sx={{ mx: { md: 2, xs: 1 } }}>
        <Typography component="h1" variant="h2" sx={{ textAlign: "center" }}>
          பெயர்கள் பட்டியல்
        </Typography>
        <NameList names={names} />
      </Box>
    </>
  );
}