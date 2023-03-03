import { configureStore } from "@reduxjs/toolkit";
// import { todolistApi } from "./services/todolist.service";
// import todolistReducer from "./slices/todolist.slice";
import todosReducer from "./slices/todoSlice";

const store = configureStore({
    reducer : {
        todos : todosReducer,
    },
})

export default store;