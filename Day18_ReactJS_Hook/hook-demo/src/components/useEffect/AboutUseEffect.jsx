import React, { useEffect, useState } from "react";

/* 
Hook useEffect() được sử dụng để xử lý các hiệu ứng phụ (side effects) làm biến đổi state bên ngoài chương trình
Mỗi useEffect() gồm 2 phần: side effect và clean up (optional)
*/

/*
useEffect(callback, dependencies)

- TH1: Không có dependencies - useEffect(callback), được gọi sau mỗi lần re-render
- TH2: Dependencies là mảng rỗng - useEffect(callback, []), chỉ được gọi 1 lần duy nhất sau lần render đầu tiên
- TH3: Dependencies là mảng khác rỗng - useEffect(callback, [deps]), được gọi khi dependencies thay đổi giá trị, dependencies có thể là props hoặc state

Đặc điểm chung : Đều chạy sau lần render đầu tiên
*/

function AboutUseEffect() {
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(0);

    //  TH1: useEffect(callback), được gọi sau mỗi lần re-render
    useEffect(() => {
        console.log("TH1 - useEffect(callback)");
    })

    // TH2: useEffect(callback, []), chỉ được gọi 1 lần duy nhất sau lần render đầu tiên
    useEffect(() => {
        console.log("TH2 - useEffect(callback, [])");
    }, []);

    // TH3: useEffect(callback, [deps]), được gọi khi deps thay đổi giá trị
    useEffect(() => {
        console.log("TH3 - useEffect(callback, [deps])");
    }, [count1]); // hàm useEffect() này thực thi phụ thuộc vào dependency "count1", khi có sự thay đổi state count1 thì nó mới được thực thi

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    const increment1 = () => setCount1(count1 + 1);
    const decrement1 = () => setCount1(count1 - 1);

    return (
        <>
            {console.log("render")}

            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

            <h1>Count1: {count1}</h1>
            <button onClick={increment1}>Increment1</button>
            <button onClick={decrement1}>Decrement1</button>
        </>
    );
}

export default AboutUseEffect;