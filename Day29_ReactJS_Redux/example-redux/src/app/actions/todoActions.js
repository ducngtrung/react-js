export const addTodo = (todo) => {
    return {
        type : "todo/addTodo",
        payload : todo // value của payload phải là một object
    }
}

export const updateTodo = (todo) => {
    return {
        type : "todo/updateTodo",
        payload : todo
    }
}

export const deleteTodo = (id) => {
    return {
        type : "todo/deleteTodo",
        payload : {
            // nếu key và value trùng nhau thì khi viết object có thể lược bỏ value (viết đầy đủ là "id : id")
            id
        }
    }
}