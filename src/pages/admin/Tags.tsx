import { useEffect, useState } from "react";

import { Box, Button, Stack, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTags } from "../../store/tagsSlice";

import Error from "../Error";
import Loading from "../Loading";

import TagCard from "../../components/admin/TagCard";
import AddTagForm from "../../components/admin/AddTagForm";

export default function Tags() {
  const { tags, status, error } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  if (status === "loading") return <Loading />;
  if (error) return <Error code={500} messege={error} />;

  return (
    <>
      <Stack direction="row" justifyContent="space-around">
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          அனைத்து குறிச்சொற்கள் - {tags.length}
        </Typography>

        {!showForm && (
          <Button variant="contained" onClick={() => setShowForm(true)} sx={{ height: "fit-content" }}>
            Add New Tag
          </Button>
        )}
      </Stack>

      {showForm && <AddTagForm onClose={() => setShowForm(false)} />}

      {!tags || tags.length === 0 ? (
        <Error code={404} messege="No Tags Found" />
      ) : (
        <Box sx={{ m: { md: 2, sm: 1 }, mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
          {tags.map((tag) => (
            <TagCard key={tag.slug} tagData={tag} />
          ))}
        </Box>
      )}
    </>
  );
}
