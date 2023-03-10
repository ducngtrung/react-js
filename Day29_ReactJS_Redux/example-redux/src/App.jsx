import Counter from "./components/counter/Counter";
import TodoList from "./components/todolist/TodoList";
import NotFound from "./components/not-found/NotFound";

// react-router-dom hỗ trợ tạo menu điều hướng giữa các components
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
        {/* Hiển thị menu lên giao diện */}
        <ul>
            <li>
                <Link to={"/counter"}>Counter App</Link>
            </li>
            <li>
                <Link to={"/todolist"}>TodoList App</Link>
            </li>
        </ul>

        {/* Định nghĩa các đường dẫn gắn với menu */}
        <Routes>
            <Route path="/counter" element={<Counter />} />
            <Route path="/todolist" element={<TodoList />} />
            
            {/* đường dẫn gốc (mặc định) */}
            <Route path="/" element={<Counter />} />

            {/* với các đường dẫn còn lại (không được định nghĩa) thì điều hướng đến component NotFound */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;