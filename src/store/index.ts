import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import namesReducer from "./namesSlice";
import nameReducer from "./nameSlice";
import userReducer from "./userSlice";
import tagsReducer from "./tagsSlice";
import categoriesReducer from "./categorySlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    names: namesReducer,
    name: nameReducer,
    user: persistedUserReducer,
    tags: tagsReducer,
    categories: categoriesReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
