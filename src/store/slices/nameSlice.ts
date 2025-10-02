import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { IName } from "../../types/types";
import { getNameById, getNameByIdForAdmin } from "../../firebase/services/nameService";

interface INameState {
  data: IName | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: INameState = {
  data: null,
  status: "idle",
  error: null,
};

const fetchNameById = createAsyncThunk("names/fetchNameById", getNameById);
const fetchNameByIdForAdmin = createAsyncThunk("names/fetchNameByIdForAdmin", getNameByIdForAdmin);

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    clearIName: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Public fetch name by ID
      .addCase(fetchNameById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNameById.fulfilled, (state, action) => {
        state.data = action.payload as IName;
        state.status = "succeeded";
      })
      .addCase(fetchNameById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch";
      })

      // Admin fetch name by ID
      .addCase(fetchNameByIdForAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNameByIdForAdmin.fulfilled, (state, action) => {
        state.data = action.payload as IName;
        state.status = "succeeded";
      })
      .addCase(fetchNameByIdForAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default nameSlice.reducer;
export const { clearIName } = nameSlice.actions;
export { fetchNameById, fetchNameByIdForAdmin };
