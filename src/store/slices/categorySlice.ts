import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { ICategory } from "../../types/types";
import { getAllCategories } from "../../firebase/services/categoryService";

interface TagState {
  categories: ICategory[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TagState = {
  categories: [],
  status: "idle",
  error: null,
};

const fetchCategories = createAsyncThunk("categories/fetchCategories", getAllCategories);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // get categories for admin
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch names";
      }),
});

export default categorySlice.reducer;
export { fetchCategories };
