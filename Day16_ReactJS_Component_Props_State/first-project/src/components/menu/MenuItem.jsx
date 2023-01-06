import React from 'react';

// Nếu chỉ có 1 props thì thay vì viết:
    // function MenuItem(props) {
    //   const menu = props.menu;
    //   return (
    //     <a href={menu.path} className="menu-item">{menu.label}</a>
    //   );
    // }
// có thể viết như dưới đây vì để lấy luôn dữ liệu từ props:

function MenuItem({ menu }) {
  return (
    <a href={menu.path} className="menu-item">{menu.label}</a>
  );
}

export default MenuItem;