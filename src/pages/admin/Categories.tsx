import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCategories } from "../../store/categorySlice";
import Loading from "../Loading";
import Error from "../Error";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddCategoryForm from "../../components/admin/AddCategoryForm";
import CategoryCard from "../../components/admin/CategoryCard";

export default function Categories() {
  const { categories, status, error } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading") return <Loading />;
  if (error) return <Error code={500} messege={error} />;

  return (
    <>
      <Stack direction="row" justifyContent="space-around">
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          அனைத்து வகைகள் - {categories.length}
        </Typography>

        {!showForm && (
          <Button variant="contained" onClick={() => setShowForm(true)} sx={{ height: "fit-content" }}>
            Add New Category
          </Button>
        )}
      </Stack>

      {showForm && <AddCategoryForm onClose={() => setShowForm(false)} />}

      {!categories || categories.length === 0 ? (
        <Error code={404} messege="No Categories Found" />
      ) : (
        <Box sx={{ m: { md: 2, sm: 1 }, mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
          {categories.map((category) => (
            <CategoryCard key={category.slug} categoryData={category} />
          ))}
        </Box>
      )}
    </>
  );
}
