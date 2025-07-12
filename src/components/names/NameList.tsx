import { useState } from "react";
import { useNavigate } from "react-router-dom";

import NameCard from "./NameCard";

import type { NameCardType } from "../../types/types";

import { Box, IconButton, Slide, Snackbar, type SnackbarCloseReason } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppSelector } from "../../store/hooks";

type NameListProps = {
  names: NameCardType[];
};

const initialMessageState = () => ({
  open: false,
  success: false,
  message: "",
});

export default function NameList({ names }: NameListProps) {
  const navigate = useNavigate();
  const { currentUser: user } = useAppSelector((state) => state.user);

  const [messageState, setMessageState] = useState(initialMessageState());

  const handleMessageClose = (_e: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason == "clickaway") return;
    setMessageState(initialMessageState());
  };

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

  return (
    <Box component="section" sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", mt: 3 }}>
      <Snackbar
        sx={{ mt: 7, mr: 7.5 }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        autoHideDuration={2000}
        open={messageState.open}
        onClose={handleMessageClose}
        message={messageState.message}
        action={
          <>
            <IconButton aria-label="close" sx={{ color: "white", p: 0.5 }} onClick={handleMessageClose}>
              <CloseIcon />
            </IconButton>
          </>
        }
      />

      {names.map((nameDetail) =>
        user && user.isAdmin ? (
          <NameCard key={nameDetail.slug} nameDetail={nameDetail} onShare={handleShare} onView={handleView} onEdit={handleEdit} />
        ) : (
          <NameCard key={nameDetail.slug} nameDetail={nameDetail} onShare={handleShare} onView={handleView} />
        )
      )}
    </Box>
  );
}
