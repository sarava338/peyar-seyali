import { configureStore } from "@reduxjs/toolkit";

import namesReducer from "./namesSlice";
import nameDetailReducer from "./nameDetailSlice";
import userReducer from "./userSlice";
import createSessionStorage from "./sessionStorageEngine";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: createSessionStorage(),
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    names: namesReducer,
    nameDetail: nameDetailReducer,
    user: persistedUserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
