import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Autocomplete, Box, Button, Chip, Paper, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { getNamesForInput } from "../../firebase/services/nameService";
import { addNamesToCategory, deleteCategory, removeNamesFromCategory } from "../../firebase/services/categoryService";

import type { ICategory, NameSlugType } from "../../types/types";

import { useAppDispatch } from "../../store/hooks";
import { fetchCategories } from "../../store/slices/categorySlice";

interface CategryCardProps {
  categoryData: ICategory;
}

export default function CategoryCard({ categoryData }: CategryCardProps) {
  const [nameOptions, setNameOptions] = useState<NameSlugType[]>(categoryData.names);
  const [selectedNames, setSelectedNames] = useState<NameSlugType[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getNamesForInput().then((nameSlugs) =>
      setNameOptions(nameSlugs.filter((nameSlug) => !categoryData.names.some((tagName) => nameSlug.slug === tagName.slug)))
    );
  }, [categoryData.names]);

  const addNameInInput = (nameSlugs: NameSlugType[]) => {
    setSelectedNames(nameSlugs);
    setNameOptions(nameOptions.filter((nameOption) => !nameSlugs.some((nameSlug) => nameSlug.slug === nameOption.slug)));
  };

  const handleAddCategory = async () => {
    await addNamesToCategory(categoryData.slug, selectedNames);
    dispatch(fetchCategories());
  };

  const handleRemoveTag = async (e: React.MouseEvent, nameSlug: NameSlugType) => {
    e.preventDefault();
    e.stopPropagation();
    await removeNamesFromCategory(categoryData.slug, [nameSlug]);
    dispatch(fetchCategories());
  };

  const handleDeleteTag = async (e: React.MouseEvent) => {
    e.preventDefault();
    await deleteCategory(categoryData.slug);
    dispatch(fetchCategories());
  };

  return (
    <Paper elevation={3} sx={{ p: 1, width: 345, height: "fit-content" }}>
      <Button color="error" onClick={handleDeleteTag}>
        <DeleteIcon />
      </Button>

      <Typography variant="h5" component="h2">
        {categoryData.category}
      </Typography>

      <Box>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {categoryData.names.map((name) => (
            <Link to={`/names/${name.slug}`} target="_blank" style={{ width: "fit-content" }} key={name.slug}>
              <Chip
                label={name.name}
                variant="filled"
                onDelete={(e) => {
                  handleRemoveTag(e, name);
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
          renderInput={(params) => <TextField {...params} label="Add Names to Category" variant="outlined" size="small" />}
        />

        <Button onClick={handleAddCategory}>Save</Button>
      </Box>
    </Paper>
  );
}
