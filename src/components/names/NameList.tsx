import NameCard from "./NameCard";

import type { NameDetail } from "../../types";
import { Box } from "@mui/material";

type NameListProps = {
  names: NameDetail[];
};

export default function NameList({ names }: NameListProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
      }}
    >
      {names.map((nameDetail) => (
        <NameCard key={nameDetail.slug} nameDetail={nameDetail} />
      ))}
    </Box>
  );
}
