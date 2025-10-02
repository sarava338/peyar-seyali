import { useLocation, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

import { Button, Card, CardActionArea, CardActions, CardContent, Chip, Stack, Tooltip, Typography } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { NameCardType } from "../../types/types";
import { deleteName } from "../../firebase/services/nameService";

import { useAppDispatch } from "../../store/hooks";
import { fetchNamesForAdmin } from "../../store/slices/namesSlice";

interface NameCardProps {
  nameDetail: NameCardType;
}

const DESCRIPTION_MAX_WORDS = 9; // Maximum words to display in the description

export default function NameCard({ nameDetail }: NameCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isAdminPage = location.pathname.includes("/admin");

  const handleShareClick = async (event: React.MouseEvent) => {
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

  const handleViewClick = (event: React.MouseEvent): void => {
    event.stopPropagation();

    if (isAdminPage) navigate(`/admin/names/${nameDetail.slug}`);
    else navigate(`/names/${nameDetail.slug}`);
  };

  const handleEditClick = (event: React.MouseEvent): void => {
    event.stopPropagation();

    if (isAdminPage) navigate(`/admin/names/${nameDetail.slug}/edit`);
  };

  const handleDeleteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const canDelete = confirm(`Do you really want to delete name - ${nameDetail.slug} ?`);

    try {
      if (canDelete && nameDetail.slug) {
        await deleteName(nameDetail.slug);
        dispatch(fetchNamesForAdmin());
      }
    } catch (error) {
      console.error("error while delete button", error);
    }
  };

  const nameDescription =
    nameDetail.description.split(" ").slice(0, DESCRIPTION_MAX_WORDS).join(" ") +
    `${nameDetail.description.split(" ").length > DESCRIPTION_MAX_WORDS ? "..." : ""}`;

  return (
    <Card elevation={3} sx={{ width: 345 }}>
      <CardActionArea onClick={handleViewClick}>
        <CardContent sx={{ position: "relative", height: 130 }}>
          <Chip
            variant="outlined"
            size="small"
            label={nameDetail.gender}
            sx={{
              position: "absolute",
              bgcolor: nameDetail.gender === "ஆண்" ? "#99ccff" : nameDetail.gender === "பெண்" ? "#ffb4d5" : "#c4e284",
              p: 1,
              top: 22,
              right: -10,
            }}
          />

          <Typography gutterBottom variant="h5" component="h2">
            {nameDetail.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <MDEditor.Markdown source={nameDescription} style={{ color: "#8e8e8e", fontSize: ".9rem" }}></MDEditor.Markdown>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack flexDirection="row" justifyContent="flex-end">
          {isAdminPage && (
            <>
              <Tooltip title="Edit this name">
                <Button size="small" color="primary" onClick={handleEditClick}>
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Delete this name">
                <Button size="small" color="error" onClick={handleDeleteClick}>
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </>
          )}
          <Tooltip title="Share">
            <Button size="small" color="primary" onClick={handleShareClick}>
              <ShareIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Read More">
            <Button size="small" color="primary" onClick={handleViewClick}>
              <ReadMoreIcon />
            </Button>
          </Tooltip>
        </Stack>
      </CardActions>
    </Card>
  );
}
