import { useState } from "react";
import ButtonAdd from "./component/ButtonAdd";

export default function App() {

  const [count, setCount] = useState(0);

  // Định nghĩa callback function ở Parent component
  // Function này có tham số để chứa dữ liệu được truyền từ Child component
  const handleAdd = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      {/* Truyền callback function đã được định nghĩa ở trên vào Child component thông qua props */}
      <ButtonAdd onAdd={handleAdd} count={count} />
    </div>
  );

}