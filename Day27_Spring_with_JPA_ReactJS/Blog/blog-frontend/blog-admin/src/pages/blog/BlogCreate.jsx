import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import SimpleMdeReact from "react-simplemde-editor";
import { useGetCategoriesQuery } from "../../app/services/categories.service";
import { useUploadImageMutation } from "../../app/services/images.service";
import { useCreateBlogMutation } from "../../app/services/blogs.service";

function BlogCreate() {

    // ---------------------Tạo state---------------------

    // Đây là các state của các thuộc tính trong blog (ứng với các trường dữ liệu trong class UpsertBlogRequest ở back-end), không phải state của blog, state của blog được quản lý trong slice (file blogs.slice.js)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // mô tả ngắn
    const [content, setContent] = useState(""); // nội dung chính của blog (chính là value trong component SimpleMdeReact)
    const [thumbnail, setThumbnail] = useState("");
    const [status, setStatus] = useState(false); // status mặc định là false (ứng với trạng thái "Nháp")
    const [categoryIds, setCategoryIds] = useState([]);


    // ---------------------Upload ảnh thumbnail---------------------

    const [uploadImage] = useUploadImageMutation();

    const handleUploadThumbnail = (file) => {
        // // Kiểm tra thông tin file được chọn
        // console.log(file);

        // Phải convert file sang dạng form-data (tương tự như trên Postman) để gửi được lên API
        // Bằng cách append 1 cặp key-value ("file": file) vào trong 1 đối tượng formData mới
        const formData = new FormData();
        formData.append("file", file);

        uploadImage(formData) // Trả về URL dạng "/api/images/{id}"
            .unwrap()
            .then((response) => {
                // Nếu upload thành công thì lấy ra url từ trong response (chính là đối tượng ImageResponse được trả về ở backend) để gán cho state thumbnail
                setThumbnail(response.url);
                alert("Upload image thành công");
            })
            .catch((error) => {
                console.log(error);
            });
    };


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
            thumbnail,
            status,
            categoryIds,
        };

        // Gọi action createBlog (tương tự như việc dispatch action khi dùng createAsyncThunk)
        createBlog(newBlog)
            .unwrap() // unwrap mutation call để lấy response và error (nếu có)
            .then(() => {
                alert("Tạo blog thành công");
                // Sau khi hiện thông báo "Tạo blog thành công" thì chờ 1 giây rồi chuyển hướng đến trang BlogList. Xem trong file App.jsx để lấy path (đường dẫn) của trang cần điều hướng đến.
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
                    <Link to={"/admin/blogs"}>
                        <button type="button" className="btn btn-default">
                            <i className="fas fa-chevron-left"></i> Quay lại
                        </button>
                    </Link>
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
                                        {/* Đây là phần hiển thị ảnh vừa upload */}
                                        <div className="thumbnail-preview-container mb-3">
                                            <img
                                                // Nối domain "http://localhost:8080" với state thumbnail (url có dạng "/api/images/{id}") thành đường dẫn API hoàn chỉnh để hiển thị ảnh
                                                src={`http://localhost:8080${thumbnail}`}
                                                alt=""
                                                id="thumbnail"
                                            />
                                        </div>
                                        <label
                                            className="btn btn-info btn-flat"
                                            htmlFor="input-file"
                                        >
                                            Chọn hình ảnh
                                        </label>
                                        {/* Đây là input để upload file, sử dụng label bên trên để đại diện cho ô input này (dùng id trong input và htmlFor trong label để refer từ label đến input). Thêm class "d-none" (display: none) của bootstrap để ẩn input này trên giao diện, chỉ hiển thị label của nó. */}
                                        <input
                                            type="file"
                                            id="input-file"
                                            className="d-none"
                                            onChange={(event) =>
                                                handleUploadThumbnail(event.target.files[0])
                                                // Vì chỉ chọn 1 file nên sẽ lấy ra 1 file duy nhất trong mảng để xử lý upload
                                            }                                        
                                        />
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