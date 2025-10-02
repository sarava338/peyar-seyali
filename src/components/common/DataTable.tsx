import { DataGrid } from "@mui/x-data-grid";

import type { GridColDef } from "@mui/x-data-grid";

interface DataTableProps<T extends { slug: string }> {
  rows: T[];
  columns: GridColDef[];
}

export default function DataTable<T extends { slug: string }>({ rows, columns }: DataTableProps<T>) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
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
        backgroundColor: "white", // grid background
        "& .MuiDataGrid-columnHeaders": {
          fontWeight: "bold",
          backgroundColor: "white", // header background
          color: "black", // optional: text color
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: "white", // footer background (optional)
        },
      }}
    />
  );
}
