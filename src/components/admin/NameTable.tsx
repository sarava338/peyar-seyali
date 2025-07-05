import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Typography, Button } from "@mui/material";

import type { NameCardType } from "../../types/types";

interface NameTableProps {
  names: NameCardType[];
  handleView: (nameSlug: string) => void;
  handleEdit: (nameSlug: string) => void;
  handleDelete: (nameSlug: string) => void;
}

export default function NameTable({ names, handleView, handleEdit, handleDelete }: NameTableProps) {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Id / Slug</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">English Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Gender</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {names.map((name) => (
            <TableRow key={name.slug}>
              <TableCell>{name.slug}</TableCell>
              <TableCell>{name.name}</TableCell>
              <TableCell>{name.nameInEnglish}</TableCell>
              <TableCell>{name.gender}</TableCell>
              <TableCell align="center">
                <Tooltip title="View">
                  <Button onClick={() => handleView(name.slug!)}>View</Button>
                </Tooltip>
                <Tooltip title="Edit">
                  <Button onClick={() => handleEdit(name.slug!)}>Edit</Button>
                </Tooltip>
                <Tooltip title="Delete">
                  <Button color="error" onClick={() => handleDelete(name.slug!)}>
                    X
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}

          {names.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2" color="text.secondary">
                  No names found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
