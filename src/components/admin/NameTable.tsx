import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { NameCardType } from "../../types/types";

import { deleteName } from "../../firebase/services/nameService";

import { fetchNamesForAdmin } from "../../store/namesSlice";
import { useAppDispatch } from "../../store/hooks";

import { EditButton, DeleteButton } from "../common/buttons";

interface NameTableProps {
  names: NameCardType[];
}

export default function NameTable({ names }: NameTableProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isAdminPage = location.pathname.includes("/admin");

  const handleEdit = (slug: string) => {
    if (isAdminPage) navigate(`/admin/names/${slug}/edit`);
  };

  const handleDelete = async (slug: string) => {
    const canDelete = confirm(`Do you really want to delete name - ${slug} ?`);

    try {
      if (canDelete && slug) {
        await deleteName(slug);
        dispatch(fetchNamesForAdmin());
      }
    } catch (error) {
      console.error("error while delete button", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
      editable: false,
      renderCell: (table) => (
        <NavLink to={isAdminPage ? `/admin/names/${table.row.slug}` : `/names/${table.row.slug}`}>{table.row.slug}</NavLink>
      ),
    },
    { field: "name", headerName: "பெயர்", flex: 1, editable: false },
    { field: "nameInEnglish", headerName: "பெயர் ஆங்கிலத்தில்", flex: 1, editable: false },
    { field: "gender", headerName: "பால்", flex: 1, editable: false },
    {
      field: "actions",
      headerName: "செயல்கள்",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (table) => (
        <Box sx={{ display: `${isAdminPage ? "flex" : "none"}`, alignItems: "center", height: "100%" }}>
          <EditButton onClick={() => handleEdit(table.row.slug)} />
          <DeleteButton onClick={() => handleDelete(table.row.slug)} />
        </Box>
      ),
    },
  ];

  const columnsToShow = columns.filter((col) => {
    if (!isAdminPage && col.field === "actions") return false;
    return true;
  });

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={names}
          columns={columnsToShow}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          showToolbar
          getRowId={(row) => row.slug}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </>
  );
}
