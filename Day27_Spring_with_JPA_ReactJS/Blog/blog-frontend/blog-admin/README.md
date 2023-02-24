Ngoài 4 thư viện cơ bản (redux, react-redux, react-router-dom, @reduxjs/toolkit), sử dụng thêm các thư viện sau:

- Bootstrap
- Icon : @fortawesome/fontawesome-free
- Select : https://react-select.com/home
- MDE : https://www.npmjs.com/package/react-simplemde-editor


Cài đặt các thư viện trên bằng lệnh sau:

```js
npm i bootstrap @fortawesome/fontawesome-free react-select react-simplemde-editor easymde
```


Sau khi cài đặt các thư viện, import vào ứng dụng (đặt ở đầu file main.jsx) để sử dụng:

```js
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "easymde/dist/easymde.min.css";
```