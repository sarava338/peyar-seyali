import { useState } from "react";
import { Box, Button, FormControlLabel, MenuItem, Paper, Switch, TextField, Typography } from "@mui/material";

import { useAppSelector } from "../../store/hooks";

import { addName } from "../../firebase/services/nameService";

const initialFormData = {
  name: "",
  nameInEnglish: "",
  meaning: "",
  origin: "",
  description: "",
  gender: "",
  literatureEvidence: "",
  epigrapicalEvidence: "",
  otherNames: [] as string[],
  relatedNames: [] as string[],
  tags: [] as string[],
  categories: [] as string[],
  slug: "",
  author: "",
  reference: "",
  active: true,
};

export default function AddName() {
  const [formData, setFormData] = useState(initialFormData);
  const user = useAppSelector((state) => state.user.currentUser);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "unisex", label: "Unisex" },
  ];

  const tagOptions = ["Spiritual", "Modern", "Classic", "Nature", "Mythology"];
  const categoryOptions = ["Tamil", "Sanskrit", "Literature", "Poetic"];
  const nameOptions = ["Arun", "Kavi", "Suriya", "Anbu", "Vetri", "Selvi", "Tharun", "Lakshmi", "Karthik", "Meera"];

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

    const formDetail = { ...formData, author: user?.name || "" };

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
      <Paper elevation={3} sx={{ maxWidth: "80%", mx: "auto", p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Add a New Name
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
              <Button type="submit" variant="contained" color="primary">
                Add Name
              </Button>

              <Button type="reset" variant="contained" color="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
            <Box>
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
            </Box>

            <Box>
              <TextField
                select
                fullWidth
                slotProps={{ select: { multiple: true } }}
                label="Other Names"
                name="otherNames"
                value={formData.otherNames}
                onChange={handleChange}
                margin="normal"
              >
                {nameOptions.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                slotProps={{ select: { multiple: true } }}
                label="Related Names"
                name="relatedNames"
                value={formData.relatedNames}
                onChange={handleChange}
                margin="normal"
              >
                {nameOptions.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>

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
                label="Epigraphical Evidence"
                name="epigrapicalEvidence"
                value={formData.epigrapicalEvidence}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
              />

              <TextField
                select
                fullWidth
                slotProps={{ select: { multiple: true } }}
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                margin="normal"
              >
                {tagOptions.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                slotProps={{ select: { multiple: true } }}
                label="Categories"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                margin="normal"
              >
                {categoryOptions.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
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
