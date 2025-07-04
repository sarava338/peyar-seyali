import { useNavigate } from "react-router-dom";

import { Button, Card, CardActionArea, CardActions, CardContent, Chip, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

import type { NameCardType } from "../../types/types";
import MDEditor from "@uiw/react-md-editor";
interface NameCardProps {
  nameDetail: NameCardType;
}

const DESCRIPTION_MAX_WORDS = 11; // Maximum words to display in the description

export default function NameCardType({ nameDetail }: NameCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/names/${nameDetail.slug}`);
  };

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
        console.log("Share successful");
      } else alert("Sharing not supported in this browser.");
    } catch (error) {
      console.error("Error preparing share data:", error);
    }
  };

  const nameDescription =
    nameDetail.description.split(" ").slice(0, DESCRIPTION_MAX_WORDS).join(" ") +
    `${nameDetail.description.split(" ").length > DESCRIPTION_MAX_WORDS ? "..." : ""}`;

  return (
    <Card elevation={3} sx={{ width: 345 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent sx={{ position: "relative", height: 110 }}>
          <Chip
            variant="outlined"
            size="small"
            label={nameDetail.gender}
            sx={{
              position: "absolute",
              bgcolor: nameDetail.gender === "ஆண்" ? "#99ccff" : "#ffb4d5",
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
        <Button size="small" color="primary" onClick={handleShareClick}>
          Share <ShareIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
