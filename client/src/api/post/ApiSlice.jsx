import {createApi} from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../utils/axiosBaseQuery.js';


export const postApi = createApi({
        reducerPath: 'postApi',
        baseQuery: axiosBaseQuery({baseUrl: '/api/v1/posts/'}),
        tagTypes: ['Post'],
        endpoints: (builder) => ({
               createPost: builder.mutation({
                       query: (body) => ({
                               url: 'createPost',
                               method: 'POST',
                               data: body
                       }),
                       providesTags: ['Post'],
               })
        })


})

export const { useCreatePostMutation } = postApi;