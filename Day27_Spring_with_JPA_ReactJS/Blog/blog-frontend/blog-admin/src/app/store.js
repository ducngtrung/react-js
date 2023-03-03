import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./services/blogs.service";
import { categoryApi } from "./services/categories.service";
import { imageApi } from "./services/images.service";
import blogsReducer from "./slices/blogs.slice";

// Reference: https://redux-toolkit.js.org/rtk-query/overview#configure-the-store
const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [imageApi.reducerPath]: imageApi.reducer,
        blogs: blogsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            blogApi.middleware,
            categoryApi.middleware,
            imageApi.middleware
        ),
});

export default store;