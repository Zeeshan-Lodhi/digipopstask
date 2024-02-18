import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TodoApi } from "./services/todo";
import authReducer from "./authSlice";
import storage from "redux-persist/lib/storage";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

const reducers = combineReducers({
  auth: authReducer,
  [TodoApi.reducerPath]: TodoApi.reducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(TodoApi.middleware),
});

setupListeners(store.dispatch);
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
