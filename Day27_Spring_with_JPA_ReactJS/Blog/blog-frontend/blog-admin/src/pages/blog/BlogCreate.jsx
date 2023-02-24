import React, { useState } from "react";
import Select from "react-select";
import SimpleMdeReact from "react-simplemde-editor";
import { useGetCategoriesQuery } from "../../app/services/categories.service";
import { useCreateBlogMutation } from "../../app/services/blogs.service";
import { useNavigate } from "react-router-dom";

function BlogCreate() {

    // ---------------------Tạo state---------------------

    // Đây là các state của các thuộc tính trong blog (ứng với các trường dữ liệu trong class UpsertBlogRequest ở back-end), không phải state của blog, state của blog được quản lý trong slice (file blogs.slice.js)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // mô tả ngắn
    const [content, setContent] = useState(""); // nội dung chính của blog (chính là value trong component SimpleMdeReact)
    const [status, setStatus] = useState(false); // status mặc định là false (ứng với trạng thái "Nháp")
    const [categoryIds, setCategoryIds] = useState([]);


    // ---------------------Tạo blog mới---------------------

    // Lấy ra action createBlog từ hook useCreateBlogMutation
    const [createBlog] = useCreateBlogMutation();
    
    // hook useNavigate (thuộc react-router-dom) dùng để chuyển hướng từ trang này sang trang khác
    const navigate = useNavigate();

    const handleAddBlog = () => {
        // Tạo object newBlog với các thuộc tính lấy từ các state bên trên
        const newBlog = {
            title,
            description,
            content,
            status,
            categoryIds,
        };

        // Gọi action createBlog (tương tự như việc dispatch action khi dùng createAsyncThunk)
        createBlog(newBlog)
            .unwrap() // unwrap mutation call để lấy response và error (nếu có)
            .then(() => {
                alert("Tạo blog thành công");
                // Sau khi hiện thông báo "Tạo blog thành công" thì chờ 1 giây rồi chuyển hướng sang trang BlogList. Xem trong file App.jsx để lấy path (đường dẫn) của trang cần điều hướng đến.
                setTimeout(() => {
                    navigate("/admin/blogs");
                }, 1000);
            })
            .catch((error) => {
                alert(error);
            });
    };


    // ---------------------Lấy danh sách categories---------------------

    // Mặc định auto-generated hook trả về kết quả trong data, nhưng có thể đổi thành tên khác, VD: categories
    // Reference: https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values
    const { data: categories, isLoading } = useGetCategoriesQuery();

    const options =
        // nếu tồn tại categories (có data trả về từ query getCategories) thì tạo danh sách options từ categories
        categories &&
        categories.map((category) => {
            // loop trong danh sách categories, với mỗi category thì trả về một object gồm value là categoryId (dùng để gửi dữ liệu vào API) và label là categoryName (dùng để hiển thị lên giao diện)
            return {
                value : category.id,
                label : category.name,
            };
        });

    const handleChangeCategory = (data) => { 
        // "data" là một mảng các categories đang được chọn trên giao diện (mỗi category là một object gồm value (categoryId) và label (categoryName), bản chất "data" chính là "options" được xây dựng bên trên
        // Dùng loop để lấy ra danh sách categoryId từ mảng "data"
        const ids = data.map((category) => category.value);
        setCategoryIds(ids);
    };

    // Khi query getCategories chưa thực hiện xong (chưa có data) thì isLoading = true, lúc này chưa render nội dung của trang mà sẽ hiển thị "Loading ..."
    // Reference: https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values
    if (isLoading) {
        return <h2>Loading ...</h2>;
    }

    // Khi query getCategories đã thực hiện xong (đã có data) thì trả về nội dung của trang
    return (
        <div className="container-fluid">
            <div className="row py-2">
                <div className="col-6">
                    <button type="button" className="btn btn-default">
                        <i className="fas fa-chevron-left"></i> Quay lại
                    </button>
                    <button
                        type="button"
                        className="btn btn-info px-4"
                        onClick={handleAddBlog}
                    >
                        Lưu
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>Tiêu đề</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            value={title}
                                            onChange={(event) =>
                                                setTitle(event.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Nội dung</label>
                                        {/* Thay thế textarea thông thường bằng SimpleMdeReact - component soạn thảo văn bản. Xem hướng dẫn sử dụng react-simplemde-editor trong file README. */}
                                        <SimpleMdeReact
                                            value={content}
                                            onChange={(data) => 
                                                setContent(data)
                                            }
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Mô tả ngắn</label>
                                        <textarea
                                            id="description"
                                            className="form-control"
                                            rows="3"
                                            value={description}
                                            onChange={(event) =>
                                                setDescription(event.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <select
                                            id="status"
                                            className="form-control"
                                            // Nếu status = true (trạng thái "Công khai") thì value = 1
                                            value={status ? "1" : "0"}
                                            onChange={(event) =>
                                                setStatus(
                                                    event.target.value === "0" ? false : true
                                                )
                                            }
                                        >
                                            <option value="0">Nháp</option>
                                            <option value="1">Công khai</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Danh mục</label>
                                        <div className="select2-purple">
                                            {/* Xem hướng dẫn sử dụng react-select trong file README */}
                                            <Select
                                                options={options}
                                                // Cho phép chọn nhiều option
                                                isMulti
                                                onChange={handleChangeCategory}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="thumbnail-preview-container mb-3">
                                            <img src="" alt="" id="thumbnail" />
                                        </div>
                                        <button type="button" className="btn btn-info btn-flat" data-toggle="modal"
                                            data-target="#modal-xl">
                                            Chọn hình ảnh
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCreate;