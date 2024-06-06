import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';


const initialState = {
        posts: [],
        loading : false,
        error: null
}

const postSlice = createSlice({
        name : 'post',
        initialState,
})

export default postSlice.reducer;