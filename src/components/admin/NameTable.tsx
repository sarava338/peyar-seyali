import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

import type { NameCardType } from "../../types/types";

import { deleteName } from "../../firebase/services/nameService";

import { useAppDispatch } from "../../store/hooks";
import { fetchNamesForAdmin } from "../../store/slices/namesSlice";

import { EditButton, DeleteButton, ShareButton, ViewButton } from "../common/buttons";
import DataTable from "../common/DataTable";

interface NameTableProps {
  names: NameCardType[];
}

export default function NameTable({ names }: NameTableProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isAdminPage = location.pathname.includes("/admin");

  const handleView = (slug: string) => {
    if (isAdminPage) navigate(`/admin/names/${slug}`);
    else navigate(`/names/${slug}`);
  };

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

  const handleShare = async (event: React.MouseEvent, nameDetail: NameCardType) => {
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
        <Box sx={{ alignItems: "center", height: "100%" }}>
          <ViewButton onClick={() => handleView(table.row.slug)} />
          <ShareButton onClick={() => handleShare({ stopPropagation: () => {} } as React.MouseEvent, table.row)} />
          {isAdminPage && (
            <>
              <EditButton onClick={() => handleEdit(table.row.slug)} />
              <DeleteButton onClick={() => handleDelete(table.row.slug)} />
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <DataTable rows={names} columns={columns} />
      </Box>
    </>
  );
}
