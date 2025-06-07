import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";

import type { IName } from "../types";

const fetchNameById = createAsyncThunk(
  "names/fetchNameById",
  async (id: string) => {
    const docRef = doc(db, "names", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Name not found");
    }
  }
);

interface NameDetailState {
  data: IName | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NameDetailState = {
  data: null,
  status: "idle",
  error: null,
};

const nameSlice = createSlice({
  name: "nameDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default nameSlice.reducer;
export { fetchNameById };
