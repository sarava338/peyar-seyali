import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

import type { NameCardType, NameTableType } from "../../types/types";

import DataTable from "../common/DataTable";
import { ShareButton, ViewButton } from "../common/buttons";

interface NameTableProps {
  names: NameCardType[] | NameTableType[];
}

export default function NameTable({ names }: NameTableProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminPage = location.pathname.includes("/admin");

  const handleView = (slug: string) => {
    if (isAdminPage) navigate(`/admin/names/${slug}`);
    else navigate(`/names/${slug}`);
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
      renderCell: (table) => <NavLink to={`/names/${table.row.slug}`}>{table.row.slug}</NavLink>,
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
