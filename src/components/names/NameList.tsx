import NameCard from "./NameCard";

import type { NameCardType } from "../../types/types";
import { Box } from "@mui/material";

type NameListProps = {
  names: NameCardType[];
};

export default function NameList({ names }: NameListProps) {
  return (
    <Box component="section" sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", mt: 3 }}>
      {names.map((nameDetail) => (
        <NameCard key={nameDetail.slug} nameDetail={nameDetail} />
      ))}
    </Box>
  );
}
