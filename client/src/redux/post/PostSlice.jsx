import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {createPost} from  "../../api/post/apiService"

export const createPostAsync = createAsyncThunk(
        "post/createPost",
        async({formData}, {rejectWithValue}) => {
                try {  
                      await createPost({formData})
                } catch (error) {
                      return rejectWithValue(error.message)
                } 
        }
)

const initialState = {
        isLoading :false,
        error: null,
        posts: [],
}

const postSlice = createSlice({
        name : 'post',
        initialState,
        extraReducers:(builder) => {
                builder
                .addCase(createPostAsync.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;

                })
                .addCase(createPostAsync.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.posts = action.payload;
                        state.error = null;
                
                })
                .addCase(createPostAsync.rejected, (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload;
                
                })

        }
})

export default postSlice.reducer;