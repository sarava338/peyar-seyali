import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAllNames } from "../firebase/services/nameService";

import type { NameDetail } from "../types";

interface NamesState {
  data: NameDetail[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NamesState = {
  data: [],
  status: "idle",
  error: null,
};

const fetchNames = createAsyncThunk("names/fetchNames", getAllNames);

const namesSlice = createSlice({
  name: "names",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNames.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNames.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchNames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch names";
      });
  },
});

export default namesSlice.reducer;
export { fetchNames };
