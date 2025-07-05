import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchNames, fetchNamesForAdmin } from "../../store/namesSlice";

import { deleteName } from "../../firebase/services/nameService";

import NameTable from "../../components/admin/NameTable";
import LoadingScreen from "../../components/LoadingScreen";

import Error from "../Error";
import { Button, Stack, Typography } from "@mui/material";

export default function Names() {
  const { adminNames: names, error, status } = useAppSelector((state) => state.names);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNamesForAdmin());
  }, [dispatch]);

  const handleViewClick = (nameSlug: string): void => {
    navigate(`/admin/names/${nameSlug}`);
  };

  const handleEditClick = (nameSlug: string): void => {
    navigate(`/admin/names/${nameSlug}/edit`);
  };

  const handleDeleteClick = async (nameSlug: string) => {
    const canDelete = confirm(`Are you sure you want to delete the name: ${nameSlug}?`);
    try {
      if (canDelete) {
        await deleteName(nameSlug);
        dispatch(fetchNames());
        console.log(`Name: ${nameSlug} deleted successfully.`);
      }
    } catch (error) {
      console.error("Error deleting name:", error);
    }
  };

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
        <NameTable names={names} handleView={handleViewClick} handleEdit={handleEditClick} handleDelete={handleDeleteClick} />
      </main>
    </>
  );
}
