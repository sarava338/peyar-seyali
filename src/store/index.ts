import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import namesReducer from "./slices/namesSlice";
import nameReducer from "./slices/nameSlice";
import authReducer from "./slices/authSlice";
import tagsReducer from "./slices/tagsSlice";
import categoriesReducer from "./slices/categorySlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist auth state
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    names: namesReducer,
    name: nameReducer,
    tags: tagsReducer,
    categories: categoriesReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
