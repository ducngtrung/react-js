import React from 'react'

function BillInformation({ products }) {

    // Tính tổng bill (chưa VAT)
    const subTotal = products.reduce((sum, product) =>
        sum + (product.price * product.count), 0
        // sum là giá trị cộng dồn (khởi tạo = 0)
        // trong mỗi vòng lặp: hàm reduce() cộng dồn sum với (product.price * product.count)
    );

    // Tính VAT
    const VAT = subTotal/10;

    // Tính tổng bill (có VAT)
    const total = subTotal + VAT;

    // Create a formatter to convert a number into VND format (1200000 => 1.200.000 đ)
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    // Cắt đi 2 ký tự cuối cùng (" đ") sau khi format (1.200.000 đ => 1.200.000)
    // console.log(VND.format(total).slice(0, -2));

    return (
        <div className="bill">
            <div className="border mb-2 p-3 fs-5 fw-normal d-flex justify-content-between align-items-center">
                <span className="text-black-50">Tạm tính:</span>
                <span className="text-primary" id="sub-total-money">{VND.format(subTotal).slice(0, -2)} VND</span>
            </div>
            <div className="border mb-2 p-3 fs-5 fw-normal d-flex justify-content-between align-items-center">
                <span className="text-black-50">VAT (10%):</span>
                <span className="text-primary" id="vat-money">{VND.format(VAT).slice(0, -2)} VND</span>
            </div>
            <div className="border mb-2 p-3 fs-5 fw-normal d-flex justify-content-between align-items-center">
                <span className="text-black-50">Thành tiền:</span>
                <span className="text-primary" id="total-money">{VND.format(total).slice(0, -2)} VND</span>
            </div>
        </div>
    )
}

export default BillInformation;