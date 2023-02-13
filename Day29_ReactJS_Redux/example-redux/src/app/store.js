import { combineReducers, createStore } from "redux";
import counterReducer from "./reducers/counterReducer";
import todoReducer from "./reducers/todoReducer";

// Gom các reducer lại vào trong rootReducer
const rootReducer = combineReducers({
    counter: counterReducer,
    todos : todoReducer
});

// Tạo store từ rootReducer
const store = createStore(rootReducer);

export default store;