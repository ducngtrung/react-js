// Tạo các chức năng tương tự bài TodoList (Day30_ReactJS_ReduxToolkit\example-redux-toolkit-api), bao gồm: 
//    - Xem danh sách categories
//    - Thêm/sửa/xóa category
// Dùng giao diện bảng tương tự trang BlogList để hiển thị danh sách categories

import React from "react";

function CategoryList() {
    return (
        <div className="container-fluid">
            <div className="row py-2">
                <div className="col-12">
                    <button type="button" className="btn btn-primary">
                        <i className="fas fa-plus"></i> Tạo danh mục
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-info"
                        onClick={() => window.location.reload(true)}
                    >
                        <i className="fas fa-redo"></i> Refresh
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Tên danh mục</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Java</td>
                                        <td>
                                            <button className="btn btn-info">
                                                Sửa
                                            </button>
                                            <button className="btn btn-danger">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;