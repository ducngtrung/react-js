import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/admin" }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "categories",
        }),
    }),
});

export const {
    useGetCategoriesQuery
} = categoryApi;