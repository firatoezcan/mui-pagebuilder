import { configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import { addComponent, deleteComponent, editorReducer } from "./features/Editor/editorSlice";
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

export const store = configureStore({
  reducer: {
    editor: undoable(editorReducer, {
      filter: (action) => {
        console.log(action);
        const undoableActions = [addComponent.type, deleteComponent.type];
        return undoableActions.includes(action.type);
      },
    }),
  },
});

// export const persistor = persistStore(store)
// const persistConfig = {
//   key: 'root',
//   storage,
// }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
