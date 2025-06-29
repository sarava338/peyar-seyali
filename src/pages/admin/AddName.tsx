import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, FormControlLabel, Grid, MenuItem, Paper, Switch, TextField, Typography } from "@mui/material";

import { useAppSelector } from "../../store/hooks";

import { addName, getNamesForInput } from "../../firebase/services/nameService";
import { getTagsForInput } from "../../firebase/services/tagService";
import { getCategoriesForInput } from "../../firebase/services/categoryService";

import type { ICategory, IName, ITag } from "../../types";

const initialFormData: IName = {
  name: "",
  nameInEnglish: "",
  meaning: "",
  origin: "",
  description: "",
  gender: "",
  literatureEvidence: "",
  epigraphEvidence: "",
  otherNames: [],
  relatedNames: [],
  tags: [],
  categories: [],
  slug: "",
  author: "",
  reference: "",
  active: true,
};

export default function AddName() {
  const [formData, setFormData] = useState<IName>(initialFormData);
  const user = useAppSelector((state) => state.user.currentUser);

  const [tagOptions, setTagOptions] = useState<Pick<ITag, "tag" | "slug">[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Pick<ICategory, "category" | "slug">[]>([]);
  const [nameOptions, setNameOptions] = useState<Pick<IName, "name" | "slug">[]>([]);

  useEffect(() => {
    getTagsForInput().then(setTagOptions);
    getCategoriesForInput().then(setCategoryOptions);
    getNamesForInput().then(setNameOptions);
  }, []);

  const genderOptions = [
    { value: "ஆண்", label: "ஆண்" },
    { value: "பெண்", label: "பெண்" },
    { value: "இருபாலர்", label: "இருபாலர்" },
  ];

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

    const formDetail = { ...formData, author: user?.email || "ADMIN" };

    try {
      await addName(formDetail);
      handleClear();
    } catch (err) {
      const error = err as Error;
      alert("Error adding name. : " + error.message);
      console.error("Error adding name:", error);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ maxWidth: "90%", mx: "auto", p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Add a New Name
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-between", gap: 5 }}>
              <Button type="submit" variant="contained" color="primary">
                Add Name
              </Button>

              <Button type="reset" variant="contained" color="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Box>
          </Box>
          <Grid container gap={3}>
            <Grid size={{ md: 6, xs: 12 }}>
              <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
              <TextField
                fullWidth
                label="Name in English"
                name="nameInEnglish"
                value={formData.nameInEnglish}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Meaning"
                name="meaning"
                value={formData.meaning}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
                required
              />
              <TextField fullWidth label="Origin" name="origin" value={formData.origin} onChange={handleChange} margin="normal" required />
              <TextField
                select
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                margin="normal"
                required
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <FormControlLabel
                control={<Switch checked={formData.active} onChange={handleChange} name="active" color="primary" />}
                label="Active"
              />

              <TextField fullWidth label="Slug (Optional)" name="slug" value={formData.slug} onChange={handleChange} margin="normal" />
            </Grid>

            <Grid size={{ md: 5, xs: 12 }}>
              <Autocomplete
                sx={{ mt: 2, mb: 3 }}
                fullWidth
                multiple
                options={nameOptions}
                getOptionLabel={(name) => name.name}
                onChange={(_e, value) => setFormData({ ...formData, otherNames: value })}
                renderInput={(params) => <TextField {...params} label="Other Names" variant="outlined" />}
              />

              <Autocomplete
                sx={{ mt: 2, mb: 3 }}
                fullWidth
                multiple
                options={nameOptions}
                getOptionLabel={(name) => name.name}
                onChange={(_e, value) => setFormData({ ...formData, relatedNames: value })}
                renderInput={(params) => <TextField {...params} label="Related Names" variant="outlined" />}
              />

              <TextField
                fullWidth
                label="Literature Evidence"
                name="literatureEvidence"
                value={formData.literatureEvidence}
                multiline
                rows={3}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Epigraph Evidence"
                name="epigraphEvidence"
                value={formData.epigraphEvidence}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
              />

              <Autocomplete
                sx={{ mt: 2, mb: 3 }}
                fullWidth
                multiple
                options={tagOptions}
                getOptionLabel={(tag) => tag.tag}
                onChange={(_e, value) => setFormData({ ...formData, tags: value })}
                renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
              />

              <Autocomplete
                sx={{ mt: 2, mb: 3 }}
                fullWidth
                multiple
                options={categoryOptions}
                getOptionLabel={(cat) => cat.category}
                onChange={(_e, value) => setFormData({ ...formData, categories: value })}
                renderInput={(params) => <TextField {...params} label="Categories" variant="outlined" />}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Reference"
            name="reference"
            value={formData.literatureEvidence}
            multiline
            rows={2}
            onChange={handleChange}
            margin="normal"
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Add Name
            </Button>

            <Button type="reset" variant="contained" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
