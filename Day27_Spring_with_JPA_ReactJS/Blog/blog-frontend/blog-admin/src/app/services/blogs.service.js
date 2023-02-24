// Nếu dùng createAsyncThunk thì gọi back-end API ngay trong slice
// Trong bài này dùng RTK Query nên cần xây dựng folder "services" để quản lý riêng việc gọi back-end API, tách biệt với folder "slices" dùng để quản lý state

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Reference: https://redux-toolkit.js.org/rtk-query/overview#create-an-api-slice
export const blogApi = createApi({
    reducerPath: "blogApi",

    // Lấy đường dẫn API chung của ứng dụng
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/admin" }),
    
    // tagTypes: ['Post'],

    // Mỗi endPoint chịu trách nhiệm gọi 1 back-end API
    endpoints: (builder) => ({
        getBlogs: builder.query({ // "query" dùng để gọi API truy xuất dữ liệu
            query: () => "blogs",
            // providesTags: ['Post'],
        }),
        getBlogById: builder.query({
            query: (id) => `blogs/${id}`,
        }),
        getOwnBlogs: builder.query({
            query: () => `blogs/own-blogs`,
        }),
        createBlog: builder.mutation({ // "mutation" dùng để gọi API thay đổi dữ liệu (thêm, sửa, xóa)
            query: (data) => ({
                url: "blogs",
                method: "POST",
                body: data,
            }),
            // invalidatesTags: ['Post'],
        }),
        updateBlog: builder.mutation({
            // Vì phía client gửi lên một object hoàn chỉnh updatedBlog (gồm id và các trường còn lại) nên cần bóc tách id ra khỏi phần data còn lại, để đưa id vào request url và đưa data vào request body
            query: ({ id, ...data }) => {
                // // Kiểm tra lại input
                // console.log({ id, data });
                return {
                    url: `blogs/${id}`,
                    method: "PUT",
                    body: data,
                }
            },
            // invalidatesTags: ['Post'],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `blogs/${id}`,
                method: "DELETE",
            }),
            // invalidatesTags: ['Post'],
        }),
    }),
});

// export các endPoints thành các hook để sử dụng, hook được auto-generated nếu tuân thủ cú pháp: thêm từ khóa "use" vào trước tên endPoint và thêm từ khóa "query"/"mutation" vào sau tên endPoint
export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useGetOwnBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;