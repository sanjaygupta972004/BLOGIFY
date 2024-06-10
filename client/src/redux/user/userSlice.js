import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const initialState = {
    currentUser: null,
    error: null,
    loading: false,  
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
        signOutStart: (state) => {
            state.loading = true
            state.error = null
        },
        signOutSuccess: (state) => {
            state.loading = false
            state.currentUser = null
            state.error = null
        },
        signOutFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteCurrentUserStart: (state) => {
            state.loading = true
            state.error = null
        },
        deleteCurrentUserSuccess: (state) => {
            state.loading = false
            state.currentUser = null
            state.error = null
        },
        deleteCurrentUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

    },

})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure,
    deleteCurrentUserStart,
    deleteCurrentUserSuccess,
    deleteCurrentUserFailure,
} = userSlice.actions

export default userSlice.reducer