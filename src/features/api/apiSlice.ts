import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

let postTag = 'Post'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: '/fakeApi'}),
    tagTypes: ['Post'],
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Post']
        }),
        getPost: builder.query({
            query: postId => `/posts/${postId}`,
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['Post']
        }),
        editPost: builder.mutation({
            query: post => ({
                url: `/posts/${post.id}`,
                method: 'PATCH',
                body: post
            }),
            invalidatesTags: ['Post']
        })
    }),
})

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation,
    useEditPostMutation,
} = apiSlice