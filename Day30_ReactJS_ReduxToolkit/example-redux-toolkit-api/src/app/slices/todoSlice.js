// createAsyncThunk dùng để xử lý code bất đồng bộ (hỗ trợ gọi API)
// Lấy API từ ứng dụng Todo-List trong bài "Day25_Spring_with_JPA_&_JS_1"

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// ----------------Tạo Thunk action để gọi API (back-end)----------------

const API_URL = "http://localhost:8080/api/v1/todos";

// Gọi API để lấy danh sách todo
// fetchTodos là một Thunk action creator
// Thunk action trả về 1 promise
// "todos/fetchTodos" là action type
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
)

// Gọi API để tạo todo mới
export const addTodo = createAsyncThunk(
    'todos/addTodo',
    // Dựa vào CreateTodoRequest ở back-end thì ta biết trong request body cần có title
    async (title) => {
        const response = await axios.post(API_URL, { title }); // { title } là cách viết rút gọn, viết đầy đủ là { title : title }, nghĩa là request body là một object chỉ có 1 cặp key-value là title : title
        return response.data;
    }
)

// Gọi API để cập nhật todo
// Dựa vào TodoController ở back-end thì ta biết trong url có path variable là id. Dựa vào CreateTodoRequest thì ta biết request body cần có title và status
export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async (updatedTodo) => {
        // Vì phía client gửi lên một object hoàn chỉnh updatedTodo : {id, title, status} nên cần bóc tách {id} ra khỏi phần data còn lại {title, status}, để đưa id vào request url và đưa data vào request body
        const { id, ...data } = updatedTodo;
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    }
)

// Gọi API để xóa todo
// Dựa vào TodoController ở back-end thì ta biết trong url có path variable là id
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id; // trả về id của todo vừa xóa ở back-end để tiếp tục xử lý xóa ở front-end
    }
)


// ---------------------Tạo Slice (xử lý front-end)---------------------

// Khởi tạo initial state là mảng rỗng. Mục đích của ứng dụng này là gọi dữ liệu từ API để đưa danh sách todo ban đầu vào state
const initialState = [];

const todoSlice = createSlice({
    name : "todos",
    initialState,
    reducers : {},
    // Dùng extraReducers để quản lý các Thunk actions
    // Lưu ý: action.payload trong extraReducers được hiểu là dữ liệu trả về từ Thunk action
    extraReducers : (builder) => {
        // Định nghĩa các công việc thực hiện ở front-end sau khi gọi back-end API thành công (Thunk action được fulfilled)
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            // action fetchTodos gọi API trả về 1 mảng todo (action.payload), nên gán state = action.payload để đưa dữ liệu trả về vào state
            state = action.payload;
            return state;
        })
        builder.addCase(addTodo.fulfilled, (state, action) => {
            // Đẩy action.payload (todo mới được tạo) vào state
            state.push(action.payload);
        })
        builder.addCase(updateTodo.fulfilled, (state, action) => {
            // Lấy ra giá trị của id trong object action.payload (todo vừa được update)
            const { id } = action.payload;

            // Tìm index của todo trong state có id trùng với id của todo vừa được update
            const index = state.findIndex(todo => todo.id === id);

            // Lấy action.payload để thay thế (gán lại) giá trị cho phần tử tại vị trí index
            state[index] = action.payload;
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            // action.payload chính là id của todo vừa xóa
            const id = action.payload;

            // Tìm index của todo trong state có id trùng với id của todo vừa xóa
            const index = state.findIndex(todo => todo.id === id);
            
            // Xóa 1 phần tử trong state tính từ vị trí index
            state.splice(index, 1);
        })
    },
});

// Không export các Thunk actions ở đây vì phần này chỉ dành cho các actions được khai báo trong reducers : {} (nếu có)
export const { } = todoSlice.actions

export default todoSlice.reducer