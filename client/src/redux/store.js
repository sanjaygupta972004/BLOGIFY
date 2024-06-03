import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/userSlice'
import themeReducer from './theme/themeSlice'
import profileReducer from './profile/profileSlice'
import postReducer from './post/PostSlice'

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  profile: profileReducer,
  post: postReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  
})

export const persistor = persistStore(store)