import React from 'react';
import Menu from './components/menu/Menu';
import Counter from './components/counter/Counter';
import Form from './components/form/Form';
import List from './components/list/List';
import Theme from './components/theme/Theme';

// Bản chất của mỗi component là một function (hoặc class) trả về một giao diện
function App() {
  const myStyle = {
    color: "red",
    backgroundColor: "yellow"
  };

  const menus = [
    { path: "/", label: "Trang chủ" },
    { path: "/shop", label: "Cửa hàng" },
    { path: "/about", label: "Về chúng tôi" },
    { path: "/contact", label: "Liên hệ" },
  ];

  return (
    <React.Fragment> {/* hoặc <></>, là thẻ ảo dùng để gom nhóm element, vì mỗi component chỉ được return 1 element duy nhất */}
      <h1 className='heading' style={myStyle}>
        Hello world {1 + 1}!
      </h1>

      {/* Bài thực hành 1 */}
      <div className="intro-content">
        <h1 className="intro-title">Fashion Trends</h1>
        <p className="intro-description">There are some trends that are just too plain wacky to really affect your wardrobe,
          so for that reason we've left out a few ideas we know you'd rather sidestep.</p>
        <a href="#" className="intro-btn">Buy now</a>
      </div>

      {/* Bài thực hành 2 */}
      <div className="menu-list">
        {/* Dùng vòng  lặp để tạo các thẻ a từ mảng "menus", lưu ý nên tạo key cho mỗi element khi dùng vòng lặp */}
        {menus.map(menu => (
          <a key={menu.path} href={menu.path} className="menu-item">{menu.label}</a>
        ))}

        {/* Nếu sử dụng dấu ngoặc nhọn {} thì phải có từ khóa "return"
        {menus.map(menu => {
          return <a key={menu.path} href={menu.path} className="menu-item">{menu.label}</a>
        })} */}
      </div>

      {/* Bài thực hành 3
      Gọi component Menu, truyền mảng "menus" từ component cha (App) vào props trong component con (Menu)
      Props bao gồm (các) cặp key-value, dùng để truyền dữ liệu giữa các components (từ component cha xuống component con) */}
      <Menu menus={menus} name={"My Menu"} />

      <hr />
      <Counter />

      <hr />
      <Form name={"My Form"} />

      <hr />
      <List name={"My List"} />

      <hr />
      <Theme name={"My Theme"} />

    </React.Fragment>
  )
}

export default App;