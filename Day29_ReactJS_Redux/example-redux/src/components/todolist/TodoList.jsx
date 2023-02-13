import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../../app/actions/todoActions";

// Tạo random một số từ 0 đến 1000
const randomId = () => {
    return Math.floor(Math.random() * 1000);
};

function TodoList() {
    // Lấy ra state todos từ store
    const todos = useSelector((state) => state.todos);

    const dispatch = useDispatch();

    // Khai báo một state để lưu dữ liệu được nhập trong ô input
    const [title, setTitle] = useState("");

    const handleAdd = () => {
        // Nếu không có dữ liệu ở ô input thì hiện thông báo "Tiêu đề không được để trống"
        if (title === "") {
            alert("Tiêu đề không được để trống");
            return;
        }
        // Nếu có dữ liệu ở ô input thì tạo todo mới với title là dữ liệu hiện tại, status mặc định là false, id được tạo radom
        const newTodo = {
            id : randomId(),
            title : title,
            status : false
        };

        // Gửi action addTodo đến reducer để xử lý logic
        dispatch(addTodo(newTodo));

        // Xóa dữ liệu hiện tại ở ô input để sẵn sàng cho lần nhập tiếp theo
        setTitle("");
    };

    const handleToggleStatus = (id) => {
        // Lấy ra todo cần cập nhật trong mảng todos
        const currentTodo = todos.find((todo) => todo.id === id);

        // Tạo todo mới, chỉ thay đổi status so với todo hiện tại
        const updatedTodo = {
            id,
            title : currentTodo.title,
            status : !currentTodo.status
        };

        // Gửi action updateTodo đến reducer để xử lý logic
        dispatch(updateTodo(updatedTodo));
    };

    const handleUpdateTitle = (id) => {
        // Lấy ra todo cần cập nhật trong mảng todos
        const currentTodo = todos.find((todo) => todo.id === id);

        // Sử dụng window.prompt để hiển thị hộp thoại "Cập nhật tiêu đề" với dữ liệu mặc định là title hiện tại
        const newTitle = window.prompt("Cập nhật tiêu đề", currentTodo.title);
        // biến newTitle sẽ lưu giá trị mới nhất được cập nhật từ hộp thoại
        console.log(newTitle);

        // Nếu người dùng không ấn nút OK trên hộp thoại mà ấn nút Cancel thì newTitle sẽ nhận giá trị null
        if (newTitle === null) {
            return;
        }

        // Nếu người dùng xóa dữ liệu mặc định rồi ấn nút OK trên hộp thoại thì newTitle nhận về một chuỗi rỗng <empty string>
        if (newTitle === "") {
            alert("Tiêu đề không được để trống");
            return;
        }

        // Gửi action updateTodo đến reducer để xử lý logic
        dispatch(updateTodo({
            id,
            title : newTitle,
            status : currentTodo.status
        }));
    };

    const handleDelete = (id) => {
        // TODO : Thêm confirm trước khi xóa
        dispatch(deleteTodo(id));
    };

    return (
        <>
            <h2>TodoList</h2>

            <input
                type="text"
                placeholder="Enter title ..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <button onClick={handleAdd}>Add</button>

            <ul>
                {todos.length === 0 && (
                    <li>Không có công việc nào trong danh sách</li>
                )}
                {todos.length > 0 && (
                    todos.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                checked={todo.status}
                                onChange={() => handleToggleStatus(todo.id)}
                            />

                            <span className={todo.status ? "todo-done" : ""}>
                                {todo.title}
                            </span>

                            <button onClick={() => handleUpdateTitle(todo.id)}>
                                Update
                            </button>

                            <button onClick={() => handleDelete(todo.id)}>
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
}

export default TodoList;