import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateProfile,updateProfileImage } from '../../api/user/apiService';


export const updateProfileAsync = createAsyncThunk(
    'profile/updateProfile',
    async ({formData,userId}, { rejectWithValue }) => {
        try {
            const userData = await updateProfile({formData,userId});
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const updateProfileImageAsync = createAsyncThunk(
    'profile/updateProfileImage',
    async ({ imageUrl, userId }, { rejectWithValue }) => {
        try {
            const userData = await updateProfileImage({ imageUrl, userId })
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    loading: false,
    profileError: null,
    profileImageError: null,
    userProfile:null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) =>{
         builder
         .addCase(updateProfileAsync.pending, (state) => {
             state.loading = true
             state.profileError = null
         })
            .addCase(updateProfileAsync.fulfilled, (state, action) => {
                state.loading = false
                state.userProfile = action.payload
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
                state.userProfile = action.payload
                state.profileImageError = null
            })
            .addCase(updateProfileImageAsync.rejected, (state, action) => {
                state.loading = false
                state.profileImageError = action.payload
            })
    }
})

export default profileSlice.reducer;