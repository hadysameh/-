import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {userSlice} from "../features/user";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  userSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer:persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       // Ignore these action types
  //       ignoredActions: ['editorSlice/updateFileEditorState'],
  //       // Ignore these field paths in all actions
  //       ignoredActionPaths: [`editorSlice.filesEditorStates.0.state`, `payload.fileEditorState`],
  //       // Ignore these paths in the state
  //       ignoredPaths: ["items.dates"],
  //     },
  //   }),
  middleware: [thunk]
}
);
export const persistor = persistStore(store)
// export default store;
