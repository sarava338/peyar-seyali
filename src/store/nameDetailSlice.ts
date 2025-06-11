import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getNameById } from "../firebase/services/nameService";

import type { NameDetail } from "../types";

const fetchNameById = createAsyncThunk("names/fetchNameById", getNameById);

interface NameDetailState {
  data: NameDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NameDetailState = {
  data: null,
  status: "idle",
  error: null,
};

const nameDetailSlice = createSlice({
  name: "nameDetail",
  initialState,
  reducers: {
    clearNameDetail: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNameById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNameById.fulfilled, (state, action) => {
        state.data = action.payload as NameDetail;
        state.status = "succeeded";
      })
      .addCase(fetchNameById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default nameDetailSlice.reducer;
export const { clearNameDetail } = nameDetailSlice.actions;
export { fetchNameById };
