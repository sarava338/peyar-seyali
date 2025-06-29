import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllNames, getAllNamesForAdmin } from "../firebase/services/nameService";

import type { NameCard } from "../types";

interface NamesState {
  publicNames: NameCard[];
  adminNames: NameCard[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NamesState = {
  publicNames: [],
  adminNames: [],
  status: "idle",
  error: null,
};

const fetchNames = createAsyncThunk("names/fetchNames", getAllNames);
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
        state.error = action.error.message || "Failed to fetch names";
      });
  },
});

export default namesSlice.reducer;
export { fetchNames, fetchNamesForAdmin };
