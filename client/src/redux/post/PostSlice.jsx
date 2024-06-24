import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {createPost,getAuthorPosts,deletePost} from  "../../api/post/apiService"

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

export const getAuthorPostAsync = createAsyncThunk(
        "post/getAuthorPost",
        async({authorId,startIndex,limit}, {rejectWithValue}) => {
                try {
                        if(authorId){
                                const res =  await getAuthorPosts({
                                        authorId,
                                        startIndex,
                                        limit
                                })
                                return res.data? res.data: res
                        }else{
                           return rejectWithValue("Author Id is required to get Author Post")
                        }
                } catch (error) {
                        return rejectWithValue(error.message)
                }
        }
)


export const deletePostAsync = createAsyncThunk(
        "post/deletePost",
        async({postId}, {rejectWithValue}) => {
                try {
                        if(postId){
                                return await deletePost({postId})
                        }else{
                                return rejectWithValue("Post Id is required to delete a post")
                        }
                } catch (error) {
                        return rejectWithValue(error.message)
                }
        }
)



const initialState = {
        isLoading :false,
        error: null,
        isSuccess: false,
        createPostError: null,
        postData: null,
        authorPosts: []
}

const postSlice = createSlice({
        name : 'post',
        initialState,
        reducers:{
                reSetIsSuccess:(state) => {
                        state.isSuccess = false;
                        state.createPostError = null;
                }
        },
        extraReducers:(builder) => {
                builder
                .addCase(createPostAsync.pending, (state) => {
                        state.isLoading = true;
                        state.createPostError = null;
                        state.isSuccess = false;

                })
                .addCase(createPostAsync.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.postData = action.payload;
                        state.createPostError = null;
                        state.isSuccess = true;
                
                })
                .addCase(createPostAsync.rejected, (state, action) => {
                        state.isLoading = false;
                        state.createPostError = action.payload;
                        state.isSuccess = false;
                
                })
                .addCase(getAuthorPostAsync.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                        state.isSuccess = false;
                
                })
                .addCase(getAuthorPostAsync.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.authorPosts = action.payload;
                        state.error = null;
                        state.isSuccess = true;
                
                })
                .addCase(getAuthorPostAsync.rejected, (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload;
                        state.isSuccess = false;
                
                })

                .addCase(deletePostAsync.pending, (state) => {
                        state.isLoading = true;
                        state.error = null;
                        state.isSuccess = false;
                
                })
                .addCase(deletePostAsync.fulfilled, (state, action) => {
                        state.isLoading = false;
                        state.postData = action.payload;
                        state.error = null;
                        state.isSuccess = true;
                
                })
                .addCase(deletePostAsync.rejected, (state, action) => {
                        state.isLoading = false;
                        state.error = action.payload;
                        state.isSuccess = false;
                
                })

        }
})

export const {reSetIsSuccess} = postSlice.actions;

export default postSlice.reducer;