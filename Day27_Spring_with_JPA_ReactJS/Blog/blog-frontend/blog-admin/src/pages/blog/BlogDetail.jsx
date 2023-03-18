// Trang này làm tương tự như trang BlogCreate, chỉ khác là khi load trang cần lấy ra param blogId trên URL, dùng blogId đó để gọi API lấy thông tin blog, rồi đưa các trường dữ liệu cần hiển thị vào các state

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import SimpleMdeReact from "react-simplemde-editor";
import {
    useDeleteBlogMutation,
    useGetBlogByIdQuery,
    useUpdateBlogMutation,
} from "../../app/services/blogs.service";
import { useGetCategoriesQuery } from "../../app/services/categories.service";
import { useUploadImageMutation } from "../../app/services/images.service";

function BlogDetail() {

    // ---------------------Tạo state---------------------

    // Đây là các state của các thuộc tính trong blog (ứng với các trường dữ liệu trong class UpsertBlogRequest ở back-end), không phải state của blog, state của blog được quản lý trong slice (file blogs.slice.js)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [status, setStatus] = useState(false);
    const [categoryIds, setCategoryIds] = useState([]);


    // ---------------------Lấy danh sách categories---------------------

    // Gọi query getCategories
    const { data: categories } = useGetCategoriesQuery();

    const options =
        // nếu tồn tại categories (có data trả về từ query getCategories) thì tạo danh sách options từ categories
        categories &&
        categories.map((category) => {
            return {
                value : category.id,
                label : category.name,
            };
        });


    // Lấy ra các options ứng với các categories đang được áp dụng cho blog hiện tại
    const optionsSelected = 
        options && 
        options.filter((option) => categoryIds.includes(option.value));

    const handleChangeCategory = (data) => { 
        const ids = data.map((category) => category.value);
        setCategoryIds(ids);
    };


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


    // ---------------------Cập nhật blog---------------------

    // Lấy ra action updateBlog từ hook useUpdateBlogMutation
    const [updateBlog] = useUpdateBlogMutation();

    // hook useNavigate (thuộc react-router-dom) dùng để chuyển hướng từ trang này sang trang khác
    const navigate = useNavigate();

    const handleUpdateBlog = () => {
        // Tạo object newBlog với các thuộc tính lấy từ các state bên trên
        const updatedBlog = {
            id: blogId,
            title,
            description,
            content,
            thumbnail,
            status,
            categoryIds,
        };

        updateBlog(updatedBlog)
            .unwrap() // unwrap mutation call để lấy response và error (nếu có)
            .then(() => {
                alert("Cập nhật blog thành công");
                navigate("/admin/blogs");
            })
            .catch((error) => {
                alert(error);
            });
    };


    // ---------------------Xóa blog---------------------

    const [deleteBlog] = useDeleteBlogMutation();

    const handleDeleteBlog = () => {
        deleteBlog(blogId)
            .unwrap() // unwrap mutation call để lấy response và error (nếu có)
            .then(() => {
                alert("Xóa blog thành công");
                navigate("/admin/blogs");
            })
            .catch((error) => {
                alert(error);
            });
    };


    // ---------------------Lấy dữ liệu blog cần hiển thị---------------------

    // Dùng hook useParams để lấy ra blogId trên URL (xem lại Route trong file App.jsx)
    // Reference: https://reactrouter.com/en/main/hooks/use-params
    const { blogId } = useParams();

    // Gọi query getBlogById (tham số truyền vào là blogId)
    const { data: thisBlog, isLoading } = useGetBlogByIdQuery(blogId);

    // // Kiểm tra dữ liệu trả về
    // console.log(blog);

    // Dùng hook useEffect để thực hiện gán dữ liệu vào state (khi "thisBlog" thay đổi từ undefined sang có dữ liệu)
    useEffect(() => {
        // Nếu query getBlogById chưa thực hiện xong thì "thisBlog" chưa có dữ liệu (undefined)
        if (!thisBlog) return;

        // Nếu "thisBlog" đã có dữ liệu rồi thì thực hiện đưa các trường dữ liệu của của nó vào các state để hiển thị lên giao diện
        setTitle(thisBlog.title);
        setDescription(thisBlog.description);
        setContent(thisBlog.content);
        setThumbnail(thisBlog.thumbnail);
        setStatus(thisBlog.status);
        setCategoryIds(thisBlog.categories.map((category) => category.id));
    }, [thisBlog]);

    // Khi query getBlogById chưa thực hiện xong (chưa có data) thì isLoading = true, lúc này chưa render nội dung của trang mà sẽ hiển thị "Loading ..."
    if (isLoading) {
        return <h2>Loading ...</h2>;
    }

    // Khi query getBlogById đã thực hiện xong (đã có data) thì trả về nội dung của trang
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
                        onClick={handleUpdateBlog}
                    >
                        Lưu
                    </button>
                    {/* Nút Preview dùng để xem trước bài blog dưới dạng user-view (không phải admin-view), nên sẽ xử lý chức năng này sau */}
                    <button type="button" className="btn btn-primary px-4">
                        Preview
                    </button>
                </div>

                <div className="col-6 d-flex justify-content-end">
                    <button 
                        type="button" 
                        className="btn btn-danger px-4"
                        onClick={handleDeleteBlog}
                    >
                        Xóa
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
                                            <Select
                                                options={options}
                                                value={optionsSelected}
                                                isMulti
                                                onChange={(data) =>
                                                    handleChangeCategory(data)
                                                }
                                                // hoặc chỉ cần viết: onChange={handleChangeCategory}
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

export default BlogDetail;