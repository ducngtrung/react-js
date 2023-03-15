import React from 'react';
import ProductItem from '../productItem/ProductItem';

function ProductList(props) {

    // Lấy dữ liệu từ props
    const {products, setProducts} = props;

    const updateToProductList = (newProduct) => {
        // tạo mảng newProducts giống mảng products ban đầu, chỉ cập nhật product có sự thay đổi ở thuộc tính count (newProduct)
        const newProducts = products.map((product) => {
            if (product.id === newProduct.id) {
                // khi tìm thấy product cần cập nhật thì clone product đó thành một object mới và ghi đè thuộc tính count bằng count mới
                return { ...product, count: newProduct.count };
            }
            // với các product không cần cập nhật thì return chính nó
            return product;
        });
        setProducts(newProducts);
    };

    const removeFromProductList = (productToRemove) => {
        // tạo mảng newProducts giống mảng products ban đầu, chỉ lọc bỏ product cần xóa
        const newProducts = products.filter((product) => product.id !== productToRemove.id);
        setProducts(newProducts);
    };

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} updateToProductList={updateToProductList} removeFromProductList={removeFromProductList} />
            ))}
        </div>
    )
}

export default ProductList;