import { createSlice } from '@reduxjs/toolkit'

// Khởi tạo state là một mảng todo ban đầu
const initialState = [
    { id: 1, title: "Đá bóng", status: false },
    { id: 2, title: "Làm bài tập", status: true },
    { id: 3, title: "Đi chơi", status: true }
]

const todoSlice = createSlice({
    name : "todos",
    initialState,
    reducers : {
        addTodo : (state, action) => {
            // Redux Toolkit sử dụng thư viện Immer.js giúp thay đổi trực tiếp giá trị state
            // Không cần clone theo cách return [...state, action.payload];
            state.push(action.payload);
        },
        updateTodo : (state, action) => {
            // Lấy ra giá trị của id trong object action.payload (action.payload chính là todo cần update)
            const { id } = action.payload;

            // Tìm index của todo trong state có id trùng với id của todo cần update
            const index = state.findIndex(todo => todo.id === id);

            // Lấy action.payload để thay thế (gán lại) giá trị cho phần tử tại vị trí index
            state[index] = action.payload;
        },
        deleteTodo : (state, action) => {
            // action.payload chính là id của todo cần xóa
            const id = action.payload;

            // Tìm index của todo trong state có id trùng với id của todo cần xóa
            const index = state.findIndex(todo => todo.id === id);

            // Xóa 1 phần tử trong state tính từ vị trí index
            state.splice(index, 1);
        }
    }
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions

export default todoSlice.reducer