import React, { useState } from 'react';

function List(props) {
    const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
    const [title, setTitle] = useState("");
    const [isShow, setIsShow] = useState(true);

    const handleAdd = () => {
        if (title === "") {
            alert("Tiêu đề không được để trống");
            return;
        }
        // Thêm title hiện tại (ở ô input) vào mảng items
        setItems([...items, title]);
        // Sau khi thêm item thì reset thông tin ở ô input về rỗng
        setTitle("");
    };

    const handleRemove = () => {
        if (items.length === 0) return;
        // Tạo một mảng mới từ mảng ban đầu, với các phần tử tính từ index 0 đến trước index cuối cùng
        const newItems = items.slice(0, items.length - 1);
        setItems(newItems);
    };

    const handleToggle = () => {
        setIsShow(!isShow);
    };

    return (
        <>
            <h2>Component name: {props.name}</h2>

            <button onClick={handleToggle}>{isShow ? "Hide list" : "Show list"}</button>
            <br />

            <input
                type="text"
                placeholder="Enter title ..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <br />

            <button onClick={handleAdd}>Add</button>
            <button onClick={handleRemove}>Remove last item</button>

            {/* Ẩn/hiện list dựa theo state isShow */}
            {isShow && (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default List;