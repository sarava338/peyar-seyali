import NameCard from "./NameCard";

import type { NameCardType } from "../../types/types";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteName } from "../../firebase/services/nameService";
import { useAppSelector } from "../../store/hooks";

type NameListProps = {
  names: NameCardType[];
};

export default function NameList({ names }: NameListProps) {
  const navigate = useNavigate();
  const { currentUser: user } = useAppSelector((state) => state.user);

  const handleView = (nameSlug: string) => (user && user.isAdmin ? navigate(`/admin/names/${nameSlug}`) : navigate(`/names/${nameSlug}`));
  const handleEdit = (nameSlug: string) => navigate(`/admin/names/${nameSlug}/edit`);

  const handleShare = async (nameDetail: NameCardType) => {
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

  const handleDelete = async (nameSlug: string) => {
    const canDelete = confirm(`Do you really want to delete name - ${nameSlug} ?`);

    try {
      if (canDelete) {
        await deleteName(nameSlug);
      }
    } catch (error) {
      console.error("error while delete button", error);
    }
  };

  return (
    <Box component="section" sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", mt: 3 }}>
      {names.map((nameDetail) =>
        user && user.isAdmin ? (
          <NameCard
            key={nameDetail.slug}
            nameDetail={nameDetail}
            onShare={handleShare}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <NameCard key={nameDetail.slug} nameDetail={nameDetail} onShare={handleShare} onView={handleView} />
        )
      )}
    </Box>
  );
}
