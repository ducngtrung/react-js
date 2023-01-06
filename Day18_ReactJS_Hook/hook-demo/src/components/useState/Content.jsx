import React, { useState } from "react";
import { faker } from '@faker-js/faker';

function Content() {
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([
        { id: 1, name: "Sản phẩm 1", price: 100000 },
        { id: 2, name: "Sản phẩm 2", price: 200000 },
        { id: 3, name: "Sản phẩm 3", price: 300000 },
    ]);
    const [user, setUser] = useState({
        id: 1,
        name: "Bùi Hiên",
        email: "hien@gmail.com",
    });
    // count thuộc kiểu dữ liệu nguyên thủy (int) nên có thể cập nhật state của nó trực tiếp, với các kiểu dữ liệu phức tạp (VD: user là object, products là array of objects) thì cần clone đối tượng ra để cập nhật

    const increment = () => {
        setCount(count + 1); // đây là hàm bất đồng bộ, nó cần thời gian để thực thi, câu lệnh console.log() bên dưới thực thi xong trước khi hàm này hoàn tất (tức là console.log() không cần chờ setCount() thực thi xong để bắt đầu, 2 câu lệnh này chạy song song cùng lúc với nhau)
        console.log(count);
    };

    // Giảm count xuống 3 đơn vị
    const decrement = () => {
        setCount((count) => count - 1); // sử dụng annonymous function để tính toán state mới từ state cũ
        setCount((count) => count - 1);
        setCount((count) => count - 1);

        // Nếu đặt 3 dòng setCount(count - 1) cạnh nhau thì React sẽ gom chúng lại và chỉ thực hiện 1 dòng lệnh, tức là hàm decrement này chỉ có tác dụng giảm count xuống 1 đơn vị 
    };

    // Tạo random price cho sản phẩm có id = 1
    const randomPrice = () => {
        const productId = 1;
        const newPrice = Math.floor(Math.random() * (500000 - 100000 + 1)) + 100000;

        // tạo mảng newProducts giống mảng products ban đầu, chỉ thay đổi price của sản phẩm có id = 1
        const newProducts = products.map((product) => {
            if (product.id === productId) {
                // clone product thành một object mới và ghi đè thuộc tính price bằng price mới
                return { ...product, price: newPrice };
            }
            return product;
        });

        setProducts(newProducts);
    };

    const randomEmail = () => {
        const rdEmail = faker.internet.email();
        setUser({ ...user, email: rdEmail });
    };

    return (
        <>
            {console.log("render")}
            
            <h2>Count: {count}</h2>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

            <hr />

            <h2>Danh sách sản phẩm</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.id} - {product.name} - {product.price}
                    </li>
                ))}
            </ul>

            <button onClick={randomPrice}>Random price</button>

            <hr />

            <h2>Thông tin user</h2>
            <p>Id: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>

            <button onClick={randomEmail}>Random email</button>
        </>
    );
}

export default Content;