import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import rootReducer from "./collections"
import storageSession from 'redux-persist/lib/storage/session' 
import { persistStore, persistReducer } from 'redux-persist'
 
const persistConfig = {
  key: 'root',
  storage: storageSession,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export {store, persistor}
