import { configureStore } from "@reduxjs/toolkit";
// import { reducer } from './reducer'; - на случай отдельной комбинации
// import { contactsReducer } from "./contactsService/contactsSlice";
// import { filterReducer } from "./filter/filterSlice";
import { authReducer } from "./authService/authSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { postsReducer } from "./postsService/postsSlice";
import { ownPostsReducer } from "./ownPostsService/ownPostsSlice";
import { commentsReducer } from "./commentsSlice/commentsSlice";

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from "redux-persist/lib/storage";

// const authPersistConfig = {
//   key: 'goit-react-hw-08-phonebook2',
//   storage,
//   whitelist: ['token'],
// };

// const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    // contactsCombine: contactsReducer,
    // filterCombine: filterReducer,
    authCombine: authReducer,
    postsCombine: postsReducer,
    ownPostsCombine: ownPostsReducer,
    commentsCombine: commentsReducer,
  },
  // лечит ошибки в консоли
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // thunk: false,
      // immutableCheck: false,
      // actionCreatorCheck: false,
      // serializableCheck: { ignoredPaths: ["firebase", "firestore"] },
    }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});

// export const persistor = persistStore(store);
