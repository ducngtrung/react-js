import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApi = createApi({
    reducerPath: "imageApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (data) => ({
                url: "images",
                method: "POST",
                body: data,
            }),
        }),
    }),
});


export const {
    useUploadImageMutation
} = imageApi;