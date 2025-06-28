import NameCard from "./NameCard";

import type { IName } from "../../types";
import { Box } from "@mui/material";

type NameListProps = {
  names: IName[];
};

export default function NameList({ names }: NameListProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "center",
      }}
    >
      {names.map((nameDetail) => (
        <NameCard key={nameDetail.slug} nameDetail={nameDetail} />
      ))}
    </Box>
  );
}
