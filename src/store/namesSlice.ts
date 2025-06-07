import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase/firebase";

import type { IName } from "../types";

interface NamesState {
  data: IName[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NamesState = {
  data: [],
  status: "idle",
  error: null,
};

const fetchNames = createAsyncThunk("names/fetchNames", async () => {
  const snapshot = await getDocs(collection(db, "names"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IName));
});

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
