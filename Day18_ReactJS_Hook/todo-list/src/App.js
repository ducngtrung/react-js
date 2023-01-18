import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/v1/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // Định nghĩa hàm fetchTodos để gọi API và lấy danh sách todo
  const fetchTodos = async () => {
    try {
      let res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetchTodos được thực thi sau lần render đầu tiên
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    try {
      // tạo todo mới theo title hiện tại (status mặc định là false, được xử lý ở back-end)
      await axios.post(API_URL, {
        "title" : title
      });

      // gọi lại hàm fetchTodos để gọi API lấy danh sách todo mới nhất
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleStatus = async (todo) => {
    try {
      // update todo theo title hiện tại và status mới là phủ định của status hiện tại
      await axios.put(`${API_URL}/${todo.id}`, {
        "title" : todo.title,
        "status" : !todo.status
      });

      // gọi lại hàm fetchTodos để gọi API lấy danh sách todo mới nhất
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTitle = async (todo) => {
    try {
      // update todo theo title đang được nhập ở ô input, giữ nguyên status hiện tại
      await axios.put(`${API_URL}/${todo.id}`, {
        "title" : title,
        "status" : todo.status
      });

      // gọi lại hàm fetchTodos để gọi API lấy danh sách todo mới nhất
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // update todo theo title hiện tại và status mới là phủ định của status hiện tại
      await axios.delete(`${API_URL}/${id}`);

      // gọi lại hàm fetchTodos để gọi API lấy danh sách todo mới nhất
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>TodoList App</h2>

      <input
        type="text"
        placeholder="Enter todo title ..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {(todos.length === 0) && (
          <li>Không có công việc nào trong danh sách</li>
        )}
        {(todos.length > 0) && (
          todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.status}
                onChange={() => handleToggleStatus(todo)}
              />
              <span className={todo.status ? "todo-done" : ""}>
                {todo.title}
              </span>
              <button onClick={() => handleUpdateTitle(todo)}>
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

export default App;