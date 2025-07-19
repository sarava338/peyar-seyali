import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCategories } from "../../store/categorySlice";
import Loading from "../Loading";
import Error from "../Error";
import { Box, Typography } from "@mui/material";
import AddCategoryForm from "../../components/admin/AddCategoryForm";
import CategoryCard from "../../components/admin/CategoryCard";

export default function Categories() {
  const { categories, status, error } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading") return <Loading />;
  if (error) return <Error code={500} messege={error} />;

  return (
    <>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        அனைத்து வகைகள் - {categories.length}
      </Typography>
      <AddCategoryForm />
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
