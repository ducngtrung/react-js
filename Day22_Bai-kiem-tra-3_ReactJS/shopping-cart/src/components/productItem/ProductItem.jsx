import React, { useState, useEffect } from 'react';
import './ProductItem.css';

function ProductItem(props) {

    const [product, setProduct] = useState(props.product);
    const [count, setCount] = useState(product.count);

    // Khi số lượng đang là 1 thì không thực hiện giảm được nữa
    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const increment = () => {
        setCount(count + 1);
    };

    // Nếu state count có sự thay đổi thì cập nhật count của product hiện tại
    useEffect(() => {
        setProduct({ ...product, count: count });
    }, [count]);

    // Nếu state product có sự thay đổi (do thay đổi count) thì cập nhật nó vào mảng products
    useEffect(() => {
        props.updateToProductList(product);
    }, [product]);

    const handleRemove = () => {
        props.removeFromProductList(product);
    };

    // Create a formatter to convert a price into VND format (1200000 => 1.200.000 đ)
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    // Cắt đi 2 ký tự cuối cùng (" đ") sau khi format (1.200.000 đ => 1.200.000)
    // console.log(VND.format(product.price).slice(0, -2));

    return (
        <div className="product-item d-flex border mb-4">
            <div className="image">
                <img src={product.image}
                    alt={`sản phẩm ${product.id}`} />
            </div>
            <div className="info d-flex flex-column justify-content-between px-4 py-3 flex-grow-1">
                <div>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="text-dark fs-5 fw-normal">
                            {product.name} ({product.size})
                        </h2>
                        <h2 className="text-danger fs-5 fw-normal">
                            {VND.format(product.price).slice(0, -2)} VND
                        </h2>
                    </div>
                    <div className="text-black-50">
                        <div className="d-inline-block me-3">
                            <button className="border py-2 px-3 d-inline-block fw-bold bg-light" onClick={decrement}>
                                -
                            </button>
                            <span className="py-2 px-3 d-inline-block fw-bold">
                                {count}
                            </span>
                            <button className="border py-2 px-3 d-inline-block fw-bold bg-light" onClick={increment}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="text-primary border-0 bg-transparent fw-light" onClick={handleRemove}>
                        <span><i className="fa-solid fa-trash-can"></i></span>   Xóa
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;