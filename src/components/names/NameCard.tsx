import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

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
    <Card elevation={3} sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
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
