import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useUploadImageMutation
} = imageApi;
