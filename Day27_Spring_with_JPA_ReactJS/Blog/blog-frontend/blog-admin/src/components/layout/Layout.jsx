import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Navigation from '../navigation/Navigation'
import { Outlet } from 'react-router-dom'

// Tất cả các trang trong folder pages (BlogCreate, BlogDetail, BlogList, OwnBlog, CategoryList) sẽ dùng chung Layout này
// Layout bao gồm các module cố định (Sidebar, Navigation, Footer (nếu có), v.v.) và module linh động (Outlet - chứa nội dung riêng của từng trang)
// Sắp xếp các module theo đúng thứ tự code trong file admin-template\index.html
function Layout() {
  return (
    <>
      {/* Sidebar và Navigation là các module cố định, không thay đổi giữa các trang */}
      <Sidebar />
      <div className="wrapper-container">
        <Navigation />

        {/* Main content - nội dung chính của trang NẰM TRONG section này*/}
        <section className="content">
          {/* Outlet là một thành phần thuộc thư viện react-router-dom, dùng để hiển thị nội dung linh động của từng trang. VD: nếu trang BlogList sử dụng Layout này thì element BlogList sẽ được render vào đây */}
          <Outlet />
        </section>
      </div>
    </>
  )
}

export default Layout