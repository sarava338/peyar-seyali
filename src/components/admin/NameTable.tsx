import { NavLink, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import type { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";

import type { NameTableType } from "../../types/types";

import { deleteName } from "../../firebase/services/nameService";

import { useAppDispatch } from "../../store/hooks";
import { fetchNamesForAdmin } from "../../store/slices/namesSlice";

import { EditButton, DeleteButton, ShareButton, ViewButton } from "../common/buttons";
import DataTable from "../common/DataTable";
import { useState } from "react";

interface NameTableProps {
  names: NameTableType[];
}

export default function NameTable({ names }: NameTableProps) {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
    description: false,
    createdAt: false,
    updatedAt: false,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleView = (slug: string) => navigate(`/admin/names/${slug}`);

  const handleEdit = (slug: string) => navigate(`/admin/names/${slug}/edit`);

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

  const handleShare = async (event: React.MouseEvent, nameDetail: NameTableType) => {
    event.stopPropagation();

    const shareData = {
      title: nameDetail.name + "\n",
      text: `${nameDetail.name} - ${nameDetail.description}\n`,
      url: `${window.location.origin}/names/${nameDetail.slug}\n`,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else alert("Sharing not supported in this browser.");
    } catch (error) {
      console.error("Error preparing share data:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
      editable: false,
      renderCell: (table) => <NavLink to={`/admin/names/${table.row.slug}`}>{table.row.slug}</NavLink>,
    },
    { field: "active", headerName: "Active", flex: 1, editable: false, type: "boolean" },
    {
      field: "actions",
      headerName: "செயல்கள்",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (table) => (
        <Box sx={{ alignItems: "center", height: "100%" }}>
          <EditButton onClick={() => handleEdit(table.row.slug)} />
          <DeleteButton onClick={() => handleDelete(table.row.slug)} />
          <ViewButton onClick={() => handleView(table.row.slug)} />
          <ShareButton onClick={() => handleShare({ stopPropagation: () => {} } as React.MouseEvent, table.row)} />
        </Box>
      ),
    },
    { field: "name", headerName: "பெயர்", flex: 1, editable: false },
    { field: "nameInEnglish", headerName: "பெயர் ஆங்கிலத்தில்", flex: 1, editable: false },
    { field: "origin", headerName: "Origin", flex: 1, editable: false },
    { field: "gender", headerName: "பால்", flex: 1, editable: false },
    { field: "description", headerName: "Description", flex: 2, editable: false },
    { field: "createdAt", headerName: "Created At", flex: 2, editable: false },
    { field: "updatedAt", headerName: "Updated At", flex: 2, editable: false },
  ];

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <DataTable
          rows={names}
          columns={columns}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        />
      </Box>
    </>
  );
}
