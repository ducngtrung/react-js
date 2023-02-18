import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../app/slices/counterSlice";

function Counter() {
    // Sử dụng hook useSelector và state.counter.value để lấy ra dữ liệu counter từ store và hiển thị
    const counter = useSelector(state => state.counter.value);

    // Sử dụng hook useDispatch để gửi action đến store để xử lý logic
    const dispatch = useDispatch();

    const handleDecrement = () => {
        dispatch(decrement());
    };

    const handleIncrement = () => {
        dispatch(increment());
    };

    return (
        <>
            <h2>Counter: {counter}</h2>
            <button onClick={handleDecrement}>Decrement</button>
            <button onClick={handleIncrement}>Increment</button>
        </>
    );
}

export default Counter;