import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: '/fakeApi'}),
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts'
        })
    })
})

export const { useGetPostsQuery } = apiSlice