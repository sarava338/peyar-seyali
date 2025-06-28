import { Button, Card, CardActionArea, CardActions, CardContent, Chip, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import type { IName } from "../../types";

import peyarkal_logo_tamil_and_english from "../../assets/logos/peyarkal_logo_tamil_and_english.png";

interface NameCardProps {
  nameDetail: IName;
}

const DESCRIPTION_MAX_WORDS = 12; // Maximum words to display in the description

export default function NameCard({ nameDetail }: NameCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/names/${nameDetail.slug}`);
  };

  const handleShareClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    const shareData = {
      title: nameDetail.name,
      text: `${nameDetail.name} - ${nameDetail.description}`,
      url: `${window.location.origin}/names/${nameDetail.slug}`,
      file: peyarkal_logo_tamil_and_english,
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

  return (
    <Card elevation={3} sx={{ width: 345 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent sx={{ position: "relative", height: 90 }}>
          <Chip
            variant="outlined"
            size="small"
            label={nameDetail.gender}
            sx={{
              position: "absolute",
              bgcolor: nameDetail.gender === "male" ? "#99ccff" : "#ffb4d5",
              p: 1,
              top: 22,
              right: -10,
            }}
          />

          <Typography gutterBottom variant="h5" component="h2">
            {nameDetail.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {nameDetail.description.split(" ").slice(0, DESCRIPTION_MAX_WORDS).join(" ")}
            {nameDetail.description.split(" ").length > DESCRIPTION_MAX_WORDS && "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleShareClick}>
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
