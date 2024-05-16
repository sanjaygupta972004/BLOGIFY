import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateProfile,updateProfileImage } from '../../api/user/apiService'


export const updateProfileAsync = createAsyncThunk(
    'user/updateProfile',
    async (profilePeraMeter, { rejectWithValue }) => {
        try {
            const userData = await updateProfile(profilePeraMeter);
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateProfileImageAsync = createAsyncThunk(
    'user/updateProfileImage',
    async (imageUrl,userId, { rejectWithValue }) => {
        try {
            const userData = await updateProfileImage(imageUrl,userId);
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    profileError: null,
    profileImageError: null,    
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      signInStart: (state) => {
          state.loading = true
          state.error = null
      },
        signInSuccess: (state, action) => {
            state.loading = false,
            state.currentUser = action.payload
            state.error = null
      },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
         .addCase(updateProfileAsync.pending, (state) => {
             state.loading = true
             state.profileError = null
         })
            .addCase(updateProfileAsync.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload
                state.profileError = null
            })
            .addCase(updateProfileAsync.rejected, (state, action) => {
                state.loading = false
                state.profileError = action.payload
            })
            .addCase(updateProfileImageAsync.pending, (state) => {
                state.loading = true
                state.profileImageError = null
            })
            .addCase(updateProfileImageAsync.fulfilled, (state, action) => {
                state.loading = false
                state.currentUser = action.payload
                state.profileImageError = null
            })
            .addCase(updateProfileImageAsync.rejected, (state, action) => {
                state.loading = false
                state.profileImageError = action.payload
            })
    }
      
  
})

export const {signInStart,signInSuccess,signInFailure } = userSlice.actions

export default userSlice.reducer