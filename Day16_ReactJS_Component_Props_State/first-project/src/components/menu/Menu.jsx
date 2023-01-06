import React from 'react';
import MenuItem from './MenuItem';

function Menu(props) {
    console.log(props);

    // Cách 1: Lấy dữ liệu từ props rồi gán cho biến
    const menus = props.menus;
    const name = props.name;

    // Cách 2: Cú pháp nhanh để lấy dữ liệu từ props (Destructuring Assignment - ES6)
    // const {menus, name} = props;
    
    return (
        <>
            <h2>Component name: {name}</h2>
            <div className="menu-list">
                {menus.map((menu) => (
                    // Khi dùng vòng lặp thì lưu ý nên tạo key cho mỗi element
                    // <a key={menu.path} href={menu.path} className="menu-item">{menu.label}</a>
                    <MenuItem key={menu.path} menu={menu} />
                ))}
            </div>
            {/* // Nếu không dùng const để trích xuất dữ liệu thì truy cập dữ liệu trực tiếp qua props.name và props.menus */}
        </>
    );
}

export default Menu;
