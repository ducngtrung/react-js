import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { decrement, increment } from "../../app/actions/counterActions";

function Counter() {
    // // Lấy ra được dữ liệu từ store và hiển thị
    // const counter = useSelector(state => state.counter.value);

    // // Sử dụng dispatch để gửi action vào store để xử lý
    // const dispatch = useDispatch();

    const handleDecrement = () => {
        // dispatch(decrement());
    };

    const handleIncrement = () => {
        // dispatch(increment());
    };

    return (
        <>
            <h1>Counter: 0</h1>
            <button onClick={handleDecrement}>Decrement</button>
            <button onClick={handleIncrement}>Increment</button>
        </>
    );
}

export default Counter