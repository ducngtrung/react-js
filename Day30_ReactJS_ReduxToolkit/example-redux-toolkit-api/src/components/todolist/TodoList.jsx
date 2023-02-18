import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "../../app/slices/todoSlice";

function TodoList() {
    // Lấy ra state todos từ store
    const todos = useSelector((state) => state.todos);

    // Khởi tạo dispatch để gọi action
    const dispatch = useDispatch();

    // Khai báo một state để lưu dữ liệu được nhập trong ô input
    const [title, setTitle] = useState("");

    // Dùng useEffect để thực thi action fetchTodos (hiển thị danh sách todo) ngay sau khi load trang
    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    // Tạo todo mới
    const handleAdd = () => {
        // Nếu không có dữ liệu ở ô input thì hiện thông báo "Tiêu đề không được để trống"
        if (title === "") {
            alert("Tiêu đề không được để trống");
            return;
        }

        // Gửi action addTodo đến store để xử lý logic
        // Chỉ cần đưa tham số title vào action, còn id và status sẽ được xử lý ở backend (id được JPA tự sinh ra theo sequence, status mặc định là false)
        dispatch(addTodo(title));

        // Xóa dữ liệu hiện tại ở ô input để sẵn sàng cho lần nhập tiếp theo
        setTitle("");
    };

    // Cập nhật trạng thái todo
    const handleToggleStatus = (id) => {
        // Lấy ra todo cần cập nhật trong mảng todos
        const currentTodo = todos.find((todo) => todo.id === id);

        // Tạo todo mới, chỉ thay đổi status so với todo hiện tại
        const updatedTodo = {
            id,
            title : currentTodo.title,
            status : !currentTodo.status
        };

        // Gửi action updateTodo đến store để xử lý logic
        dispatch(updateTodo(updatedTodo));
    };

    // Cập nhật tiêu đề todo
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

        // Gửi action updateTodo đến store để xử lý logic
        dispatch(updateTodo({
            id,
            title : newTitle,
            status : currentTodo.status
        }));
    };

    // Xóa todo
    const handleDelete = (id) => {
        // Sử dụng window.confirm để hiển thị hộp thoại yêu cầu xác nhận trước khi xóa
        if (window.confirm("Bạn có thực sự muốn xóa?")) {
            dispatch(deleteTodo(id));
        }
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