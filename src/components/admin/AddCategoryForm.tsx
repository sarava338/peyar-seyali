import { useEffect, useState } from "react";

import { Autocomplete, Box, Button, FormControlLabel, Grid, Paper, Stack, Switch, TextField, Tooltip, Typography } from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

import type { NameSlugType } from "../../types/types";

import { getNamesForInput } from "../../firebase/services/nameService";
import { addCategory } from "../../firebase/services/categoryService";

import { useAppDispatch } from "../../store/hooks";
import { fetchCategories } from "../../store/categorySlice";

function getInitialFormData() {
  return {
    category: "",
    categoryInEnglish: "",
    slug: "",
    names: [] as NameSlugType[],
    active: true,
  };
}

interface AddCategoryFormProps {
  onClose: () => void;
}

export default function AddCategoryForm({ onClose }: AddCategoryFormProps) {
  const [formData, setFormData] = useState(getInitialFormData());
  const [nameOptions, setNameOptions] = useState([] as NameSlugType[]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getNamesForInput().then(setNameOptions);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const { checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (e.target instanceof HTMLSelectElement && e.target.multiple) {
      const selected = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData((prev) => ({ ...prev, [name]: selected }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addCategory(formData);
      dispatch(fetchCategories());
      handleClear();
    } catch (err) {
      const error = err as Error;
      console.error("Error adding category:", error);
    }
  };

  const handleClear = () => {
    setFormData(getInitialFormData());
  };

  return (
    <Paper elevation={3} sx={{ p: 2, m: { md: 2, sm: 0 } }}>
      <Stack direction="row">
        <Typography variant="h4" component="h2">
          Add new Category
        </Typography>

        <Tooltip title="Close Form">
          <Button color="error" onClick={onClose}>
            <CloseFullscreenIcon />
          </Button>
        </Tooltip>
      </Stack>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Category in English"
                name="categoryInEnglish"
                value={formData.categoryInEnglish}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField fullWidth label="Slug (optional)" name="slug" value={formData.slug} onChange={handleChange} margin="normal" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} alignContent={"center"}>
              <FormControlLabel
                control={<Switch checked={formData.active} onChange={handleChange} name="active" color="primary" />}
                label="Active"
              />

              <Autocomplete
                sx={{ mt: 2, mb: 3 }}
                fullWidth
                multiple
                options={nameOptions}
                getOptionLabel={(name) => name.name}
                value={formData.names}
                onChange={(_e, value) => setFormData({ ...formData, names: value })}
                renderInput={(params) => <TextField {...params} label="Names" variant="outlined" />}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Add Category
                </Button>

                <Button type="reset" variant="contained" color="secondary" onClick={handleClear}>
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}
