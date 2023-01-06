import React, { useState } from "react";
import BillInformation from './components/bill/BillInformation';
import ProductList from './components/productList/ProductList';

function ShoppingCart() {

  // Khởi tạo mảng products ban đầu
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Áo thun nữ",
      image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      price: 300000,
      count: 1,
      size: "M"
    },
    {
      id: 2,
      name: "Áo sơ mi nữ",
      image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      price: 400000,
      count: 1,
      size: "L"
    },
    {
      id: 3,
      name: "Áo thun nam",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNsb3RoZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      price: 500000,
      count: 1,
      size: "XL"
    }
  ]);

  return (
    <div className="shopping-cart-container mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-4">
              <h2>Shopping Cart</h2>
            </div>
          </div>
        </div>

        {/* Nếu không có sản phẩm nào thì hiển thị “Không có sản phẩm trong giỏ hàng” */}
        {products.length === 0 && (
          <p className="fst-italic message">Không có sản phẩm trong giỏ hàng</p>
        )}

        <div className="row shopping-cart">
          <div className="col-md-8">
            <ProductList products={products} setProducts={setProducts} />
          </div>
          <div className="col-md-4">
            <BillInformation products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;