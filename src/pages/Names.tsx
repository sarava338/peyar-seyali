import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchNamesForAdmin } from "../store/namesSlice";

import Loading from "./Loading";
import Error from "./Error";

import NameList from "../components/names/NameList";
import AddNameForm from "../components/admin/AddNameForm";

export default function Names() {
  const { adminNames: names, error, status } = useAppSelector((state) => state.names);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [showForm, setShowForm] = useState(false);

  const isAdminPage = location.pathname.includes("/admin");

  useEffect(() => {
    dispatch(fetchNamesForAdmin());
  }, [dispatch]);

  if (status === "loading") return <Loading />;
  if (error) return <Error code={500} messege={error} />;

  return (
    <>
      <main>
        <Stack m={3} flexDirection={{ sm: "column", md: "row" }} gap={3} justifyContent="space-around">
          <Typography variant="h4" component="h1">
            மொத்த பெயர்கள் - <strong>{names.length}</strong>
          </Typography>

          {isAdminPage && !showForm && (
            <Button variant="contained" color="primary" sx={{ width: "fit-content" }} onClick={() => setShowForm(true)}>
              Add New Name
            </Button>
          )}
        </Stack>

        {isAdminPage && showForm && <AddNameForm onClose={() => setShowForm(false)} />}

        <NameList names={names} />
      </main>
    </>
  );
}
