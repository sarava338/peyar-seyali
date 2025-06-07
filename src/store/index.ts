import { configureStore } from "@reduxjs/toolkit";

import namesReducer from "./namesSlice";
import nameDetailReducer from "./nameDetailSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    names: namesReducer,
    nameDetail: nameDetailReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
