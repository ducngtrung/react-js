import React, { useState } from 'react';
import './Counter.css';

// Những dữ liệu trong component mà có thể thay đổi theo thời gian thì nên được quản lý bởi State
// State được dùng để quản lý dữ liệu nội bộ trong một component (tương tự như biến private trong Java)
// Khi State thay đổi thì component chứa nó sẽ được render lại (bao gồm cả các component con bên trong)

// Vòng đời của một component
// - Mounting: Quá trình component được gắn vào DOM (1 lần khi load trang)
// - Updating: Quá trình component được render lại (nhiều lần)
// - Unmounting: Quá trình component được xóa khỏi DOM (1 lần)
function Counter() {
    // Bản chất của Hook là một function
    // Sử dụng Hook useState() để khởi tạo State
    // count và setCount đóng vai trò như getter và setter
    // 0 là giá trị khởi tạo ban đầu cho count
    const [count, setCount] = useState(0);

    const decrement = () => {
        setCount(count - 1);
    };

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div className="counter-container">
            {console.log("render")}
            <h1 className="title">Đếm số</h1>
            <h1 id="counter" style={{ color: "#333333" }}>
                {count}
            </h1>
            <div className="btn-container">
                <button className="btn counterBtn prevBtn" onClick={decrement}>
                    Trừ
                </button>
                <button className="btn counterBtn nextBtn" onClick={increment}>
                    Cộng
                </button>
            </div>
        </div>
    );
}

export default Counter;