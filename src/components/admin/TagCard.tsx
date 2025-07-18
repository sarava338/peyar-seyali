import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Autocomplete, Box, Button, Chip, Paper, Stack, TextField, Typography } from "@mui/material";

import { getNamesForInput } from "../../firebase/services/nameService";

import type { ITag, NameSlugType } from "../../types/types";

import { useAppDispatch } from "../../store/hooks";
import { fetchTags } from "../../store/tagsSlice";
import { addNameSlugsToTag, removeNameSlugsFromTag } from "../../firebase/services/tagService";

interface TagCardProps {
  tagData: ITag;
}

export default function TagCard({ tagData }: TagCardProps) {
  const [nameOptions, setNameOptions] = useState<NameSlugType[]>(tagData.names);
  const [selectedNames, setSelectedNames] = useState<NameSlugType[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getNamesForInput().then((nameSlugs) =>
      setNameOptions(nameSlugs.filter((nameSlug) => !tagData.names.some((tagName) => nameSlug.slug === tagName.slug)))
    );
  }, [tagData.names]);

  const addNameInInput = (nameSlugs: NameSlugType[]) => {
    setSelectedNames(nameSlugs);
    setNameOptions(nameOptions.filter((nameOption) => !nameSlugs.some((nameSlug) => nameSlug.slug === nameOption.slug)));
  };

  const handleAddTag = async () => {
    const nameSlugs = selectedNames.map((name) => name.slug);

    await addNameSlugsToTag(tagData.slug, nameSlugs);

    dispatch(fetchTags());
  };

  const handleRemoveTag = async (e: React.MouseEvent, nameSlug: string) => {
    e.preventDefault();
    e.stopPropagation();
    await removeNameSlugsFromTag(tagData.slug, [nameSlug]);
    dispatch(fetchTags());
  };

  return (
    <Paper elevation={3} sx={{ p: 1, width: 345, height: "fit-content" }}>
      <Typography variant="h5" component="h2">
        {tagData.tag}
      </Typography>

      <Box>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {tagData.names.map((name) => (
            <Link to={`/names/${name.slug}`} target="_blank" style={{ width: "fit-content" }} key={name.slug}>
              <Chip
                label={name.name}
                variant="filled"
                onDelete={(e) => {
                  handleRemoveTag(e, name.slug);
                }}
              />
            </Link>
          ))}
        </Stack>

        <Autocomplete
          sx={{ mt: 2, mb: 3 }}
          fullWidth
          multiple
          options={nameOptions}
          getOptionLabel={(name) => name.name}
          value={selectedNames}
          onChange={(_e, value) => addNameInInput(value)}
          renderInput={(params) => <TextField {...params} label="Add Names to Tag" variant="outlined" size="small" />}
        />

        <Button onClick={handleAddTag}>Save</Button>
      </Box>
    </Paper>
  );
}
