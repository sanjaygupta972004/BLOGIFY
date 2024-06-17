import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {createPost} from  "../../api/post/apiService"

export const createPostAsync = createAsyncThunk(
        "post/createPost",
        async({formData}, {rejectWithValue}) => {
                try {  
                     return await createPost({formData})
                } catch (error) {
                      return rejectWithValue(error.message)
                } 
        }
)

const initialState = {
        isLoading :false,
        error: null,
        isSuccess: false,
        postData: null
}

const postSlice = createSlice({
        name : 'post',
        initialState,
        reducers:{
                reSetIsSuccess:(state) => {
                        state.isSuccess = false;
                }
        },
        extraReducers:(builder) => {
                builder
                .addCase(createPostAsync.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                        state.isSuccess = false;

                })
                .addCase(createPostAsync.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.postData = action.payload;
                        state.error = null;
                        state.isSuccess = true;
                
                })
                .addCase(createPostAsync.rejected, (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload;
                        state.isSuccess = false;
                
                })

        }
})

export const {reSetIsSuccess} = postSlice.actions;

export default postSlice.reducer;