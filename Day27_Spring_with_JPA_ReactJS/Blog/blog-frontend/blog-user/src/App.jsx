import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import NotFound from "./components/notfound/NotFound";
import BlogDetail from "./pages/blog/BlogDetail";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import TagDetail from "./pages/tag/TagDetail";
import TagList from "./pages/tag/TagList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Trang hiển thị danh sách tất cả bài viết */}
                <Route index element={<Home />} />
                
                <Route path="/tags">
                    {/* Trang hiển thị danh sách tất cả danh mục */}
                    <Route index element={<TagList />} />
                    {/* Trang hiển thị danh sách bài viết đang áp dụng danh mục tagName */}
                    <Route path=":tagName" element={<TagDetail />} />
                </Route>
                
                {/* Trang tìm kiếm */}
                <Route path="/search" element={<Search />} />
                
                {/* Trang hiển thị chi tiết 1 bài viết */}
                <Route path="/blogs/:blogId/:blogSlug" element={<BlogDetail />} />
                
                {/* Trang Not Found */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;