import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllNames, getAllNamesForAdmin } from "../firebase/services/nameService";

import type { NameCardType } from "../types/types";
import { getNamesFromTag } from "../firebase/services/tagService";
import { getNamesFromCategory } from "../firebase/services/categoryService";

interface NamesState {
  publicNames: NameCardType[];
  tagNames: NameCardType[];
  categoryNames: NameCardType[];
  adminNames: NameCardType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NamesState = {
  publicNames: [],
  tagNames: [],
  categoryNames: [],
  adminNames: [],
  status: "idle",
  error: null,
};

const fetchNames = createAsyncThunk("names/fetchNames", getAllNames);
const fetchNamesWithTag = createAsyncThunk("names/fetchNamesWithTag", getNamesFromTag);
const fetchNamesWithCategory = createAsyncThunk("names/fetchNamesWithCategory", getNamesFromCategory);
const fetchNamesForAdmin = createAsyncThunk("names/fetchNamesForAdmin", getAllNamesForAdmin);

const namesSlice = createSlice({
  name: "names",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // public fetch
      .addCase(fetchNames.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNames.fulfilled, (state, action) => {
        state.publicNames = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchNames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch names";
      })

      // tag names
      .addCase(fetchNamesWithTag.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNamesWithTag.fulfilled, (state, action) => {
        state.tagNames = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchNamesWithTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch names for tag";
      })

      // category names
      .addCase(fetchNamesWithCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNamesWithCategory.fulfilled, (state, action) => {
        state.categoryNames = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchNamesWithCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch names for category";
      })

      // admin fetch
      .addCase(fetchNamesForAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNamesForAdmin.fulfilled, (state, action) => {
        state.adminNames = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchNamesForAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch names for admin";
      });
  },
});

export default namesSlice.reducer;
export { fetchNames, fetchNamesForAdmin, fetchNamesWithTag, fetchNamesWithCategory };
