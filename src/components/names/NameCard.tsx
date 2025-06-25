import { Button, Card, CardActionArea, CardActions, CardContent, Chip, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import type { NameDetail } from "../../types";

interface NameCardProps {
  nameDetail: NameDetail;
}

export default function NameCard({ nameDetail }: NameCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/names/${nameDetail.slug}`);
  };

  return (
    <Card elevation={3} sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent sx={{ position: "relative" }}>
          <Chip
            variant="outlined"
            size="small"
            label={nameDetail.gender}
            sx={{
              position: "absolute",
              bgcolor: nameDetail.gender === "male" ? "#1e90ff" : "#ffa9d0",
              p: 1,
              top: 22,
              right: -10,
            }}
          />

          <Typography gutterBottom variant="h5" component="h3">
            {nameDetail.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {nameDetail.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
