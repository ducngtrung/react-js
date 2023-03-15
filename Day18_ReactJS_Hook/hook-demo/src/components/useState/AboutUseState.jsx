import React, { useState } from 'react';

// Những dữ liệu trong component mà có thể thay đổi theo thời gian thì nên được quản lý bởi State
// State được dùng để quản lý dữ liệu nội bộ trong một component (tương tự như biến private trong Java)
// Khi State thay đổi thì component chứa nó sẽ được render lại (bao gồm cả các component con bên trong)
// Sử dụng Hook useState() để khởi tạo State

const orders = [
    { id: 1, total: 200000 },
    { id: 2, total: 300000 },
    { id: 3, total: 400000 },
];

function AboutUseState() {

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count + 1);
    };

    // Đây là 1 hàm tính toán
    const totalMoney = orders.reduce((a, b) => {
        console.log("tính toán");
        return a + b.total, 0;
        // a là giá trị cộng dồn (khởi tạo = 0), trong mỗi vòng lặp thì hàm reduce() sẽ cộng dồn a với giá trị của b
    });

    const [total, setTotal] = useState(totalMoney);

    // Mỗi lần render lại trang thì toàn bộ components trên trang kể cả hàm tính toán totalMoney đều được thực hiện, gây ảnh hưởng đến hiệu năng. Vì vậy nếu chỉ cần tính toán 1 lần thì có thể đưa hàm này vào intial state của useState như dưới đây (vì initial state chỉ là giá trị khởi tạo ban đầu, không bao gồm trong những lần re-render)

    const [totalNew, setTotalNew] = useState(() => {
        console.log("tính toán new (thực hiện 1 lần)");
        return orders.reduce((a, b) => a + b.total, 0);
    });

    return (
        <>
            {console.log("render")}

            <h2>Count: {count}</h2>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

            <h2>Total: {totalNew}</h2>
        </>
    )
}

export default AboutUseState;