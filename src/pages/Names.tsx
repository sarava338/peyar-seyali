import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNamesForAdmin } from "../store/namesSlice";

import LoadingScreen from "../components/LoadingScreen";
import Error from "./Error";

import NameList from "../components/names/NameList";

export default function Names() {
  const { adminNames: names, error, status } = useAppSelector((state) => state.names);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNamesForAdmin());
  }, [dispatch]);

  if (status === "loading") return <LoadingScreen />;
  if (error) return <Error code={500} messege={error} />;
  if (!names || names.length === 0) return <Error code={404} messege="No Names Found" />;

  return (
    <>
      <main>
        <Stack m={3} flexDirection={{ sm: "column", md: "row" }} gap={3} justifyContent="space-between">
          <Typography variant="h4" component="h1">
            மொத்த பெயர்கள் - <strong>{names.length}</strong>
          </Typography>

          <Button variant="contained" color="primary" sx={{ width: "fit-content" }} onClick={() => navigate("/admin/names/add")}>
            Add New Name
          </Button>
        </Stack>

        <NameList names={names} />

        {/* <NameTable names={names} handleView={handleViewClick} handleEdit={handleEditClick} handleDelete={handleDeleteClick} /> */}
      </main>
    </>
  );
}
