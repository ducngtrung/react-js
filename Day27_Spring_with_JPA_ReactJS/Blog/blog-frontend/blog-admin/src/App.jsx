import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import BlogCreate from "./pages/blog/BlogCreate";
import BlogDetail from "./pages/blog/BlogDetail";
import BlogList from "./pages/blog/BlogList";
import OwnBlog from "./pages/blog/OwnBlog";
import CategoryList from "./pages/category/CategoryList";

function App() {
    return (
      <Routes>

        {/* 
          1) path lớn nhất có thể viết có dấu '/' hoặc không có dấu '/', các path con bên dưới nó KHÔNG ĐƯỢC có dấu '/'
          2) Layout được đặt trong thẻ Route cha ("/admin"). Các pages cùng sử dụng Layout này được đặt trong thẻ Route con nằm dưới thẻ Route cha.
          3) Bên dưới "/admin" có "/admin/blogs" và "/admin/categories"
        */}
        <Route path="/admin" element={<Layout />}>
          
          {/* Gom nhóm các Route con nằm trong "/admin/blogs" vào đây */}
          <Route path="blogs">
            {/* từ khóa index chỉ đường dẫn gốc, đường dẫn gốc tại đây là "/admin/blogs" */}
            <Route index element={<BlogList />} />
            
            {/* :blogId là param, VD: "/admin/blogs/2" điều hướng đến thị trang detail của blog có id = 2 */}
            <Route path=":blogId" element={<BlogDetail />} />

            {/* "/admin/blogs/own-blogs" */}
            <Route path="own-blogs" element={<OwnBlog />} />

            {/* "/admin/blogs/create" */}
            <Route path="create" element={<BlogCreate />} />
          </Route>

          {/* "/admin/categories", tách biệt với "/admin/blogs" */}
          <Route path="categories" element={<CategoryList />} />

        </Route>

      </Routes>
    );
}

export default App;