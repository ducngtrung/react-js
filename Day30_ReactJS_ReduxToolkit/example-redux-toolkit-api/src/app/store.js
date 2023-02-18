import { configureStore } from "@reduxjs/toolkit";
// import { todolistApi } from "./services/todolist.service";
// import todolistReducer from "./slices/todolist.slice";
import todosReducer from "./slices/todoSlice";

const store = configureStore({
    reducer : {
        // [todolistApi.reducerPath]: todolistApi.reducer,
        todos : todosReducer,
        // todolist: todolistReducer
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(todolistApi.middleware)
})

export default store;