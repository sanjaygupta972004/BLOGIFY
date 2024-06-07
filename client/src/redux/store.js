import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/userSlice'
import themeReducer from './theme/themeSlice'
import profileReducer from './profile/profileSlice'
import postReducer from './post/PostSlice'
import { postApi } from '../api/post/ApiSlice.jsx'

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  profile: profileReducer,
  post: postReducer,
  [postApi.reducerPath]: postApi.reducer,
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
  }).concat(postApi.middleware),

})
  


export const persistor = persistStore(store)