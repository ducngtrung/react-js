// Khởi tạo state là một mảng todo ban đầu
const initialState = [
    { id: 1, title: "Đá bóng", status: false },
    { id: 2, title: "Làm bài tập", status: true },
    { id: 3, title: "Đi chơi", status: true }
]

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "todo/addTodo": {
            // clone state ban đầu thành một mảng mới và thêm action.payload (todo mới) vào cuối mảng
            return [...state, action.payload];
            // nếu muốn thêm todo mới lên đầu mảng thì return [action.payload, ...state];
        }
        case "todo/deleteTodo": {
            // tạo mảng mới gồm các todo từ mảng ban đầu nhưng ngoại trừ todo có id = action.payload.id
            return state.filter(todo => todo.id !== action.payload.id);
        }
        case "todo/updateTodo": {
            // duyệt qua tất cả todo trong mảng, nếu gặp todo có id = action.payload.id thì cập nhật todo đó theo action.payload
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    return { 
                        ...todo,
                        ...action.payload // dùng action.payload để overwrite từng cặp key-value của todo
                    }
                    // // Cách 2: clone todo và cập nhật các key theo key tương ứng của action.payload
                    // return {
                    //     ...todo,
                    //     title : action.payload.title,
                    //     status : action.payload.status
                    // }
                }
                // nếu todo.id !== action.payload.id thì không cập nhật, return chính nó
                return todo;
            })
        }
        default: {
            return state;
        }
    }
}

export default todoReducer;