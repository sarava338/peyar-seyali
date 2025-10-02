import { DataGrid } from "@mui/x-data-grid";

import type { GridColDef } from "@mui/x-data-grid";
/**
 *
 *
 * @interface DataTableProps
 * @template T
 */
interface DataTableProps<T extends { slug: string }> {
  rows: T[];
  columns: GridColDef[];
  columnVisibilityModel?: Record<string, boolean>;
  onColumnVisibilityModelChange?: (model: Record<string, boolean>) => void;
}


export default function DataTable<T extends { slug: string }>({ rows, columns, columnVisibilityModel, onColumnVisibilityModelChange }: DataTableProps<T>) {
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
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={onColumnVisibilityModelChange}
      showToolbar
      getRowId={(row) => row.slug}
      pageSizeOptions={[10]}
      checkboxSelection
      disableRowSelectionOnClick
      sx={{
        mt: 3,
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
