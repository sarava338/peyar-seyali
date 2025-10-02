import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { ITag } from "../../types/types";
import { getAllTags } from "../../firebase/services/tagService";

interface TagState {
  tags: ITag[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TagState = {
  tags: [],
  status: "idle",
  error: null,
};

const fetchTags = createAsyncThunk("tags/fetchTags", getAllTags);

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // get tags for admin
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch names";
      }),
});

export default tagSlice.reducer;
export { fetchTags };
