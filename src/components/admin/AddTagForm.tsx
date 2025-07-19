import { useEffect, useState } from "react";

import { Autocomplete, Box, Button, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from "@mui/material";

import type { NameSlugType } from "../../types/types";

import { getNamesForInput } from "../../firebase/services/nameService";
import { addTag } from "../../firebase/services/tagService";

import { useAppDispatch } from "../../store/hooks";
import { fetchTags } from "../../store/tagsSlice";

function getInitialFormData() {
  return {
    tag: "",
    tagInEnglish: "",
    slug: "",
    names: [] as NameSlugType[],
    active: true,
  };
}

export default function AddTagForm() {
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
      await addTag({ ...formData, count: formData.names.length });
      dispatch(fetchTags());
      handleClear();
    } catch (err) {
      const error = err as Error;
      console.error("Error adding tag:", error);
    }
  };

  const handleClear = () => {
    setFormData(getInitialFormData());
  };

  return (
    <Paper elevation={3} sx={{ p: 2, m: { md: 2, sm: 0 } }}>
      <Typography variant="h4" component="h2">
        Add new Tag
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Tag" name="tag" value={formData.tag} onChange={handleChange} margin="normal" required />
              <TextField
                fullWidth
                label="Tag in English"
                name="tagInEnglish"
                value={formData.tagInEnglish}
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
                  Add Tag
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
