import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const END_POINT = "http://localhost:8080/api";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: END_POINT }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => `blogs`,
        }),
        searchBlog: builder.query({
            query: (term) => `blogs/search?term=${term}`,
        }),
        getBlogDetail: builder.query({
            query: ({ id, slug }) => `blogs/${id}/${slug}`,
        }),
    }),
});

// export searchBlog query dưới dạng useLazyQuery để tạo ra 1 trigger function tên là searchBlog phục vụ việc thực thi nó sau sự kiện nhấn phím Enter (nếu dùng useQuery thông thường thì query sẽ gọi api luôn ngay khi tải trang, trước khi nhấn phím Enter)
// Đọc thêm: https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#uselazyquery
export const {
    useGetBlogsQuery,
    useLazySearchBlogQuery,
    useGetBlogDetailQuery
} = blogApi;