import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Slide,
  Snackbar,
  Switch,
  TextField,
  Typography,
  type SnackbarCloseReason,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { addName, getNamesForInput } from "../../firebase/services/nameService";
import { getTagsForInput } from "../../firebase/services/tagService";
import { getCategoriesForInput } from "../../firebase/services/categoryService";

import type { CategorySlugType, IName, NameSlugType, TagSlugType } from "../../types/types";

function getInitialFormData(): IName {
  return {
    name: "",
    nameInEnglish: "",
    meaning: "",
    origin: "",
    description: "",
    gender: "",
    special: "",
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
}

const initialMessageState = () => ({
  open: false,
  success: false,
  message: "",
});

export default function AddName() {
  const [formData, setFormData] = useState<IName>(getInitialFormData());

  const [tagOptions, setTagOptions] = useState<TagSlugType[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<CategorySlugType[]>([]);
  const [nameOptions, setNameOptions] = useState<NameSlugType[]>([]);

  const [messageState, setMessageState] = useState(initialMessageState());

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

  const handleMessageClose = (_e: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason == "clickaway") return;
    setMessageState(initialMessageState());
  };

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
      await addName(formData);
      handleClear();
      setMessageState({ open: true, success: true, message: "Name Created Successfully" });
    } catch (err) {
      const error = err as Error;
      setMessageState({ open: true, success: false, message: `Error adding name: ${error.message}` });
      console.error("Error adding name:", error);
    }
  };

  const handleClear = () => {
    setFormData(getInitialFormData());
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ maxWidth: "90%", mx: "auto", p: 3 }}>
        <Snackbar
          sx={{ mt: 7, mr: 7.5 }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={(props) => <Slide {...props} direction="left" />}
          autoHideDuration={2000}
          open={messageState.open}
          onClose={handleMessageClose}
          message={messageState.message}
          action={
            <>
              <IconButton aria-label="close" sx={{ color: "white", p: 0.5 }} onClick={handleMessageClose}>
                <CloseIcon />
              </IconButton>
            </>
          }
        />

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

          <Box>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
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
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
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

                <TextField fullWidth label="Slug (Optional)" name="slug" value={formData.slug} onChange={handleChange} margin="normal" />
              </Grid>
              <FormControlLabel
                control={<Switch checked={formData.active} onChange={handleChange} name="active" color="primary" />}
                label="Active"
              />
            </Grid>

            <Grid container spacing={3}>
              <Grid size={{ sm: 12, md: 6 }}>
                <Autocomplete
                  sx={{ mt: 2, mb: 3 }}
                  fullWidth
                  multiple
                  options={nameOptions}
                  getOptionLabel={(name) => name.name}
                  value={formData.otherNames}
                  onChange={(_e, value) => setFormData({ ...formData, otherNames: value })}
                  renderInput={(params) => <TextField {...params} label="Other Names" variant="outlined" />}
                />

                <Autocomplete
                  sx={{ mt: 2, mb: 3 }}
                  fullWidth
                  multiple
                  options={nameOptions}
                  getOptionLabel={(name) => name.name}
                  value={formData.relatedNames}
                  onChange={(_e, value) => setFormData({ ...formData, relatedNames: value })}
                  renderInput={(params) => <TextField {...params} label="Related Names" variant="outlined" />}
                />
              </Grid>

              <Grid size={{ sm: 12, md: 6 }}>
                <Autocomplete
                  sx={{ mt: 2, mb: 3 }}
                  fullWidth
                  multiple
                  options={tagOptions}
                  getOptionLabel={(tag) => tag.tag}
                  value={formData.tags}
                  onChange={(_e, value) => setFormData({ ...formData, tags: value })}
                  renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
                />

                <Autocomplete
                  sx={{ mt: 2, mb: 3 }}
                  fullWidth
                  multiple
                  options={categoryOptions}
                  getOptionLabel={(cat) => cat.category}
                  value={formData.categories}
                  onChange={(_e, value) => setFormData({ ...formData, categories: value })}
                  renderInput={(params) => <TextField {...params} label="Categories" variant="outlined" />}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid size={{ sm: 12, md: 6 }}>
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ mb: 2 }} marginBottom={1}>
                    Description :
                  </Typography>
                  <MDEditor value={formData.description} onChange={(val) => setFormData((form) => ({ ...form, description: val || "" }))} />
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ mb: 2 }} marginBottom={1}>
                    Special :
                  </Typography>
                  <MDEditor value={formData.special} onChange={(val) => setFormData((form) => ({ ...form, special: val || "" }))} />
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ mb: 2 }} marginBottom={1}>
                    Reference :
                  </Typography>
                  <MDEditor value={formData.reference} onChange={(val) => setFormData((form) => ({ ...form, reference: val || "" }))} />
                </Box>
              </Grid>

              <Grid size={{ sm: 12, md: 6 }}>
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ mb: 2 }} marginBottom={1}>
                    Literature Evidence :
                  </Typography>
                  <MDEditor
                    value={formData.literatureEvidence}
                    onChange={(val) => setFormData((form) => ({ ...form, literatureEvidence: val || "" }))}
                  />
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ mb: 2 }} marginBottom={1}>
                    Epigraph Evidence :
                  </Typography>
                  <MDEditor
                    value={formData.epigraphEvidence}
                    onChange={(val) => setFormData((form) => ({ ...form, epigraphEvidence: val || "" }))}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

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
