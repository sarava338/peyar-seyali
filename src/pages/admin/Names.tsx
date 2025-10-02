import { useEffect, useState } from "react";

import { Box, Button, ButtonGroup } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Loading from "../Loading";
import Error from "../Error";

import AddNameForm from "../../components/admin/AddNameForm";
import { fetchNamesForAdmin } from "../../store/slices/namesSlice";

import NameCards from "../../components/names/NameCards";
import NameTable from "../../components/admin/NameTable";

type View = "table" | "card";

export default function Names() {
  const { adminNames: names, error, status } = useAppSelector((state) => state.names);
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<View>("table");

  const views: View[] = ["table", "card"];

  useEffect(() => {
    dispatch(fetchNamesForAdmin());
  }, [dispatch]);

  if (status === "loading") return <Loading />;
  if (error) return <Error code={500} messege={error} />;

  return (
    <>
      <Box m={3} display="flex" justifyContent="flex-end" gap={2} alignItems="center">
        <ButtonGroup variant="text" aria-label="Basic button group">
          {views.map((v) => (
            <Button
              sx={{
                textTransform: "capitalize",
                fontWeight: view === v ? "bold" : "normal",
                color: view === v ? "primary.main" : "text.primary",
                backgroundColor: view === v ? "action.selected" : "transparent",
                borderRadius: 0,
              }}
              onClick={() => setView(v)}
            >
              {v}
            </Button>
          ))}
        </ButtonGroup>

        <Button variant="contained" color="primary" sx={{ width: "fit-content" }} onClick={() => setShowForm(!showForm)}>
          {!showForm ? "Add New Name" : "Close Form"}
        </Button>
      </Box>

      {showForm && <AddNameForm onClose={() => setShowForm(false)} />}

      {view === "table" ? <NameTable names={names} /> : <NameCards names={names} />}
    </>
  );
}
