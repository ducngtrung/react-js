import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todolistApi = createApi({
    reducerPath: "todolistApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/v1",
    }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => ({
                url: "todos",
                method: "GET"
            }),
        }),
    })
})

export const { useGetTodosQuery } = todolistApi;
