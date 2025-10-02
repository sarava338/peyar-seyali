// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../types/types";

type AuthState = {
  user: IUser | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (state) {
        state.user = action.payload;
        state.loading = false;
      }
    },
    clearUser: (state) => {
      if (state) {
        state.user = null;
        state.loading = false;
      }
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
