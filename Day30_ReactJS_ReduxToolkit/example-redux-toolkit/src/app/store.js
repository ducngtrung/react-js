import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import todosReducer from "./slices/todoSlice";

const store = configureStore({
    reducer : {
        counter : counterReducer,
        todos : todosReducer
    }
})

export default store;