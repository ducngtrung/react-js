import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../app/actions/counterActions";

function Counter() {
    // "state" là tất cả các state của ứng dụng, được lưu trữ trong store (file store.js)
    // Sử dụng hook useSelector và state.counter.value để lấy ra dữ liệu counter từ store và hiển thị
    const counter = useSelector(state => state.counter.value);

    // Sử dụng hook useDispatch để gửi action đến reducer để xử lý logic
    const dispatch = useDispatch();

    // Bản chất của dispatch là gửi một object (action) đến reducer, nên tham số bên trong dispatch phải là một object (hoặc một function trả về một object)
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

export default Counter